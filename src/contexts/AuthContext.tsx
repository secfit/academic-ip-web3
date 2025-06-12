import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  institution: string;
  role: 'researcher' | 'admin' | 'reviewer';
  avatar?: string;
  createdAt: Date;
  lastLogin: Date;
  isVerified: boolean;
  subscription: 'free' | 'premium' | 'enterprise';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  institution: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@university.edu',
    firstName: 'Dr. Sarah',
    lastName: 'Johnson',
    institution: 'Stanford University',
    role: 'researcher',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date(),
    isVerified: true,
    subscription: 'premium'
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = Cookies.get('auth_token');
    const userData = Cookies.get('user_data');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        Cookies.remove('auth_token');
        Cookies.remove('user_data');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (!foundUser || password !== 'demo123') {
      setLoading(false);
      throw new Error('Invalid email or password');
    }
    
    const updatedUser = { ...foundUser, lastLogin: new Date() };
    
    // Set cookies
    Cookies.set('auth_token', 'mock_jwt_token', { expires: 7 });
    Cookies.set('user_data', JSON.stringify(updatedUser), { expires: 7 });
    
    setUser(updatedUser);
    setLoading(false);
  };

  const signup = async (userData: SignupData): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    if (mockUsers.find(u => u.email === userData.email)) {
      setLoading(false);
      throw new Error('User already exists with this email');
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      institution: userData.institution,
      role: 'researcher',
      createdAt: new Date(),
      lastLogin: new Date(),
      isVerified: false,
      subscription: 'free'
    };
    
    mockUsers.push(newUser);
    
    // Set cookies
    Cookies.set('auth_token', 'mock_jwt_token', { expires: 7 });
    Cookies.set('user_data', JSON.stringify(newUser), { expires: 7 });
    
    setUser(newUser);
    setLoading(false);
  };

  const logout = (): void => {
    Cookies.remove('auth_token');
    Cookies.remove('user_data');
    setUser(null);
  };

  const forgotPassword = async (email: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (!foundUser) {
      throw new Error('No account found with this email address');
    }
    
    // In production, send actual email
    console.log(`Password reset email sent to ${email}`);
  };

  const resetPassword = async (token: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, validate token and update password
    console.log('Password reset successfully');
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    if (!user) throw new Error('No user logged in');
    
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...user, ...data };
    
    // Update cookies
    Cookies.set('user_data', JSON.stringify(updatedUser), { expires: 7 });
    
    setUser(updatedUser);
    setLoading(false);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext }