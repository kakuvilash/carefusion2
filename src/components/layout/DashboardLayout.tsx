
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/context/AuthContext";
import { Bell, Calendar, ChevronLeft, ChevronRight, LayoutDashboard, LogOut, MessageSquare, Settings, SunMoon, User, FileText, Activity, Pill, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { currentUser, logout, userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Success",
        description: "You have been logged out",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };
  
  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };
  
  const patientMenuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { label: "Appointments", icon: <Calendar size={20} />, path: "/appointments" },
    { label: "Medical Records", icon: <FileText size={20} />, path: "/medical-records" },
    { label: "AI Symptom Checker", icon: <Activity size={20} />, path: "/symptom-checker" },
    { label: "Chat with Doctor", icon: <MessageSquare size={20} />, path: "/chat" },
  ];
  
  const doctorMenuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { label: "Appointments", icon: <Calendar size={20} />, path: "/appointments" },
    { label: "Patient Records", icon: <FileText size={20} />, path: "/patient-records" },
    { label: "Medicine Advisor", icon: <Pill size={20} />, path: "/medicine-advisor" },
    { label: "Chat with Patients", icon: <MessageSquare size={20} />, path: "/chat" },
  ];
  
  const menuItems = userRole === "doctor" ? doctorMenuItems : patientMenuItems;
  
  const renderSidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        {!collapsed && (
          <h2 className="font-bold text-xl text-gradient">CareFusion</h2>
        )}
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <TooltipProvider key={item.path} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? "bg-carefusion-primary/10 text-carefusion-primary dark:bg-carefusion-primary/20"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      } ${(!isMobile && collapsed) ? "justify-center" : "justify-start"}`
                    }
                    onClick={() => isMobile && setMobileMenuOpen(false)}
                  >
                    <div>{item.icon}</div>
                    {(!isMobile && !collapsed || isMobile) && <span className="ml-3">{item.label}</span>}
                  </NavLink>
                </TooltipTrigger>
                {!isMobile && collapsed && (
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="space-y-3">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className={`w-full ${(!isMobile && collapsed) ? "justify-center" : "justify-start"}`}
                >
                  <SunMoon size={20} />
                  {(!isMobile && !collapsed || isMobile) && <span className="ml-3">Toggle Theme</span>}
                </Button>
              </TooltipTrigger>
              {!isMobile && collapsed && (
                <TooltipContent side="right">
                  Toggle Theme
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className={`w-full ${(!isMobile && collapsed) ? "justify-center" : "justify-start"}`}
                >
                  <LogOut size={20} />
                  {(!isMobile && !collapsed || isMobile) && <span className="ml-3">Logout</span>}
                </Button>
              </TooltipTrigger>
              {!isMobile && collapsed && (
                <TooltipContent side="right">
                  Logout
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="flex h-screen bg-carefusion-background dark:bg-carefusion-dark">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside 
          className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
            collapsed ? "w-20" : "w-64"
          }`}
        >
          {renderSidebarContent()}
        </aside>
      )}
      
      {/* Mobile Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4 px-6">
          <div className="flex items-center justify-between">
            {isMobile && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu size={20} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[85%] max-w-[300px]">
                  {renderSidebarContent()}
                </SheetContent>
              </Sheet>
            )}
            
            <div className={`${isMobile ? "mx-auto" : "invisible"}`}>
              <h2 className="font-bold text-xl text-gradient">CareFusion</h2>
            </div>
            
            <div className="flex items-center ml-auto space-x-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell size={18} />
                <span className="absolute top-0 right-0 block w-2 h-2 bg-carefusion-primary rounded-full"></span>
              </Button>
              
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={currentUser?.profilePicture} alt={currentUser?.name} />
                  <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{currentUser?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 p-3 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
