import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"
import { useContext } from 'react'
import { RegisterContext } from '../context/RegisterContext'
import { LoginContext } from '../context/LoginContext'
import { jwtDecode } from 'jwt-decode'

const AxiosService = () => {

    const refreshTokenApi = async (accessToken, refreshToken) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_HOST_API_KEY}/auth/refresh-access-token`,
                {
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
            );
            return (response)
        } catch (error) {
            // alert(error.data.message)
            // toastNotify(error.response.data.message, "error")
        }
    };
    return {
        refreshTokenApi
    }
}

export default AxiosService
