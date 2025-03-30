
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const DashboardRedirect: React.FC = () => {
  const { userRole, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading) {
      if (userRole === "doctor") {
        navigate("/doctor-dashboard");
      } else if (userRole === "patient") {
        navigate("/patient-dashboard");
      } else if (userRole === "admin") {
        navigate("/admin-dashboard");
      }
    }
  }, [userRole, loading, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-carefusion-background to-blue-50 dark:from-carefusion-dark dark:to-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-carefusion-primary border-t-transparent rounded-full animate-spin"></div>
        <h2 className="text-xl font-semibold mb-2">Redirecting to your dashboard...</h2>
        <p className="text-gray-500 dark:text-gray-400">Please wait while we prepare your experience.</p>
      </div>
    </div>
  );
};

export default DashboardRedirect;
