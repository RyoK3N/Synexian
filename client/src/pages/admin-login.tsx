import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Zap, User, Lock, Shield, LogIn, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  twoFactor: z.string().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      twoFactor: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await apiRequest("POST", "/api/admin/login", data);
      const result = await response.json();

      if (result.token) {
        localStorage.setItem("admin_token", result.token);
        localStorage.setItem("admin_user", JSON.stringify(result.user));
        
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard!",
        });

        setLocation("/admin/dashboard");
      }
    } catch (error: any) {
      const errorMessage = error.message || "Login failed. Please try again.";
      setLoginError(errorMessage);
      
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-primary-gradient/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-accent-secondary/20">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-to-r from-primary-light to-accent rounded-xl flex items-center justify-center"
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>
            
            <div>
              <CardTitle className="text-2xl font-bold text-primary">Admin Access</CardTitle>
              <CardDescription className="text-neutral">
                Secure access to Synexian Labs dashboard
              </CardDescription>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-trust-blue bg-trust-blue/5 px-4 py-2 rounded-lg border border-trust-blue/20">
              <Shield className="w-4 h-4" />
              <span>256-bit encryption enabled</span>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {loginError && (
                <Alert variant="destructive">
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Username</span>
                </Label>
                <Input
                  id="username"
                  {...form.register("username")}
                  className="focus:ring-trust-blue focus:border-trust-blue"
                  placeholder="Enter your username"
                />
                {form.formState.errors.username && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Password</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...form.register("password")}
                    className="focus:ring-trust-blue focus:border-trust-blue pr-10"
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="twoFactor" className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>2FA Code (Optional)</span>
                </Label>
                <Input
                  id="twoFactor"
                  {...form.register("twoFactor")}
                  className="focus:ring-trust-blue focus:border-trust-blue"
                  placeholder="Enter 6-digit code (use 123456 for demo)"
                  maxLength={6}
                />
                <p className="text-xs text-neutral">
                  For demo purposes, use code: 123456
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-trust-blue to-primary hover:scale-105 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="w-4 h-4" />
                    <span>Secure Login</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-neutral">
                Demo credentials: admin / admin123!@#
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-accent-secondary/20"
            >
              <div className="flex items-center justify-center space-x-2 text-sm text-primary">
                <Shield className="w-4 h-4" />
                <span>Protected by enterprise-grade security</span>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
