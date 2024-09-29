import React from "react";
import { useAuth } from "../AuthContext/AuthContext";
import Navbar from "../Navhome/NavHome";

const Profile = () => {
    const { user } = useAuth();

    return (
        <>
        <Navbar />
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <h5 className="card-header">Profile</h5>
                        <div className="card-body">
                            <p className="card-text"><strong>Name:</strong> {user.name}</p>
                            <p className="card-text"><strong>Email:</strong> {user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
        
    );
};

export default Profile;