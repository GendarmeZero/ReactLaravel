import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  // State to manage the sidebar toggle
  const [isOpen, setIsOpen] = useState(true);

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

        {/* Nav Items */}
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users">
            <i className="fas fa-fw fa-users"></i>
            <span>Users</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contacts">
            <i className="fas fa-fw fa-users"></i>
            <span>Contacts</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/home">
            <i className="fas fa-fw fa-users"></i>
            <span>home</span>
          </Link>
        </li>

        {/* Sidebar Toggler */}
        <div className="text-center d-flex d-md-inline">
          <button
            className=" rounded-circle border-0"
            id="sidebarToggle"
            onClick={toggleSidebar} // Toggle the sidebar on click
          ></button>
        </div>
      </ul>
    </>
  );
}
