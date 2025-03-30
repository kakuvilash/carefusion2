
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  MessageSquare, 
  User, 
  Video,
  Activity,
  ArrowRight
} from "lucide-react";

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-carefusion-background to-blue-50 dark:from-carefusion-dark dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-carefusion-primary to-carefusion-secondary text-transparent bg-clip-text">
              CareFusion
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              AI-powered healthcare platform connecting patients and doctors for seamless medical care and consultation
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="bg-carefusion-primary hover:bg-carefusion-primary/90 text-white px-6 py-3 rounded-xl text-lg"
                onClick={() => navigate("/signup")}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="px-6 py-3 rounded-xl text-lg"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating icons with animation */}
        <div className="hidden md:block absolute -top-10 left-10 glass rounded-full p-4 animate-bounce-soft">
          <Brain className="h-8 w-8 text-carefusion-primary" />
        </div>
        <div className="hidden md:block absolute top-20 right-20 glass rounded-full p-3 animate-pulse-soft">
          <ShieldCheck className="h-6 w-6 text-carefusion-secondary" />
        </div>
        <div className="hidden md:block absolute bottom-10 left-1/4 glass rounded-full p-3 animate-bounce-soft delay-300">
          <Calendar className="h-6 w-6 text-carefusion-accent" />
        </div>
        <div className="hidden md:block absolute bottom-30 right-1/4 glass rounded-full p-4 animate-pulse-soft delay-500">
          <FileText className="h-8 w-8 text-carefusion-primary" />
        </div>
      </div>
      
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by AI, Designed for Care</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience healthcare reimagined with our innovative platform that brings together patients and doctors using cutting-edge AI technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card-lg p-6 animate-hover">
            <div className="rounded-full bg-carefusion-primary/10 p-3 w-14 h-14 flex items-center justify-center mb-4">
              <Brain className="h-7 w-7 text-carefusion-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Symptom Checker</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Describe your symptoms and get AI-powered insights on possible conditions and next steps.
            </p>
          </div>
          
          <div className="glass-card-lg p-6 animate-hover">
            <div className="rounded-full bg-carefusion-secondary/10 p-3 w-14 h-14 flex items-center justify-center mb-4">
              <Calendar className="h-7 w-7 text-carefusion-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Easy Appointment Booking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Schedule appointments with doctors, receive reminders, and manage your medical calendar.
            </p>
          </div>
          
          <div className="glass-card-lg p-6 animate-hover">
            <div className="rounded-full bg-carefusion-accent/10 p-3 w-14 h-14 flex items-center justify-center mb-4">
              <FileText className="h-7 w-7 text-carefusion-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Medical Records</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Store and access your medical history, prescriptions, and reports in one secure location.
            </p>
          </div>
          
          <div className="glass-card-lg p-6 animate-hover">
            <div className="rounded-full bg-carefusion-secondary/10 p-3 w-14 h-14 flex items-center justify-center mb-4">
              <Video className="h-7 w-7 text-carefusion-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Video Consultations</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with healthcare providers through secure, HIPAA-compliant video calls.
            </p>
          </div>
          
          <div className="glass-card-lg p-6 animate-hover">
            <div className="rounded-full bg-carefusion-primary/10 p-3 w-14 h-14 flex items-center justify-center mb-4">
              <MessageSquare className="h-7 w-7 text-carefusion-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Chat with Doctors</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Message your healthcare providers directly for quick questions and follow-ups.
            </p>
          </div>
          
          <div className="glass-card-lg p-6 animate-hover">
            <div className="rounded-full bg-carefusion-accent/10 p-3 w-14 h-14 flex items-center justify-center mb-4">
              <Activity className="h-7 w-7 text-carefusion-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">Health Insights</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get personalized health analytics and recommendations based on your medical data.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-card-xl bg-gradient-to-r from-carefusion-primary/10 to-carefusion-secondary/10 p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the Future of Healthcare Today</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of patients and healthcare providers already using CareFusion to streamline their healthcare journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-carefusion-primary hover:bg-carefusion-primary/90 text-white px-6 py-3 rounded-xl text-lg"
              onClick={() => navigate("/signup")}
            >
              Sign Up as Patient
              <User className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className="px-6 py-3 rounded-xl text-lg"
              onClick={() => navigate("/signup")}
            >
              Sign Up as Doctor
              <ShieldCheck className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-gradient">CareFusion</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">AI-powered healthcare platform</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-carefusion-primary dark:hover:text-carefusion-primary">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-carefusion-primary dark:hover:text-carefusion-primary">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-carefusion-primary dark:hover:text-carefusion-primary">
                Contact Us
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} CareFusion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
