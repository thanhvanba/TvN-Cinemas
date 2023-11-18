import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const ApiService = () => {
    const navigate = useNavigate()
    const { login, logout } = useContext(UserContext);
    const changeTab = (pathname) => {
        navigate(pathname)
    }
    const loginApi = async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/auth/login",
                data
            );
            const token = response.data.result.accessToken;
            const refreshToken = response.data.result.refreshToken;
            console.log(response.data)
            if (response.data.success) {
                toastNotify(response.data.message, "success")
                login(data.credentialId, token, refreshToken)
                changeTab('/home');
            }
        } catch (error) {
            // alert(error.data.message)
            toastNotify(error.response.data.message, "error")
        }
    };
    const registerApi = async (data) => {
        try {
            console.log(data)
            const response = await axios.post(
                "http://localhost:8080/api/v1/auth/register",
                data
            );
            console.log(response.data)
            if (response.data.success) {
                toastNotify(response.data.message, "success")
                changeTab('/signup/verify');
            }
        } catch (error) {
            //alert('Đăng ký không thành công');
            toastNotify(error.response.data.message, "error")
        }
    }
    const verifyApi = async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/auth/verifyOTP",
                { email: data.email, otp: data.otpValue },
            );
            if (response.data.success) {
                console.log("verify pass")
                toastNotify(response.data.message, "success")
                changeTab("/signup");
            }
        }
        catch (err) {
            console.log("🚀 ~ file: ApiService.js:71 ~ verifyApi ~ err:", err)
            console.log("verify fail")

            toastNotify(err.response.data.message, "error")
        }
    }
    const sendOtpApi = async (data) => {
        try {

            console.log("🚀 ~ file: ApiService.js:82 ~ sendOtpApi ~ data:", data)
            const response = await axios.post(
                "http://localhost:8080/api/v1/auth/sendOTP",
                data
            );
            console.log("🚀 ~ file: ApiService.js:82 ~ sendOtpApi ~ data:", data)
            if (response.data.success) {
                console.log("send pass")
                toastNotify(response.data.message, "success")
                changeTab("/signup/verify");
            }
        }
        catch (err) {
            console.log("send fail")
            toastNotify(err.response.data.message, "error")
        }
    }
    const logoutApi = async () => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            let params = { refreshToken: localStorage.getItem("refreshToken") }
            const response = await axios.post(
                "http://localhost:8080/api/v1/auth/logout",
                null,
                {
                    headers: {
                        "Authorization": bearerToken,
                    },
                    params: params
                },
            );
            if (response.data.success) {
                console.log("🚀 ~ file: ApiService.js:104 ~ logoutApi ~ response.data:", response.data)
                toastNotify(response.data.message, "success")
                console.log("🚀 ~ file: ApiService.js:105 ~ logoutApi ~ response.data.message:", response.data.message)

                logout()
                changeTab("/home");
            }
        }
        catch (err) {
            toastNotify(err.response.data.message, "error")
            console.log("🚀 ~ file: ApiService.js:112 ~ logoutApi ~ err.response.data.message:", err.response.data.message)
        }
    }
    return {
        loginApi,
        registerApi,
        verifyApi,
        sendOtpApi,
        logoutApi
    }
}

export default ApiService
