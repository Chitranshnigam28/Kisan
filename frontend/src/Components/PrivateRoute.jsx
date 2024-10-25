import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('token'); // Check if token is in localStorage

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;