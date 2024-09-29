import React from 'react';
import { Link } from 'react-router-dom';
 
function NotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="error mx-auto" data-text="404">
          <h1 className="font-weight-bold display-1 animated">404</h1>
        </div>
        <p className="lead text-gray-800 mb-4">Page Not Found</p>
        <p className="text-gray-500 mb-4">
          It looks like you found a glitch in the matrix...
        </p>
        <Link to="/home" className="btn btn-primary">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
