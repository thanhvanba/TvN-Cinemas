import React from 'react'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"
import { useNavigate } from 'react-router-dom'
import { AxiosService } from './AxiosService'

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
    const updateProfileApi = async (data) => {
        console.log("🚀 ~ file: UserService.js:24 ~ updateProfileApi ~ data:", data)
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.put(
                `http://localhost:8080/api/v1/user/update`,
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
            console.log("🚀 ~ file: UserService.js:42 ~ updateProfileApi ~ err.response.data:", err.response.data)
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
    const getAllShowtimeApi = async () => {
        return await axios.get(
            "http://localhost:8080/api/v1/showtimes"
        );
    };
    const getOneShowtimeApi = async (showtimeId) => {
        return await axios.get(
            `http://localhost:8080/api/v1/showtimes/${showtimeId}`
        );
    };
    const getOneMovieApi = async (movieId) => {
        return await axios.get(
            `http://localhost:8080/api/v1/movies/${movieId}`
        );
    };
    const getOneCinemaApi = async (cinemaId) => {
        return await axios.get(
            `http://localhost:8080/api/v1/cinemas/${cinemaId}`
        );
    };
    const getOneFoodApi = async (foodId) => {
        return await axios.get(
            `http://localhost:8080/api/v1/foods/${foodId}`
        );
    };
    const getShowtimeByMovieApi = async (movieId) => {
        return await axios.get(
            `http://localhost:8080/api/v1/movies/${movieId}/show-times`
        );
    };
    const getFoodApi = async (type) => {
        const params = { type: type }
        return await axios.get(
            "http://localhost:8080/api/v1/foods",
            {
                params: params
            },
        );
    }
    const getSeatBookedApi = async (data) => {
        return await axios.post(
            `http://localhost:8080/api/v1/viewer/seats/booked`,
            data,
            {

                // headers: {
                //     "Authorization": bearerToken,
                // },
            }

        );
    }
    const selectSeatApi = async (data, showtimeId) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.post(
            `http://localhost:8080/api/v1/viewer/selectSeat/${showtimeId}`,
            data,
            // {
            //     headers: {
            //         "Authorization": bearerToken,
            //     }
            // },

        );
    }
    const bookingTicketApi = async (seats, foods) => {
        try {
            // let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await AxiosService.post('/viewer/book', {
                seatIds: seats,
                foodIds: foods
            })
            console.log(response)
            // const response = await axios.post(
            //     `http://localhost:8080/api/v1/viewer/book`,
            //     {
            //         seatIds: seats,
            //         foodIds: foods
            //     },
            //     {
            //         headers: {
            //             "Authorization": bearerToken,
            //         }
            //     },

            // )
            // if (response.data.success) {
            //     toastNotify(response.data.message, "success")
            //     return response
            // }
        }
        catch (err) {
            toastNotify(err.response.data.message, "error")
        }
    }
    const bookingInfoApi = async (seats, foods) => {
        return await axios.post(
            `http://localhost:8080/api/v1/viewer/book-info`,
            {
                seatIds: seats,
                foodIds: foods
            },
        );
    }
    const getSeatPriceApi = async (type) => {
        const params = { type: type }
        return await axios.get(
            "http://localhost:8080/api/v1/viewer/seat/price",
            {
                params: params
            },
        );
    }
    const getFoodByIdApi = async (foodId) => {
        return await axios.get(
            `http://localhost:8080/api/v1/foods/${foodId}`
        );
    }
    return {
        getUserInfoApi,
        updateProfileApi,
        changePasswordApi,
        forgotPasswordApi,
        verifyApi,
        getAllShowtimeApi,
        getOneShowtimeApi,
        getShowtimeByMovieApi,
        getFoodApi,
        getSeatBookedApi,
        selectSeatApi,
        bookingTicketApi,
        bookingInfoApi,
        getSeatPriceApi,
        getFoodByIdApi,
        getOneMovieApi,
        getOneCinemaApi,
        getOneFoodApi
    }
}

export default UserService