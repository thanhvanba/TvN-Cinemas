import React from 'react'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"
import { useNavigate } from 'react-router-dom'

const UserService = () => {
    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }
    const getUserInfoApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            "http://localhost:8080/api/v1/user/profile",
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },
        );
    };
    const updateUserApi = async (data, userId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.put(
                `http://localhost:8080/api/v1/admin/users/${userId}`,
                data,
                {
                    headers: {
                        "Authorization": bearerToken,
                    }
                },
            );
            if (response.data.success) {
                toastNotify(response.data.message, "success")
            }
        }
        catch (err) {
            toastNotify(err.response.data.message, "error")
        }
    };
    const changePasswordApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.put(
                "http://localhost:8080/api/v1/user/change-password",
                data,
                {
                    headers: {
                        "Authorization": bearerToken,
                    }
                },
            );
            if (response.data.success) {
                toastNotify(response.data.message, "success")
            }
        }
        catch (err) {
            console.log("send fail")
            toastNotify(err.response.data.message, "error")
        }
    };
    const forgotPasswordApi = async (params) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/user/forgot-password",
                null,
                {
                    params: params
                },
            );
            if (response.data.success) {
                toastNotify(response.data.message, "success")
                changeTab("/forgot-password/verify");
            }
        }
        catch (err) {
            toastNotify(err.response.data.message, "error")
        }
    };
    const verifyApi = async (params) => {
        try {
            const response = await axios.put(
                "http://localhost:8080/api/v1/user/valid-otp",
                null,
                {
                    params: params
                },
            );
            if (response.data.success) {
                toastNotify(response.data.message, "success")
                changeTab("/signup");
            }
        }
        catch (err) {
            console.log("verify fail")

            toastNotify(err.response.data.message, "error")
        }
    }
    const resetPasswordApi = async (data, params) => {
        try {
            const response = await axios.put(
                "http://localhost:8080/api/v1/user/change-password",
                data,
                {
                    params: params
                },
            );
            if (response.data.success) {
                toastNotify(response.data.message, "success")
            }
        }
        catch (err) {
            toastNotify(err.response.data.message, "error")
        }
    };
    return {
        getUserInfoApi,
        updateUserApi,
        changePasswordApi,
        forgotPasswordApi,
        verifyApi
    }
}

export default UserService