import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext'; // Adjust the import path as necessary

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useAuth();
    // console.log("Current User:", user); // Debugging

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (Array.isArray(requiredRole) && !requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};


export default ProtectedRoute;
