import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const CinemaService = (page) => {
    const { register, login, logout } = useContext(UserContext);
    const GetAllCinemaApi = async () => {
        let params = { index: page, size: 8 }
        return await axios.get(
            "http://localhost:8080/api/v1/cinemas",
            {
                params: params
            }
        );
    };
    return {
        GetAllCinemaApi
    }
}

export default CinemaService