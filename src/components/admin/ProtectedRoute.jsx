import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

/**
 * This component protects routes that require admin privileges.
 * It checks the `useAuth` context for loading state, user, and admin role.
 */
const ProtectedRoute = () => {
  const { user, isAdmin, loading } = useAuth();
    // const user=true;
    // const isAdmin=true;
    // const loading=false;
  // 1. Show a loading spinner while auth state is being determined
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  // 2. If not loading, check for user and admin role
  if (!user || !isAdmin) {
    // Redirect to the homepage if not an admin
    return <Navigate to="/" replace />;
  }

  // 3. If user is an admin, render the nested routes (AdminLayout, etc.)
  return <Outlet />;
};

export default ProtectedRoute;