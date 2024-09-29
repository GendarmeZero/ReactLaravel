import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm({ email });
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/forgotpassword", { email });
            setEmail("");
            
            if (response.data.status == "success") {
                Swal.fire({
                    icon: "success",
                    title: "Reset Password",
                    text: "New Password Send your EMail.",
                }).then(()=>{
                    setEmail("");
                    setValidationErrors({});
                    navigate('/login');
                });
                
                
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Password Reset Failed",
                    text: response.data.message || "An error occurred while processing your request. Please try again later.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Password Reset Failed",
                text: "An error occurred while processing your request. Please try again later.",
            });
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const validateForm = (data) => {
        let errors = {};
        if (!data.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email address is invalid";
        }
        return errors;
    };

    const imagePath = process.env.PUBLIC_URL + '/images/bg-image.webp';

    return (
        <section className="vh-100 bg-image" style={{ backgroundImage: `url('${imagePath}')` }}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Reset Password</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-outline mb-4">
                                            <input type="text" name="email" placeholder="Enter Email" className="form-control" value={email} onChange={handleChange} />
                                            {validationErrors.email && <span className="text-danger">{validationErrors.email}</span>}
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                                    </form>
                                    <p className="text-center text-muted mt-5 mb-0">Go to Login? <a href="/login" className="fw-bold text-body"><u>Login here</u></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;