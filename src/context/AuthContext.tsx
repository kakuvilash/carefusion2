
import React, { createContext, useContext, useState, useEffect } from "react";

type UserRole = "patient" | "doctor" | "admin" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  userRole: UserRole;
  loading: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  signUp: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  googleSignIn: (role?: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // For demo purposes, using mock authentication
  useEffect(() => {
    // Simulate authentication state check
    const checkAuth = () => {
      const savedUser = localStorage.getItem("carefusion_user");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string, role: UserRole = "patient") => {
    setLoading(true);
    try {
      // Mock login - in a real app, this would be an API call
      const mockUser: User = {
        id: "user123",
        name: "Demo User",
        email: email,
        role: role, // Use the selected role
        profilePicture: "https://ui-avatars.com/api/?name=Demo+User&background=0070F3&color=fff"
      };
      
      setCurrentUser(mockUser);
      localStorage.setItem("carefusion_user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      // Mock signup - in a real app, this would be an API call
      const mockUser: User = {
        id: "user" + Math.floor(Math.random() * 1000),
        name: name,
        email: email,
        role: role,
        profilePicture: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=0070F3&color=fff`
      };
      
      setCurrentUser(mockUser);
      localStorage.setItem("carefusion_user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    // Mock logout
    setCurrentUser(null);
    localStorage.removeItem("carefusion_user");
  };

  const googleSignIn = async (role: UserRole = "patient") => {
    setLoading(true);
    try {
      // Mock Google sign in
      const mockUser: User = {
        id: "google123",
        name: "Google User",
        email: "google@example.com",
        role: role, // Use the selected role
        profilePicture: "https://ui-avatars.com/api/?name=Google+User&background=0070F3&color=fff"
      };
      
      setCurrentUser(mockUser);
      localStorage.setItem("carefusion_user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Google sign in error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    userRole: currentUser?.role || null,
    loading,
    login,
    signUp,
    logout,
    googleSignIn
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
