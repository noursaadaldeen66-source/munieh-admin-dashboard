
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import DashboardLayout from './DashboardLayout';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // You can add more sophisticated role-based checks here if needed for the top-level route
  // For now, we'll assume if authenticated, they can access the dashboard layout
  // and individual components will handle their own role-based rendering/redirection.

  return <DashboardLayout user={user} />;
};

export default ProtectedRoute;
