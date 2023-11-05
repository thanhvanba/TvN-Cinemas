import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ApiService = () => {
    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }
    const loginApi = async (params) => {
        try {
            console.log(params)
            const response = await axios.post(
                "http://localhost:8080/api/v1/auth/login",
                params
            );
            console.log("ok")

            // Giả sử phản hồi đăng nhập thành công chứa một mã token
            // const token = response.data.token;  
            console.log(response.data)
            if (response.data.success) {
                console.log("kjsd")
                alert(response.data.message)
                changeTab('/home');

            }
            else {
                alert(response.data.message)
                console.log("kjsd")
                alert("Không thành công")
            }


        } catch (error) {
            // alert(error.data.message)
            console.log("kjsd")
            alert(error.response.data.message);
        }
    };
    const registerApi = async (params) => {
        try {
            console.log(params)
            const response = await axios.post(
                "http://localhost:8080/api/v1/auth/register",
                params
            );
            console.log(response.data)
            if (response.data.success) {
                alert(response.data.message)
                changeTab('/signup/verify');
            }
        } catch (error) {
            //alert('Đăng ký không thành công');
            alert(error.response.data.message);
        }
    }
    const verifyApi = async (params) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/auth/verifyOTP",
                params
            );
            if (response.data.success){
                alert(response.data.message)
                changeTab("/signup");
            }
        }
        catch (err){
            alert(err.response.data.message)
        }
    }
    const sendOtpApi = async (params) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/auth/sendOTP",
                params
            );
            if (response.data.success){
                console.log("đã vào")
                alert(response.data.message)
                changeTab("/signup/verify");
            }
        }
        catch (err){
            alert(err.response.data.message)
        }
    }
    return {
        loginApi,
        registerApi,
        verifyApi,
        sendOtpApi
    }
}

export default ApiService
