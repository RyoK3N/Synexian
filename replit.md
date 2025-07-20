# Synexian Labs - AI-Powered Business Solutions Platform

## Overview

This is a full-stack web application for Synexian Labs, an AI and automation consulting company. The platform combines a modern React frontend with an Express.js backend, featuring user authentication, contact management, analytics tracking, and an admin dashboard.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth transitions and interactions

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Security**: Rate limiting, CORS protection, Helmet security headers
- **Session Management**: Express sessions with PostgreSQL store

### Database Architecture
- **ORM**: Drizzle with Neon serverless PostgreSQL
- **Schema**: Centralized schema definition in `/shared/schema.ts`
- **Tables**: Users, contact submissions, activity logs, analytics
- **Migrations**: Managed through Drizzle Kit

## Key Components

### Authentication System
- JWT-based authentication with secure token storage
- Password hashing using bcrypt with 12 salt rounds
- Rate limiting on authentication endpoints (5 attempts per 15 minutes)
- Two-factor authentication support (schema ready)
- Admin-only access to dashboard features

### Contact Management
- Public contact form with validation
- Rate limiting (3 submissions per minute)
- Admin dashboard for managing submissions
- Status tracking (new, read, responded)
- Email and company information capture

### Analytics & Tracking
- Page view tracking with IP and user agent logging
- Activity logging for user interactions
- Daily analytics aggregation
- Dashboard statistics and reporting
- Session tracking with unique identifiers

### Admin Dashboard
- Protected admin interface
- Real-time analytics and metrics
- Contact submission management
- Activity log monitoring
- User authentication status tracking

### UI Components
- Comprehensive Shadcn/ui component library
- Custom design system with brand colors
- Responsive design patterns
- Accessibility-focused implementations
- Dark mode support (theme system ready)

## Data Flow

### User Interaction Flow
1. **Public Website**: Users browse services and company information
2. **Contact Form**: Visitors submit inquiries through validated forms
3. **Analytics Tracking**: Page views and interactions are logged automatically
4. **Admin Access**: Administrators log in to manage submissions and view analytics

### Data Processing Pipeline
1. **Frontend Validation**: Zod schemas validate all form inputs
2. **API Requests**: TanStack Query manages server communication
3. **Backend Validation**: Express middleware validates and sanitizes data
4. **Database Operations**: Drizzle ORM handles all database interactions
5. **Response Handling**: Structured JSON responses with error handling

### Security Layer
1. **Input Validation**: Multiple validation layers prevent malicious input
2. **Rate Limiting**: Protects against abuse and spam
3. **Authentication**: JWT tokens secure admin endpoints
4. **Session Management**: Secure session handling with PostgreSQL storage
5. **CORS Protection**: Configured for specific domain access

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **TypeScript**: Full TypeScript implementation across frontend and backend
- **Vite**: Modern build tooling with hot module replacement
- **Express.js**: Web server framework with middleware support

### Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations
- **Connection Pooling**: Efficient database connection management

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library for smooth interactions
- **Lucide React**: Consistent icon system

### Security & Authentication
- **bcrypt**: Password hashing and security
- **jsonwebtoken**: JWT token generation and validation
- **express-rate-limit**: API rate limiting
- **helmet**: Security headers middleware
- **cors**: Cross-origin resource sharing configuration

### Development Tools
- **Replit Integration**: Development environment optimization
- **PostCSS**: CSS processing and optimization
- **ESBuild**: Fast JavaScript bundling for production

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot reload
- **Database**: Neon serverless PostgreSQL instance
- **Environment Variables**: Secure configuration management
- **Error Handling**: Development error overlays and logging

### Production Build Process
1. **Frontend Build**: Vite builds optimized static assets
2. **Backend Build**: ESBuild bundles server code
3. **Asset Management**: Static files served from `/dist/public`
4. **Environment Configuration**: Production environment variables

### Database Management
- **Schema Migrations**: Drizzle Kit handles database schema changes
- **Connection Pooling**: Neon's built-in connection management
- **Backup Strategy**: Managed by Neon's infrastructure
- **Performance Monitoring**: Built-in query logging and analytics

### Security Considerations
- **HTTPS Enforcement**: SSL/TLS encryption in production
- **JWT Secret**: Secure token signing with environment variables
- **Rate Limiting**: Production-ready abuse prevention
- **Input Sanitization**: Multiple layers of data validation
- **Session Security**: Secure cookie configuration for production

## Recent UI/UX and Brand Updates (January 20, 2025)

### Professional Brand Consistency Achieved
- **Brand Colors**: Implemented consistent blue-to-purple gradient scheme throughout all components
- **Typography**: Unified font weights, sizes, and spacing across all pages
- **Contrast**: Fixed all text contrast issues with light text on dark backgrounds and dark text on light backgrounds
- **Component Styling**: Updated navigation, hero, services, footer, and admin dashboard with cohesive design
- **Professional Polish**: Production-ready appearance with modern gradients and smooth animations

### Key Design Improvements
1. **Navigation**: Professional gradient logo, consistent text colors, smooth hover effects
2. **Hero Section**: Light gradient background, improved readability, modern badge design
3. **Services**: Updated gradient cards, better color harmony, enhanced visual hierarchy
4. **Footer**: Dark gradient background, excellent contrast, comprehensive navigation links
5. **Admin Dashboard**: Consistent branding, professional header design, improved typography
6. **Color System**: Updated CSS variables for better brand alignment and accessibility