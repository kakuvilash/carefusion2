
import React from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  type: 'login' | 'signup';
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, type }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-carefusion-background to-blue-50 dark:from-carefusion-dark dark:to-gray-900">
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gradient">
              CareFusion
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              AI-powered healthcare platform
            </p>
          </div>
          
          <div className="glass-card-lg p-8">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            </div>
            
            {children}
            
            <div className="mt-6 text-center text-sm">
              {type === 'login' ? (
                <p className="text-gray-500 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/signup" className="font-medium text-carefusion-primary hover:text-carefusion-secondary">
                    Sign up
                  </Link>
                </p>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-carefusion-primary hover:text-carefusion-secondary">
                    Log in
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-carefusion-primary to-carefusion-secondary opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
          <div className="glass-card p-8 max-w-lg">
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to CareFusion</h2>
            <p className="text-white/90 mb-6">
              Your all-in-one healthcare platform with AI-powered solutions for patients and doctors.
            </p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center">
                <div className="mr-2 p-1 bg-white/20 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                AI-powered symptom analysis
              </li>
              <li className="flex items-center">
                <div className="mr-2 p-1 bg-white/20 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Secure medical records management
              </li>
              <li className="flex items-center">
                <div className="mr-2 p-1 bg-white/20 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Live consultation with doctors
              </li>
              <li className="flex items-center">
                <div className="mr-2 p-1 bg-white/20 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Emergency SOS features
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
