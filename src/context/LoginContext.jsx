import React from "react";
import { createContext, useState } from "react";

// @function  UserContext
const LoginContext = createContext({ credentialId: '', auth: false, role: '' });

// @function  UserProvider
// Create function to provide UserContext
const LoginProvider = ({ children }) => {
    const [user, setUser] = useState({ credentialId: '', auth: false, role: '' });

    const login = (credentialId, token, refreshToken, role) => {
        setUser(() => ({
            credentialId: credentialId,
            auth: true,
            role: role
        }));

        localStorage.setItem("token", token)
        localStorage.setItem("refreshToken", refreshToken)
        localStorage.setItem("username", credentialId)
    };

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("username")
        setUser(() => ({
            credentialId: '',
            auth: false,
            role: ''
        }));
    };

    return (
        <LoginContext.Provider value={{ user, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

export { LoginContext, LoginProvider };