import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext/AuthContext';

const NavbarHome = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="navbar-brand">AuthAPP</div>

            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    {/* Display Dashboard link if user is admin */}
                    {user && user.role === 'admin' && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                    )}
                </ul>
            </div>

            {/* Search Feature */}
            <form className="form-inline my-2 my-lg-0">
                <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
            </form>

            {/* User Dropdown */}
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-person-circle"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><Link className="dropdown-item" to="/changepassword">Change Password</Link></li>
                    <li><Link className="dropdown-item" to="/login" onClick={handleLogout}>Logout</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavbarHome;
