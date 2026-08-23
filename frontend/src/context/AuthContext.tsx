import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile } from '../types/profile';
import { fetchUserProfile, updateUserProfile } from '../services/profileService';
import { getStorageItem, setStorageItem, removeStorageItem } from '../lib/storage';

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: StudentProfile | null;
  isLoading: boolean;
  loginDemoUser: () => void;
  logoutUser: () => void;
  updateProfile: (profile: StudentProfile) => Promise<void>;
  hasCompletedOnboarding: boolean;
  setOnboardingCompleted: (val: boolean) => void;
}

const AUTH_STORAGE_KEY = 'scholarpath_is_authenticated';
const ONBOARDING_STORAGE_KEY = 'scholarpath_onboarding_done';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => getStorageItem(AUTH_STORAGE_KEY, true));
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => getStorageItem(ONBOARDING_STORAGE_KEY, true));
  const [userProfile, setUserProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      try {
        if (isAuthenticated) {
          const profile = await fetchUserProfile();
          setUserProfile(profile);
        }
      } catch (err) {
        console.error('Failed to load user profile:', err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [isAuthenticated]);

  const loginDemoUser = () => {
    setIsAuthenticated(true);
    setStorageItem(AUTH_STORAGE_KEY, true);
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    removeStorageItem(AUTH_STORAGE_KEY);
  };

  const setOnboardingCompleted = (val: boolean) => {
    setHasCompletedOnboarding(val);
    setStorageItem(ONBOARDING_STORAGE_KEY, val);
  };

  const updateProfile = async (profile: StudentProfile) => {
    const updated = await updateUserProfile(profile);
    setUserProfile(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userProfile,
        isLoading,
        loginDemoUser,
        logoutUser,
        updateProfile,
        hasCompletedOnboarding,
        setOnboardingCompleted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
