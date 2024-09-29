import React from "react";
import Navbar from "../Navhome/NavHome";
import { useAuth } from "../AuthContext/AuthContext";

const Home = () => {
    const { user } = useAuth();

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                {user ? (
                    <h1>Welcome, {user.name}!</h1>
                ) : (
                    <h1>Welcome to the Home Page!</h1>
                )}
            </div>
        </>
    );
}

export default Home;
