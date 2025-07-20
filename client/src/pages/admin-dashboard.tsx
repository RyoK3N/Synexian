import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  LogOut, 
  Mail,
  Calendar,
  Shield,
  BarChart3,
  PieChart,
  Zap
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { getQueryFn, apiRequest } from "@/lib/queryClient";
import { AuthGuard } from "@/components/auth-guard";
import { authService } from "@/lib/auth";
import type { AnalyticsData } from "@/types/analytics";

export default function AdminDashboard() {
  const { toast } = useToast();
  const user = authService.getUser();

  // Fetch analytics data
  const { data: analytics, isLoading, error } = useQuery({
    queryKey: ["/api/admin/analytics"],
    queryFn: getQueryFn({ on401: "throw" }),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const handleLogout = () => {
    authService.logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error Loading Dashboard</CardTitle>
            <CardDescription>
              Failed to load analytics data. Please check your connection and try again.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = "/admin"} variant="outline" className="w-full">
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats: AnalyticsData = analytics || {
    visitors: 0,
    conversions: 0,
    revenue: 0,
    activeUsers: 0,
    recentActivity: []
  };

  return (
    <AuthGuard requireAdmin={true}>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent">Synexian Labs</h1>
                <p className="text-sm text-gray-600">Analytics Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.username}</p>
                <p className="text-xs text-gray-600">{user.role}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.username}!
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your business today.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {isLoading ? (
                  <div className="w-16 h-6 bg-muted animate-pulse rounded" />
                ) : (
                  stats.visitors.toLocaleString()
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {isLoading ? (
                  <div className="w-16 h-6 bg-muted animate-pulse rounded" />
                ) : (
                  stats.conversions.toLocaleString()
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {isLoading ? (
                  <div className="w-20 h-6 bg-muted animate-pulse rounded" />
                ) : (
                  `$${stats.revenue.toLocaleString()}`
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+15%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {isLoading ? (
                  <div className="w-16 h-6 bg-muted animate-pulse rounded" />
                ) : (
                  stats.activeUsers.toLocaleString()
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5%</span> from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts and Activity */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Traffic Chart Placeholder */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <CardTitle>Traffic Overview</CardTitle>
                </div>
                <CardDescription>Daily website traffic for the past 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-b from-accent/10 to-transparent rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Chart visualization would be implemented here
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Integration with Chart.js or Recharts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="card-hover">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <CardTitle>Recent Activity</CardTitle>
                </div>
                <CardDescription>Latest user interactions and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-4">
                    {isLoading ? (
                      // Loading skeleton
                      Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                          <div className="w-8 h-8 bg-muted animate-pulse rounded-full" />
                          <div className="flex-1 space-y-2">
                            <div className="w-32 h-4 bg-muted animate-pulse rounded" />
                            <div className="w-24 h-3 bg-muted animate-pulse rounded" />
                          </div>
                        </div>
                      ))
                    ) : stats.recentActivity.length > 0 ? (
                      stats.recentActivity.map((activity: any) => (
                        <div key={activity.id} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            {activity.type === 'contact_form_submission' && <Mail className="w-4 h-4 text-white" />}
                            {activity.type === 'page_view' && <Activity className="w-4 h-4 text-white" />}
                            {activity.type === 'successful_login' && <Shield className="w-4 h-4 text-white" />}
                            {!['contact_form_submission', 'page_view', 'successful_login'].includes(activity.type) && <Users className="w-4 h-4 text-white" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(activity.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {activity.type.replace('_', ' ')}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No recent activity</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* System Status */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle>System Status</CardTitle>
              </div>
              <CardDescription>Current system health and security status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Database</p>
                    <p className="text-xs text-muted-foreground">Operational</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <p className="text-sm font-medium text-foreground">API Services</p>
                    <p className="text-xs text-muted-foreground">Healthy</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Security</p>
                    <p className="text-xs text-muted-foreground">Protected</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </motion.div>
    </AuthGuard>
  );
}
