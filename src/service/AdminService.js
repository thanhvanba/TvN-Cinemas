import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"
import { useContext } from 'react'
import { RegisterContext } from '../context/RegisterContext'
import { LoginContext } from '../context/LoginContext'

const AdminService = () => {
    const navigate = useNavigate()
    const { register } = useContext(RegisterContext);
    const { login, logout } = useContext(LoginContext);
    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const addManagerApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post(
                "http://localhost:8080/api/v1/admin/manager",
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

    const addCinemaApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post(
                "http://localhost:8080/api/v1/admin/cinemas/cinema",
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

    const updateCinemaApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.put(
                `http://localhost:8080/api/v1/admin/cinemas/${cinemaId}`,
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

    const addFoodApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post(
                "http://localhost:8080/api/v1/admin/foods/food",
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

    const updateFoodApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.put(
                `http://localhost:8080/api/v1/admin/foods/${foodId}`,
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

    const addPriceSeatApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post(
                "http://localhost:8080/api/v1/admin/prices/price",
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

    const deleteMovieApi = async () => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.delete(
                `http://localhost:8080/api/v1/manager/movies/${movieId}`,
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

    const updateMovieApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.put(
                `http://localhost:8080/api/v1/manager/movies/${movieId}`,
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

    const addMovieApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post(
                "http://localhost:8080/api/v1/admin/movies/movie",
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
    const addRoomApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post(
                "http://localhost:8080/api/v1/manager/rooms",
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
    const addShowtimeApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post(
                "http://localhost:8080/api/v1/manager/showtimes/showtime",
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
    return {
        addManagerApi,
        addCinemaApi,
        updateCinemaApi,
        addFoodApi,
        updateFoodApi,
        addPriceSeatApi,
        deleteMovieApi,
        updateMovieApi,
        addMovieApi,
        addRoomApi,
        addShowtimeApi
    }
}

export default AdminService