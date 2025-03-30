
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "patient" | "doctor" | "admin" | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = null 
}) => {
  const { isAuthenticated, userRole, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-carefusion-background to-blue-50 dark:from-carefusion-dark dark:to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-carefusion-primary border-t-transparent rounded-full animate-spin"></div>
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-500 dark:text-gray-400">Please wait while we authenticate you.</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If requiredRole is specified and doesn't match the userRole, redirect to appropriate dashboard
  if (requiredRole && requiredRole !== userRole) {
    if (userRole === "doctor") {
      return <Navigate to="/doctor-dashboard" replace />;
    } else if (userRole === "patient") {
      return <Navigate to="/patient-dashboard" replace />;
    } else if (userRole === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
