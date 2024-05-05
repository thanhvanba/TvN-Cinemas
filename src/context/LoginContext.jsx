import React from "react";
import { createContext, useState } from "react";
import UserService from "../service/UserService";

// @function  UserContext
const LoginContext = createContext({ credentialId: '', auth: false, role: '' });

// @function  UserProvider
// Create function to provide UserContext
const LoginProvider = ({ children }) => {
    const [user, setUser] = useState({ credentialId: '', auth: false, role: '' });
    const { getUserInfoApi } = UserService()
    const login = async (credentialId, token, refreshToken, role, userId) => {
        localStorage.setItem("token", token)
        localStorage.setItem("refreshToken", refreshToken)
        localStorage.setItem("username", credentialId)
        let resInfo = await getUserInfoApi()
        setUser(() => ({
            credentialId: credentialId && credentialId,
            auth: true,
            role: role && role,
            userId: userId && userId,
            fullName: resInfo.data.result.fullName
        }));
    };

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("username")
        localStorage.getItem("cinemaId") && localStorage.removeItem("cinemaId")
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