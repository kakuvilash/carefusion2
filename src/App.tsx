
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect } from "react";

// Pages
import Index from "./pages/Index";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import DashboardRedirect from "./pages/dashboard/DashboardRedirect";
import AppointmentsDashboard from "./pages/dashboard/AppointmentsDashboard";
import MedicalRecordsDashboard from "./pages/dashboard/MedicalRecordsDashboard";
import PatientRecordsDashboard from "./pages/dashboard/PatientRecordsDashboard";
import MedicineAdvisorDashboard from "./pages/dashboard/MedicineAdvisorDashboard";
import SymptomCheckerDashboard from "./pages/dashboard/SymptomCheckerDashboard";
import ChatDashboard from "./pages/dashboard/ChatDashboard";
import BookAppointmentDashboard from "./pages/dashboard/BookAppointmentDashboard";
import NotFound from "./pages/NotFound";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark" || 
        (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardRedirect />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient-dashboard" 
                element={
                  <ProtectedRoute requiredRole="patient">
                    <PatientDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/doctor-dashboard" 
                element={
                  <ProtectedRoute requiredRole="doctor">
                    <DoctorDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Feature Dashboards */}
              <Route 
                path="/appointments" 
                element={
                  <ProtectedRoute>
                    <AppointmentsDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/book-appointment" 
                element={
                  <ProtectedRoute>
                    <BookAppointmentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/medical-records" 
                element={
                  <ProtectedRoute>
                    <MedicalRecordsDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient-records" 
                element={
                  <ProtectedRoute requiredRole="doctor">
                    <PatientRecordsDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/medicine-advisor" 
                element={
                  <ProtectedRoute requiredRole="doctor">
                    <MedicineAdvisorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/symptom-checker" 
                element={
                  <ProtectedRoute>
                    <SymptomCheckerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/chat" 
                element={
                  <ProtectedRoute>
                    <ChatDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
