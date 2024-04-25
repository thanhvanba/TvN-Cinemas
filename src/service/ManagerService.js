import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"
import { useContext } from 'react'
import { RegisterContext } from '../context/RegisterContext'
import { LoginContext } from '../context/LoginContext'

const ManagerService = () => {
    const navigate = useNavigate()
    const { register } = useContext(RegisterContext);
    const { login, logout } = useContext(LoginContext);
    const changeTab = (pathname) => {
        navigate(pathname)
    }
    const changeStatusShowtimeApi = async (showtimeId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.patch(
                `${process.env.REACT_APP_HOST_API_KEY}/manager/showtimes/${showtimeId}`,
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
    const deleteShowtimeApi = async (showtimeId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.delete(
                `${process.env.REACT_APP_HOST_API_KEY}/manager/showtimes/${showtimeId}`,
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
    const changeStatusRoomApi = async (roomId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.patch(
                `${process.env.REACT_APP_HOST_API_KEY}/manager/rooms/${roomId}`,
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
    const deleteRoomApi = async (roomId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.patch(
                `${process.env.REACT_APP_HOST_API_KEY}/manager/rooms/${roomId}`,
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
                `${process.env.REACT_APP_HOST_API_KEY}/manager/rooms`,
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
                `${process.env.REACT_APP_HOST_API_KEY}/manager/showtimes/showtime`,
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
    const getAllShowtimeByManagerApi = async (pageIndex, pageSize, date) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/manager/showtimes`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    index: pageIndex,
                    size: pageSize,
                    date: date
                },
            },
        );
    };
    const getAllRoomByManagerApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/manager/rooms`,
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },
        );
    };
    const getAllTicketByManagerApi = async (pageIndex, pageSize) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/manager/tickets`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    index: pageIndex,
                    size: pageSize,
                },
            },
        );
    };
    const getOneRoomManagerApi = async (roomId) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/manager/rooms/${roomId}`,
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },
        );
    };
    const getTotalRevenueOfManagerApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/manager/total-revenue`,
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },
        );
    };
    const getRevenueYearApi = async (year) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/manager/year/total-revenue`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    year: year,
                },
            },
        );
    };
    const updateShowTimeApi = async (showtimeId, data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.put(
                `${process.env.REACT_APP_HOST_API_KEY}/manager/showtimes/${showtimeId}`,
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
    const stockEntryApi = async (req) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const data = {
                foodId: req.foodId,
                quantity: req.quantity,
                purchasePrice: req.purchasePrice,
                supplier: req.supplier,
                totalPrice: req.purchasePrice * req.quantity
            }
            const response = await axios.post(
                `${process.env.REACT_APP_HOST_API_KEY}/manager/foods/import`,
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
    const getListReviewApi = async (pageIndex, pageSize) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/manager/reviews`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    index: pageIndex,
                    size: pageSize,
                },
            },
        );
    };
    const addScheduleManagerApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post(
                `${process.env.REACT_APP_HOST_API_KEY}/manager/schedule`,
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
    const deleteScheduleManagerApi = async (scheduleId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.delete(
                `${process.env.REACT_APP_HOST_API_KEY}/manager/schedule/${scheduleId}`,
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
    const getAllPersonnelManagerApi = async (pageIndex, pageSize) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/manager/personnel`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    index: pageIndex,
                    size: pageSize,
                },
            }
        );
    };
    const getShowtimeByRoomCinemaApi = async (roomId, pageIndex, pageSize, date) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/manager/rooms/${roomId}/showtimes`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    index: pageIndex,
                    size: pageSize,
                    date: date
                },
            },
        );
    };
    const quantitySeatBookedManagerApi = async (showtimeId, scheduleId) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/manager/seats-booked/count`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    showtimeId: showtimeId,
                    scheduleId: scheduleId
                }
            },
        );
    };
    const updateRoomManagerApi = async (data, roomId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.put(
                `${process.env.REACT_APP_HOST_API_KEY}/manager/rooms/${roomId}`,
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
    const addStaffApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post(
                `${process.env.REACT_APP_HOST_API_KEY}/manager/staff`,
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
        // addManagerApi,
        // addCinemaApi,
        // updateCinemaApi,
        // addFoodApi,
        // updateFoodApi,
        // addPriceSeatApi,
        // deleteMovieApi,
        // updateMovieApi,
        // addMovieApi,
        addRoomApi,
        addShowtimeApi,
        // getAllUserApi,
        getAllShowtimeByManagerApi,
        getAllRoomByManagerApi,
        // deleteUserApi,
        updateShowTimeApi,
        changeStatusShowtimeApi,
        deleteShowtimeApi,
        getOneRoomManagerApi,
        changeStatusRoomApi,
        deleteRoomApi,
        getTotalRevenueOfManagerApi,
        getRevenueYearApi,
        getAllTicketByManagerApi,
        stockEntryApi,
        getListReviewApi,
        addScheduleManagerApi,
        deleteScheduleManagerApi,
        getAllPersonnelManagerApi,
        getShowtimeByRoomCinemaApi,
        quantitySeatBookedManagerApi,
        updateRoomManagerApi,
        addStaffApi
    }
}

export default ManagerService