import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { authService } from "@/lib/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = authService.getToken();
        
        if (!token) {
          setLocation("/admin");
          return;
        }

        // Verify token with server
        const verification = await authService.verifyToken();
        
        if (!verification.valid) {
          authService.logout();
          setLocation("/admin");
          return;
        }

        if (requireAdmin && verification.user?.role !== "admin") {
          setLocation("/admin");
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication check failed:", error);
        authService.logout();
        setLocation("/admin");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setLocation, requireAdmin]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-primary-gradient/5">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-neutral">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}