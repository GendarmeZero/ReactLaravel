import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext/AuthContext';

const Navbar = () => {
    const { logout, user } = useAuth(); // Access logout and user from context
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call the logout function
        navigate('/login'); // Navigate to login after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white topbar mb-4 static-top shadow">
            <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
            >
                <i className="fa fa-bars" />
            </button>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        {/* Uncomment and modify the link as needed */}
                        {/* <Link className="nav-link" to="/home">Home</Link> */}
                    </li>
                </ul>
            </div>

            {/* User Dropdown */}
            <div className="dropdown">
                <button
                    className="btn btn-white dropdown-toggle"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <span className="mr-2 d-none d-lg-inline text-black-600 small">
                        {user ? user.name : "User"} {/* Display username */}
                    </span>
                    <img
                    style={{ width: "40px", height: "40px" }}
                        className="img-profile rounded-circle"
                        src="img/undraw_profile.svg"
                        alt="Profile"
                    />
                </button>
                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <li>
                        <Link className="dropdown-item" to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to="/changepassword">Change Password</Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to="/login" onClick={handleLogout}>Logout</Link>
                    </li>
                </ul>
            </div>


        </nav>
    );
};

export default Navbar;
