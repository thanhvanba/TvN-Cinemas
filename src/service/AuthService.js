import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"
import { useContext } from 'react'
import { RegisterContext } from '../context/RegisterContext'
import { LoginContext } from '../context/LoginContext'
import { jwtDecode } from 'jwt-decode'

const AuthService = () => {
    const navigate = useNavigate()
    const { register } = useContext(RegisterContext);
    const { login, logout } = useContext(LoginContext);
    const changeTab = (pathname) => {
        navigate(pathname)
    }
    const loginApi = async (data) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_HOST_API_KEY}/auth/login`,
                data
            );
            const token = response.data.result.accessToken;
            const decode = jwtDecode(token);
            const refreshToken = response.data.result.refreshToken;
            if (response.data.success) {
                toastNotify(response.data.message, "success")
                login(data.credentialId, token, refreshToken, decode.role)
                changeTab('/');
            }
        } catch (error) {
            // alert(error.data.message)
            toastNotify(error.response.data.message, "error")
        }
    };
    const registerApi = async (data) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_HOST_API_KEY}/auth/register`,
                data
            );
            if (response.data.success) {
                toastNotify(response.data.message, "success")
                register(data.email, data.fullName, data.phone)
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
                `${process.env.REACT_APP_HOST_API_KEY}/auth/verifyOTP`,
                { email: data.email, otp: data.otpValue },
            );
            if (response.data.success) {
                toastNotify(response.data.message, "success")
                localStorage.removeItem("email")
                localStorage.removeItem("fullname")
                localStorage.removeItem("phone")
                changeTab("/signup");
            }
        }
        catch (err) {
            console.log("verify fail")

            toastNotify(err.response.data.message, "error")
        }
    }
    const sendOtpApi = async (data) => {
        try {

            console.log("🚀 ~ file: ApiService.js:82 ~ sendOtpApi ~ data:", data)
            const response = await axios.post(
                `${process.env.REACT_APP_HOST_API_KEY}/auth/sendOTP`,
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
                `${process.env.REACT_APP_HOST_API_KEY}/auth/logout-all`,
                null,
                {
                    headers: {
                        "Authorization": bearerToken,
                    },
                    params: params
                },
            );
            if (response.data.success) {
                toastNotify(response.data.message, "success")

                logout()
                changeTab("/");
            }
        }
        catch (err) {
            toastNotify(err.response.data.message, "error")
        }
    }
    const refreshTokenApi = async (accessToken, refreshToken) => {
        console.log('aaaaa')
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_HOST_API_KEY}/auth/refresh-access-token`,
                {
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
            );

        } catch (error) {
            // alert(error.data.message)
            // toastNotify(error.response.data.message, "error")
        }
    };
    return {
        loginApi,
        registerApi,
        verifyApi,
        sendOtpApi,
        logoutApi,
        refreshTokenApi
    }
}

export default AuthService
