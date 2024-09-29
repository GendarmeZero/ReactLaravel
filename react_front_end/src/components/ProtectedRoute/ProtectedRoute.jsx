import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext'; // Adjust the import path as necessary

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useAuth();
    // console.log("Current User:", user); // For debugging

    if (!user) {
        // If no user is logged in, redirect to login
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // If user role does not match requiredRole, redirect to unauthorized
        return <Navigate to="/unauthorized" />;
    }

    // If user is authenticated and has the required role, render the children
    return children;
};

export default ProtectedRoute;

