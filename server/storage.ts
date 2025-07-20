import { 
  users, 
  contactSubmissions, 
  activityLog, 
  analytics,
  type User, 
  type InsertUser,
  type ContactSubmission,
  type InsertContactSubmission,
  type ActivityLog,
  type InsertActivityLog,
  type Analytics
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, and, gte } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserLastLogin(id: number): Promise<void>;
  
  // Contact submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(limit?: number): Promise<ContactSubmission[]>;
  updateContactSubmissionStatus(id: number, status: string): Promise<void>;
  
  // Activity logging
  logActivity(activity: InsertActivityLog): Promise<ActivityLog>;
  getRecentActivity(limit?: number): Promise<ActivityLog[]>;
  
  // Analytics
  getAnalytics(startDate?: string, endDate?: string): Promise<Analytics[]>;
  updateDailyAnalytics(date: string, updates: Partial<Analytics>): Promise<void>;
  getDashboardStats(): Promise<{
    totalVisitors: number;
    totalConversions: number;
    totalRevenue: number;
    activeUsers: number;
    recentActivity: ActivityLog[];
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserLastLogin(id: number): Promise<void> {
    await db
      .update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, id));
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [contact] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return contact;
  }

  async getContactSubmissions(limit = 50): Promise<ContactSubmission[]> {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt))
      .limit(limit);
  }

  async updateContactSubmissionStatus(id: number, status: string): Promise<void> {
    await db
      .update(contactSubmissions)
      .set({ status })
      .where(eq(contactSubmissions.id, id));
  }

  async logActivity(activity: InsertActivityLog): Promise<ActivityLog> {
    const [log] = await db
      .insert(activityLog)
      .values(activity)
      .returning();
    return log;
  }

  async getRecentActivity(limit = 20): Promise<ActivityLog[]> {
    return await db
      .select()
      .from(activityLog)
      .orderBy(desc(activityLog.createdAt))
      .limit(limit);
  }

  async getAnalytics(startDate?: string, endDate?: string): Promise<Analytics[]> {
    if (startDate && endDate) {
      return await db
        .select()
        .from(analytics)
        .where(
          and(
            gte(analytics.date, startDate),
            sql`${analytics.date} <= ${endDate}`
          )
        )
        .orderBy(desc(analytics.date));
    }
    
    return await db
      .select()
      .from(analytics)
      .orderBy(desc(analytics.date));
  }

  async updateDailyAnalytics(date: string, updates: Partial<Analytics>): Promise<void> {
    const existing = await db
      .select()
      .from(analytics)
      .where(eq(analytics.date, date))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(analytics)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(analytics.date, date));
    } else {
      await db
        .insert(analytics)
        .values({ date, ...updates });
    }
  }

  async getDashboardStats() {
    // Get total visitors (sum of unique visitors from analytics)
    const [visitorsResult] = await db
      .select({ total: sql<number>`COALESCE(SUM(${analytics.uniqueVisitors}), 0)` })
      .from(analytics);

    // Get total conversions
    const [conversionsResult] = await db
      .select({ total: sql<number>`COALESCE(SUM(${analytics.conversions}), 0)` })
      .from(analytics);

    // Mock revenue calculation (conversions * average deal value)
    const totalRevenue = (conversionsResult?.total || 0) * 150; // $150 average

    // Get active users (unique visitors in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const [activeUsersResult] = await db
      .select({ total: sql<number>`COALESCE(SUM(${analytics.uniqueVisitors}), 0)` })
      .from(analytics)
      .where(gte(analytics.date, thirtyDaysAgo.toISOString().split('T')[0]));

    // Get recent activity
    const recentActivity = await this.getRecentActivity(10);

    return {
      totalVisitors: visitorsResult?.total || 0,
      totalConversions: conversionsResult?.total || 0,
      totalRevenue,
      activeUsers: activeUsersResult?.total || 0,
      recentActivity,
    };
  }
}

export const storage = new DatabaseStorage();
