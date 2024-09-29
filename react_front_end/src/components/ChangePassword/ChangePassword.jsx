import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../Navhome/NavHome";

const ChangePassword = () => {
    const { user, logout } = useAuth();
    const [ formData, setFormData] = useState({
        cpassword:"",
        npassword:"",
        cnpassword:""
    });

    const [ validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const errors = {};

        if(!formData.cpassword.trim()){
            errors.cpassword = "Current Password is Required";
        }
        if(!formData.npassword.trim()){
            errors.npassword = "New Password is Required";
        }
        if(!formData.cnpassword.trim()){
            errors.cnpassword = "Confirm New Password is Required";
        }else if(formData.npassword != formData.cnpassword){
            errors.cnpassword = "New Password and Confirm New Password Is Not Match";
        }

        if(Object.keys(errors).length > 0 ){
            setValidationErrors(errors);
            return;
        }

        try{
            const response = await axios.post("http://127.0.0.1:8000/api/changepassword",{
                ...formData,
                userId:user.id
            });

            if (response.data.status == "success") {
                Swal.fire({
                    icon: "success",
                    title: "Change Password",
                    text: "Password Change successfully",
                }).then(() => {
                    logout();
                });
                
                
            } else {
                Swal.fire({
                    icon: "error",
                    title: "CHange Password Failed",
                    text: response.data.message || "An error occurred while processing your request. Please try again later.",
                });
            }
            
        }catch(error){
            Swal.fire({
                icon: "error",
                title: "Change Password Failed",
                text: "An error occurred while processing your request. Please try again later.",
            });
        }

    }   
    const imagePath = process.env.PUBLIC_URL + '/images/bg-image.webp';

    return(
        <>
            <Navbar />
            <section className="vh-100 bg-image"  style={{ backgroundImage: `url('${imagePath}')` }}>
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{borderRadius: '15px'}}>
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5">Change Password</h2>
                                        <form method="POST" onSubmit={handleSubmit}>
                                            
                                            <div className="form-outline mb-4">
                                                <input type="password" name="cpassword" placeholder="Enter current Password" className="form-control" onChange={handleChange} />
                                                {validationErrors.cpassword && <span className="text-danger">{validationErrors.cpassword}</span>}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="password" name="npassword" placeholder="Enter New Password" className="form-control" onChange={handleChange} />
                                                {validationErrors.npassword && <span className="text-danger">{validationErrors.npassword}</span>}
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="password" name="cnpassword" placeholder="Enter Confirm New Password" className="form-control" onChange={handleChange} />
                                                {validationErrors.cnpassword && <span className="text-danger">{validationErrors.cnpassword}</span>}
                                            </div>
                                            
                                            <button type="submit" className="btn btn-primary mt-4">Submit</button>
                                        </form>
                                        
                                        <p className="text-center text-muted mt-5 mb-0">GO to Home? <a href="/home"
                                            className="fw-bold text-body"><u>Home</u></a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
        </>

    )
}

export default ChangePassword;