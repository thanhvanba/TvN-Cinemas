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
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', params);
            console.log("ok")

            // Giả sử phản hồi đăng nhập thành công chứa một mã token
            // const token = response.data.token;  
            if (response.data.success){
                console.log("kjsd")
                alert(response.data.message)
                changeTab('/home');
                
            }
            else {
                console.log("kjsd")
                alert("Không thành công")}
            

        } catch (error) {
            // Xử lý lỗi đăng nhập ở đây
            console.error('Lỗi đăng nhập:', error);
        }
    };
    return (
        loginApi
    )
}

export default ApiService
