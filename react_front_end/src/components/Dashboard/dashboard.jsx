import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import Navbar from "../Navbar/Nav";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuth();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate('/login'); // Redirect if token doesn't exist
                    return;
                }

                const response = await axios.get("http://127.0.0.1:8000/api/usetdetail", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserDetails(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Authentication Failed",
                        text: "Please log in again.",
                    }).then(() => {
                        navigate("/login");
                    });
                } else {
                    console.error("Error fetching user details:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Unable to fetch user details.",
                    });
                }
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchUserDetails();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>; // You can customize the loading state
    }

    return (
        <div id="page-top">
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <Navbar />
                    <div className="container-fluid">
                        {/* <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                            <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                <i className="fas fa-download fa-sm text-white-50"></i> Generate Report
                            </a>
                        </div> */}

                        <div className="row">
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                    Earnings (Monthly)
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                    $40,000
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-success shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                    Earnings (Annual)
                                                </div>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                    $215,000
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* User Details Section */}
                            {userDetails && (
                                <div className="col-md-6">
                                    <h3>Welcome, {userDetails.name || user.name}!</h3>
                                    <p>Email: {userDetails.email || user.email}</p>
                                </div>
                            )}
                        </div>

                        {/* Other content such as charts and project progress would go here... */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
