import React from 'react';
import { Link } from 'react-router-dom';
import './Unauthorized.css'; // Assuming your styles are in Unauthorized.css

function Unauthorized() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <div className="unauthorized mx-auto" data-text="403">
          <h1 className="font-weight-bold display-1 animated">403</h1>
        </div>
        <p className="lead text-danger mb-4">Access Denied</p>
        <p className="text-gray-500 mb-4">
          Oops! It seems you do not have permission to view this page.
        </p>
        {/* Uncomment and replace the path below with your unauthorized illustration image */}
        {/* <img src="path/to/unauthorized-illustration.png" alt="Unauthorized Access" className="img-fluid mb-4" /> */}
        <Link to="/home" className="btn btn-primary btn-lg">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
