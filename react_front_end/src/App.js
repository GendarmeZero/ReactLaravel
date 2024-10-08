import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import { AuthProvider } from './components/AuthContext/AuthContext';  
import Register from './components/Register/Register';
import Login from './components/login/Login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Dashboard from './components/Dashboard/dashboard';
// import EmailVerification from './components/EmailVerification/EmailVerification';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/ChangePassword/ChangePassword';
import Home from './components/home/home';
import UsersTable from './components/Users/Users';
import Contacts from './components/Contact/Contact';
import Unauthorized from './components/unauthorized/unauthorized';
import NotFound from './components/NotFound/NotFound';

function App() {
    const currentUser = {
        role: 'Managers', // You can change this to 'Users' or another role to test
      };
    return (
        <AuthProvider>
            <div id="wrapper">
                <div id="content-wrapper">
                    <Routes>
                        {/* Public Routes */}
                        {/* <Route path="/email-verification" element={<EmailVerification />} /> */}
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path="/unauthorized" element={<Unauthorized />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/forgotpassword" element={<ForgotPassword />} />

                        {/* Protected Routes */}
                        <Route path='/changepassword' element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
                        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                         
                        {/* Managers and Supervisors Protected Routes */}
                        <Route path='/dashboard' element={<ProtectedRoute requiredRole="Managers"><Dashboard /></ProtectedRoute>} />
                        <Route path='/dashboard/supervisor' element={<ProtectedRoute requiredRole="Supervisor"><Dashboard /></ProtectedRoute>} />
                        <Route path="/users" element={<ProtectedRoute requiredRole="Managers"><UsersTable /></ProtectedRoute>} />
                        <Route path="/contacts" element={<ProtectedRoute requiredRole="Managers"><Contacts userRole={currentUser.role} /></ProtectedRoute>} />

                        {/* Catch-all Route for 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </AuthProvider>
    );
}

export default App;
