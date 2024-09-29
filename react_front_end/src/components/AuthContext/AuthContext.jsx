import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };
 
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate('/login')
    };

    return(
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// // Create the context
// const AuthContext = createContext();

// // AuthProvider component
// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     const logout = () => {
//         setUser(null);
//         // Add additional logout logic if needed (e.g., clearing tokens)
//         navigate('/login'); // Redirect to login on logout
//     };

//     const login = (userData) => {
//         setUser(userData);
//         // Additional login logic (e.g., storing tokens, checking user roles)
//         navigate('/dashboard'); // Redirect to dashboard after login
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use the Auth context
// export const useAuth = () => useContext(AuthContext);

// // Exporting AuthProvider
// export default AuthProvider;


