import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import { 
  insertContactSubmissionSchema, 
  insertActivityLogSchema, 
  loginSchema,
  insertUserSchema 
} from "@shared/schema";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";
const SALT_ROUNDS = 12;

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { message: "Too many authentication attempts, please try again later" },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // limit each IP to 3 contact form submissions per minute
  message: { message: "Too many contact form submissions, please try again later" },
});

// Extend Express Request interface to include user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      userId: number;
      username: string;
      role: string;
    };
  }
}

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : authHeader;

  if (!token) {
    console.log('No token provided:', { authHeader, headers: req.headers });
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        console.log('JWT verification error:', err.message);
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
      
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log('Token verification error:', error);
    return res.status(403).json({ message: 'Invalid token format' });
  }
};

// Helper function to log activity
const logActivity = async (type: string, description: string, req: any, userId?: number) => {
  try {
    await storage.logActivity({
      type,
      description,
      userId,
      ipAddress: req.ip,
      userAgent: req.get('user-agent') || '',
      sessionId: req.sessionID || '',
      metadata: {
        url: req.originalUrl,
        method: req.method,
      },
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure trust proxy for rate limiting
  app.set('trust proxy', 1);
  
  // Security middleware with CSP configuration
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://assets.calendly.com", "https://js.stripe.com", "https://js.braintreegateway.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:", "blob:"],
        connectSrc: ["'self'", "https://api.calendly.com", "wss://", "ws://"],
        frameSrc: ["'self'", "https://calendly.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
      },
    },
  }));
  
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL || false 
      : true,
    credentials: true,
  }));

  // Initialize admin user (always update password to ensure consistency)
  const initializeAdminUser = async () => {
    try {
      const existingAdmin = await storage.getUserByUsername('admin');
      const hashedPassword = await bcrypt.hash('admin123', SALT_ROUNDS);
      
      if (!existingAdmin) {
        await storage.createUser({
          username: 'admin',
          email: 'admin@synexianlabs.com',
          password: hashedPassword,
          role: 'admin',
        });
        console.log('Default admin user created with password: admin123');
      } else {
        // Update existing admin password
        await storage.updateUserPassword('admin', hashedPassword);
        console.log('Admin password updated to: admin123');
      }
    } catch (error) {
      console.error('Failed to initialize admin user:', error);
    }
  };

  await initializeAdminUser();

  // Health check endpoint for monitoring and load balancers
  app.get('/api/health', async (req, res) => {
    try {
      // Check database connection
      await storage.getDashboardStats();
      
      const healthCheck = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.APP_VERSION || '1.0.0',
        database: 'connected',
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100,
        }
      };
      
      res.status(200).json(healthCheck);
    } catch (error) {
      console.error('Health check failed:', error);
      res.status(503).json({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Database connection failed'
      });
    }
  });

  // Contact form submission
  app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      const submission = await storage.createContactSubmission(validatedData);
      
      // Log activity
      await logActivity(
        'contact_form_submission',
        `New contact form submission from ${validatedData.email}`,
        req
      );

      // Update daily analytics
      const today = new Date().toISOString().split('T')[0];
      await storage.updateDailyAnalytics(today, { conversions: 1 });

      res.status(201).json({ 
        message: 'Contact form submitted successfully',
        id: submission.id 
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      res.status(400).json({ 
        message: 'Invalid form data', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });

  // Admin login
  app.post('/api/admin/login', authLimiter, async (req, res) => {
    try {
      const { username, password, twoFactor } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.role !== 'admin') {
        await logActivity('failed_login', `Failed login attempt for username: ${username}`, req);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        await logActivity('failed_login', `Failed login attempt for username: ${username}`, req);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // For now, skip 2FA validation (would implement with speakeasy in production)
      if (user.twoFactorEnabled && (!twoFactor || twoFactor !== '123456')) {
        return res.status(401).json({ message: 'Invalid 2FA code' });
      }

      // Update last login
      await storage.updateUserLastLogin(user.id);

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      await logActivity('successful_login', `Admin login successful for ${username}`, req, user.id);

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(400).json({ 
        message: 'Invalid login data',
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });

  // Verify JWT token endpoint
  app.get('/api/admin/verify', authenticateToken, async (req, res) => {
    try {
      const user = await storage.getUser(req.user!.userId);
      
      if (!user) {
        return res.status(401).json({ valid: false, message: 'User not found' });
      }

      res.json({
        valid: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(500).json({ valid: false, message: 'Server error during verification' });
    }
  });

  // Get dashboard analytics (admin only)
  app.get('/api/admin/analytics', authenticateToken, async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const stats = await storage.getDashboardStats();
      
      res.json({
        visitors: stats.totalVisitors,
        conversions: stats.totalConversions,
        revenue: stats.totalRevenue,
        activeUsers: stats.activeUsers,
        recentActivity: stats.recentActivity.map(activity => ({
          id: activity.id,
          type: activity.type,
          description: activity.description,
          createdAt: activity.createdAt,
          userId: activity.userId,
        })),
      });
    } catch (error) {
      console.error('Analytics error:', error);
      res.status(500).json({ message: 'Failed to fetch analytics' });
    }
  });

  // Get contact submissions (admin only)
  app.get('/api/admin/contacts', authenticateToken, async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const limit = parseInt(req.query.limit as string) || 50;
      const submissions = await storage.getContactSubmissions(limit);
      
      res.json({ contacts: submissions });
    } catch (error) {
      console.error('Contacts fetch error:', error);
      res.status(500).json({ message: 'Failed to fetch contacts' });
    }
  });

  // Update contact submission status (admin only)
  app.patch('/api/admin/contacts/:id', authenticateToken, async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const { id } = req.params;
      const { status } = req.body;

      if (!['new', 'read', 'responded'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      await storage.updateContactSubmissionStatus(parseInt(id), status);
      
      await logActivity(
        'contact_status_update',
        `Contact submission ${id} status updated to ${status}`,
        req,
        req.user.userId
      );

      res.json({ message: 'Contact status updated successfully' });
    } catch (error) {
      console.error('Contact update error:', error);
      res.status(500).json({ message: 'Failed to update contact status' });
    }
  });

  // Track page views
  app.post('/api/track/pageview', async (req, res) => {
    try {
      const { page } = req.body;
      
      await logActivity('page_view', `Page view: ${page}`, req);
      
      // Update daily analytics
      const today = new Date().toISOString().split('T')[0];
      await storage.updateDailyAnalytics(today, { 
        pageViews: 1,
        uniqueVisitors: 1 // In production, would track unique sessions
      });

      res.json({ message: 'Page view tracked' });
    } catch (error) {
      console.error('Page view tracking error:', error);
      res.status(500).json({ message: 'Failed to track page view' });
    }
  });

  // Verify token endpoint
  app.get('/api/admin/verify', authenticateToken, async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }

      const user = await storage.getUser(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        valid: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        }
      });
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(500).json({ message: 'Token verification failed' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
