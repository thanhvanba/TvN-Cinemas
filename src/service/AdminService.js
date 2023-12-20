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
                "http://localhost:8080/api/v1/admin/managers",
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
    const deleteFoodApi = async (foodId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.delete(
                `http://localhost:8080/api/v1/admin/foods/${foodId}`,
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
    const changeStatusUserApi = async (userId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.patch(
                `http://localhost:8080/api/v1/admin/users/${userId}`,
                {},
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
    const deleteUserApi = async (userId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.delete(
                `http://localhost:8080/api/v1/admin/users/${userId}`,
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
    const changeStatusMovieApi = async (movieId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.patch(
                `http://localhost:8080/api/v1/admin/movies/${movieId}`,
                {},
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

    const deleteMovieApi = async (movieId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.delete(
                `http://localhost:8080/api/v1/admin/movies/${movieId}`,
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
    const changeStatusCinemaApi = async (cinemaId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.patch(
                `http://localhost:8080/api/v1/admin/cinemas/${cinemaId}`,
                {},
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

    const deleteCinemaApi = async (cinemaId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.delete(
                `http://localhost:8080/api/v1/admin/cinemas/${cinemaId}`,
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
    const updateMovieApi = async (movieId, data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`;

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key === "poster" && typeof data[key] === "string") {
                        const file = await convertDataURLtoFile(data[key], "poster");
                        data[key] = file;
                    }
                }
            }

            const response = await axios.put(
                `http://localhost:8080/api/v1/admin/movies/${movieId}`,
                data,
                {
                    headers: {
                        "Authorization": bearerToken,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.success) {
                toastNotify(response.data.message, "success");
            }
        } catch (err) {
            toastNotify(err.response.data.message, "error");
        }
    };
    // Hàm chuyển đổi chuỗi dạng data URL thành đối tượng File
    const convertDataURLtoFile = async (dataURL, filename) => {
        const response = await fetch(dataURL);
        const blob = await response.blob();
        return new File([blob], filename);
    };
    const addMovieApi = async (data) => {
        console.log("🚀 ~ file: AdminService.js:211 ~ addMovieApi ~ data:", data)
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                console.log(`Field: ${key}, Type: ${typeof data[key]}`);
            }
        }
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post(
                "http://localhost:8080/api/v1/admin/movies/movie",
                data,
                {
                    headers: {
                        "Authorization": bearerToken,
                        'Content-Type': 'multipart/form-data',
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
    const getAllUserApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            "http://localhost:8080/api/v1/admin/users",
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },
        );
    };
    const getAllShowtimeApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            "http://localhost:8080/api/v1/admin/showtimes",
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },
        );
    };
    const getAllRoomApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            "http://localhost:8080/api/v1/admin/rooms",
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },
        );
    };
    const getOneRoomApi = async (roomId) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `http://localhost:8080/api/v1/admin/rooms/${roomId}`,
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },
        );
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
        getAllUserApi,
        getAllShowtimeApi,
        getAllRoomApi,
        deleteUserApi,
        changeStatusMovieApi,
        changeStatusCinemaApi,
        deleteCinemaApi,
        getOneRoomApi,
        deleteFoodApi,
        changeStatusUserApi
    }
}

export default AdminService