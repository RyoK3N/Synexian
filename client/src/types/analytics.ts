export interface AnalyticsData {
  visitors: number;
  conversions: number;
  revenue: number;
  activeUsers: number;
  recentActivity: ActivityLogItem[];
}

export interface ActivityLogItem {
  id: number;
  type: string;
  description: string;
  createdAt: string;
  userId?: number;
  metadata?: Record<string, any>;
}

export interface DashboardStats {
  totalVisitors: number;
  totalConversions: number;
  totalRevenue: number;
  activeUsers: number;
  recentActivity: ActivityLogItem[];
}

export interface ContactSubmission {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message: string;
  status: "new" | "read" | "responded";
  createdAt: string;
}

export interface AnalyticsFilters {
  startDate?: string;
  endDate?: string;
  limit?: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface TrafficData {
  daily: ChartDataPoint[];
  weekly: ChartDataPoint[];
  monthly: ChartDataPoint[];
}

export interface ConversionData {
  rate: number;
  total: number;
  bySource: {
    source: string;
    conversions: number;
    rate: number;
  }[];
}

export interface RevenueData {
  total: number;
  monthly: ChartDataPoint[];
  byService: {
    service: string;
    revenue: number;
    percentage: number;
  }[];
}

export interface UserEngagement {
  averageSessionDuration: number;
  bounceRate: number;
  pageViews: number;
  uniqueVisitors: number;
  returningVisitors: number;
}

export interface SystemHealth {
  database: {
    status: "healthy" | "warning" | "error";
    responseTime: number;
    uptime: number;
  };
  api: {
    status: "healthy" | "warning" | "error";
    responseTime: number;
    errorRate: number;
  };
  security: {
    status: "protected" | "warning" | "vulnerable";
    threatsBlocked: number;
    lastScan: string;
  };
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  serverResponseTime: number;
  databaseQueryTime: number;
  cacheHitRate: number;
}

// API Response Types
export interface AnalyticsApiResponse {
  success: boolean;
  data: AnalyticsData;
  timestamp: string;
}

export interface ContactsApiResponse {
  success: boolean;
  contacts: ContactSubmission[];
  total: number;
  page: number;
  limit: number;
}

// Export types for easier importing
export type ActivityType = 
  | "page_view"
  | "contact_form_submission"
  | "successful_login"
  | "failed_login"
  | "calendly_booking"
  | "user_registration"
  | "password_reset"
  | "admin_action"
  | "system_event"
  | "security_alert";

export type ContactStatus = "new" | "read" | "responded";

export type SystemStatus = "healthy" | "warning" | "error";

export type DateRange = "today" | "yesterday" | "last7days" | "last30days" | "last90days" | "custom";

// Utility types
export type TimePeriod = "hour" | "day" | "week" | "month" | "year";

export interface DateRangeOption {
  label: string;
  value: DateRange;
  startDate: Date;
  endDate: Date;
}

// Form types
export interface AnalyticsFormData {
  dateRange: DateRange;
  startDate?: string;
  endDate?: string;
  metrics: string[];
}

export interface ExportOptions {
  format: "csv" | "xlsx" | "pdf";
  dateRange: DateRange;
  includeCharts: boolean;
  metrics: string[];
}
