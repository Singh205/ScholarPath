import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ScholarshipProvider } from './context/ScholarshipContext';
import { AppShell } from './components/layout/AppShell';

import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DiscoveryPage } from './pages/DiscoveryPage';
import { ScholarshipDetailPage } from './pages/ScholarshipDetailPage';
import { AIMatchingPage } from './pages/AIMatchingPage';
import { ApplicationAssistantPage } from './pages/ApplicationAssistantPage';
import { SafetyCenterPage } from './pages/SafetyCenterPage';
import { MyApplicationsPage } from './pages/MyApplicationsPage';
import { SavedScholarshipsPage } from './pages/SavedScholarshipsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ArchitecturePage } from './pages/ArchitecturePage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ScholarshipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />

            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppShell />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="discovery" element={<DiscoveryPage />} />
              <Route path="scholarship/:id" element={<ScholarshipDetailPage />} />
              <Route path="matching" element={<AIMatchingPage />} />
              <Route path="applications" element={<MyApplicationsPage />} />
              <Route path="application/:id" element={<ApplicationAssistantPage />} />
              <Route path="safety" element={<SafetyCenterPage />} />
              <Route path="saved" element={<SavedScholarshipsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="architecture" element={<ArchitecturePage />} />
            </Route>

            <Route path="/architecture" element={<ArchitecturePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ScholarshipProvider>
    </AuthProvider>
  );
};

export default App;
