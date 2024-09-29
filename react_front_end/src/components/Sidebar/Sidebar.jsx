import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext"; // Assuming you have an AuthContext to provide user info

export default function Sidebar() {
  // State to manage the sidebar toggle
  const [isOpen, setIsOpen] = useState(true);

  // Access user data from the authentication context
  const { user } = useAuth();

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ul
        className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${
          isOpen ? "" : "toggled"
        }`}
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">
            SB Admin <sup>2</sup>
          </div>
        </a>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Conditional Dashboard Link - Visible for Managers and Supervisors */}
        {user && (
          <>
            {user.role === "Supervisor" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/supervisor">
                  <i className="fas fa-fw fa-tachometer-alt"></i>
                  <span>supervisor Dashboard</span>
                </Link>
              </li>
            )}
            {user.role === "Managers" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  <i className="fas fa-fw fa-tachometer-alt"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
            )}
          </>
        )}

        {/* Links for Managers or Admins */}
        {user && user.role !== "Supervisor"  && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                <i className="fas fa-fw fa-users"></i>
                <span>Users</span>
              </Link>
            </li>
          </>
        )}
            <li className="nav-item">
              <Link className="nav-link" to="/contacts">
                <i className="fas fa-fw fa-address-book"></i>
                <span>Contacts</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fas fa-fw fa-home"></i>
                <span>Home</span>
              </Link>
            </li>

        {/* Sidebar Toggler */}
        <div className="text-center d-flex d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={toggleSidebar} // Toggle the sidebar on click
          ></button>
        </div>
      </ul>
    </>
  );
}
