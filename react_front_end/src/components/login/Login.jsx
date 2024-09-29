import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from '../AuthContext/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, user } = useAuth();  
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login", formData);
            login(response.data.user);

            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Welcome back!",
            }).then(() => {
                // Redirect based on role
                if (response.data.user.role === 'admin') {
                    navigate("/dashboard");
                } else {
                    navigate("/home");
                }
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Invalid email or password. Please try again.",
                });
            } else {
                const responseData = error.response.data;
                setValidationErrors(responseData);
                if (responseData) {
                    setValidationErrors(responseData);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: responseData || "Registration failed.",
                    });
                }
            }
        }
    };

    // If user is already authenticated, redirect to the appropriate page
    if (user) {
        return <Navigate to={user.role === 'admin' ? "/dashboard" : "/home"} />;
    }

    const imagePath = process.env.PUBLIC_URL + '/images/bg-image.webp';

    return (
        <section className="vh-100 bg-image" style={{ backgroundImage: `url('${imagePath}')` }}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Login</h2>
                                    <form method="POST" onSubmit={handleSubmit}>
                                        <div className="form-outline mb-4">
                                            <input 
                                                type="text" 
                                                name="email" 
                                                placeholder="Enter Email" 
                                                className="form-control" 
                                                onChange={handleChange} 
                                            />
                                            {validationErrors.email && <span className="text-danger">{validationErrors.email[0]}</span>}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input 
                                                type="password" 
                                                name="password" 
                                                placeholder="Enter Password" 
                                                className="form-control" 
                                                onChange={handleChange} 
                                            />
                                            {validationErrors.password && <span className="text-danger">{validationErrors.password[0]}</span>}
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <Link to="/forgotpassword">Forgot Password?</Link>
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                                    </form>
                                    <p className="text-center text-muted mt-5 mb-0">Not an account? <Link to="/register" className="fw-bold text-body"><u>Register here</u></Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
