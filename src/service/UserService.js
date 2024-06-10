import React from 'react'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"
import { useNavigate } from 'react-router-dom'
import axiosService from './axiosInstance'

const UserService = () => {
    const axiosInstance = axiosService();
    const getUserInfoApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axiosInstance.get(
            `${process.env.REACT_APP_HOST_API_KEY}/user/profile`,
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },
        );
    };

    const convertDataURLtoFile = async (dataURL, filename) => {
        const response = await fetch(dataURL);
        const blob = await response.blob();
        return new File([blob], filename);
    };
    const updateProfileApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`

            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    if (key === "image" && typeof data[key] === "string") {
                        const file = await convertDataURLtoFile(data[key], "image");
                        data[key] = file;
                    }
                }
            }

            const response = await axiosInstance.put(
                `${process.env.REACT_APP_HOST_API_KEY}/user/update`,
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
    const changePasswordApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axiosInstance.put(
                `${process.env.REACT_APP_HOST_API_KEY}/user/change-password`,
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
    const forgotPasswordApi = async (email) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_HOST_API_KEY}/user/forgot-password`,
                null,
                {
                    params: {
                        email: email
                    }
                },
            );
            if (response.data.success) {
                toastNotify(response.data.message, "success")
                navigate("/forgot-password/verify", { state: { email: email } });
            }
        }
        catch (err) {
            toastNotify(err.response.data.message, "error")
        }
    };
    const verifyApi = async (token) => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_HOST_API_KEY}/user/valid-otp`,
                null,
                {
                    params: {
                        token: token
                    }
                },
            );
            if (response.data.success) {
                toastNotify(response.data.message, "success")
                navigate("/reset-password", { state: { token: token } });
            }
        }
        catch (err) {
            console.log("verify fail")

            toastNotify(err.response.data.message, "error")
        }
    }
    const resetPasswordApi = async (token, data) => {
        const navigate = useNavigate()
        const changeTab = (pathname) => {
            navigate(pathname)
        }
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_HOST_API_KEY}/user/reset-password`,
                data,
                {
                    params: {
                        token: token,
                    },
                }
            );

            if (response.data.success) {
                toastNotify(response.data.message, "success");
                changeTab("/signup")
            }
        } catch (err) {
            toastNotify(err.response.data.message, "error");
        }
    };
    const getAllShowtimeApi = async () => {
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/showtimes`
        );
    };
    const getOneShowtimeApi = async (showtimeId) => {
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/showtimes/${showtimeId}`
        );
    };
    const getOneMovieApi = async (movieId) => {
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/movies/${movieId}`
        );
    };
    const getOneCinemaApi = async (cinemaId) => {
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/cinemas/${cinemaId}`
        );
    };
    const getOneFoodApi = async (foodId) => {
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/foods/${foodId}`
        );
    };
    const getShowtimeByMovieApi = async (movieId) => {
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/movies/${movieId}/show-times`
        );
    };
    const getShowtimeByCinemaApi = async (cinemaId) => {
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/cinemas/${cinemaId}/showtimes`
        );
    };
    const getFoodApi = async (type, index, size, cinemaId) => {
        const params = { type: type, index: index, size: size, cinemaId: cinemaId }
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/foods`,
            {
                params: params
            },
        );
    }
    const getSeatBookedApi = async (params) => {
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/viewer/seats/booked`,
            {
                params: params
            }

        );
    }
    const selectSeatApi = async (data, showtimeId) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.post(
            `${process.env.REACT_APP_HOST_API_KEY}/viewer/selectSeat/${showtimeId}`,
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
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axiosInstance.post(
                `${process.env.REACT_APP_HOST_API_KEY}/viewer/book`,
                {
                    seatIds: seats,
                    foodIds: foods
                },
                {
                    headers: {
                        "Authorization": bearerToken,
                    }
                },

            )
            if (response.data.success) {
                toastNotify(response.data.message, "success")
                return response
            }
        }
        catch (err) {
            toastNotify(err.response.data.message, "error")
        }
    }
    const bookingInfoApi = async (seats, foods, code) => {
        console.log("🚀 ~ bookingInfoApi ~ code:", code)
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axiosInstance.post(
            `${process.env.REACT_APP_HOST_API_KEY}/viewer/book-info`,
            {
                code: code,
                seatIds: seats,
                foodIds: foods
            },
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },
        );
    }
    const getSeatPriceApi = async (type) => {
        const params = { type: type }
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/viewer/seat/price`,
            {
                params: params
            },
        );
    }
    const getFoodByIdApi = async (foodId) => {
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/foods/${foodId}`
        );
    }
    const getBookingUpcomingApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axiosInstance.get(
            `${process.env.REACT_APP_HOST_API_KEY}/viewer/movies/upcoming`,
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },
        );
    }
    const getBookingViewedApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axiosInstance.get(
            `${process.env.REACT_APP_HOST_API_KEY}/viewer/movies/viewed`,
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },

        )
    }
    const getTicketDetailApi = async (bookingId) => {
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/viewer/ticket/detail/${bookingId}`
        );
    };
    const searchMovieApi = async (keyWord) => {
        const params = { keyWord: keyWord }
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/movies/search`,
            {
                params: params
            },
        );
    }
    const reviewMovieApi = async (comment, rating, movieId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axiosInstance.post(
                `${process.env.REACT_APP_HOST_API_KEY}/viewer/movies/${movieId}/review`,
                {
                    comment: comment,
                    rating: rating
                },
                {
                    headers: {
                        "Authorization": bearerToken,
                    }
                },
            );

            if (response.data.success) {
                toastNotify(response.data.message, "success");
            }
        } catch (err) {
            toastNotify(err.response.data.message, "error");
        }
    }
    const cancelTicketApi = async (ticketId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axiosInstance.put(
                `${process.env.REACT_APP_HOST_API_KEY}/viewer/ticket/cancel/${ticketId}`,
                null,
                {
                    headers: {
                        "Authorization": bearerToken,
                    }
                },
            );
            if (response.data.success) {
                toastNotify(response.data.message, "success");
            }
        } catch (err) {
            toastNotify(err.response.data.message, "error");
        }
    }
    return {
        getUserInfoApi,
        updateProfileApi,
        changePasswordApi,
        forgotPasswordApi,
        resetPasswordApi,
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
        getOneFoodApi,
        getBookingUpcomingApi,
        getBookingViewedApi,
        getTicketDetailApi,
        getShowtimeByCinemaApi,
        searchMovieApi,
        reviewMovieApi,
        cancelTicketApi
    }
}

export default UserService