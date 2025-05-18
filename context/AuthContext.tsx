import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => void;
  signUp: (name: string, email: string, password: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const loadUser = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        if (userString) {
          const userData = JSON.parse(userString);
          setUser(userData);
          router.replace('/(tabs)/Home');
        } else {
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, you would validate credentials against a backend
      // For demo, we'll just create a mock user
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email: email,
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Sign in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // In a real app, you would register the user with a backend
      // For demo, we'll just create a mock user
      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Sign up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}