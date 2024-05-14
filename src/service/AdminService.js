import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"
import { useContext } from 'react'
import { RegisterContext } from '../context/RegisterContext'
import { LoginContext } from '../context/LoginContext'

const AdminService = () => {
    const navigate = useNavigate()
    const changeTab = (pathname) => {
        navigate(pathname)
    }

    const addManagerApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/managers`,
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
                `${process.env.REACT_APP_HOST_API_KEY}/admin/cinemas/cinema`,
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
    const updateCinemaApi = async (data, cinemaId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.put(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/cinemas/${cinemaId}`,
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
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                console.log(`Field: ${key}, Type: ${typeof data[key]}`);
            }
        }
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/foods/food`,
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
    const updateFoodApi = async (data, foodId) => {
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
            const response = await axios.put(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/foods/${foodId}`,
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
    const deleteFoodApi = async (foodId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.patch(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/foods/${foodId}`,
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
    const updatePriceSeatApi = async (data, priceId) => {
        console.log("🚀 ~ addPriceSeatApi ~ data:", data)
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.put(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/prices/price/${priceId}`,
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
                `${process.env.REACT_APP_HOST_API_KEY}/admin/users/${userId}`,
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
                `${process.env.REACT_APP_HOST_API_KEY}/admin/users/${userId}`,
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
    const updateUserApi = async (userId, data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`;

            const response = await axios.put(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/users/${userId}`,
                data,
                {
                    headers: {
                        "Authorization": bearerToken,
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
    const changeStatusMovieApi = async (movieId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.patch(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/movies/${movieId}`,
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
                `${process.env.REACT_APP_HOST_API_KEY}/admin/movies/${movieId}`,
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
                `${process.env.REACT_APP_HOST_API_KEY}/admin/cinemas/${cinemaId}`,
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
                `${process.env.REACT_APP_HOST_API_KEY}/admin/cinemas/${cinemaId}`,
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
                `${process.env.REACT_APP_HOST_API_KEY}/admin/movies/${movieId}`,
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
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                console.log(`Field: ${key}, Type: ${typeof data[key]}`);
            }
        }
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/movies/movie`,
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
    const getAllMovieApi = async (pageIndex, pageSize) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/movies`,
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
    const getAllUserApi = async (pageIndex, pageSize) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/users`,
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

    const getAllPersonnelApi = async (pageIndex, pageSize) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/personnel`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    index: pageIndex,
                    size: pageSize,
                    // sortByRole: sortByRole
                },
            }
        );
    };


    const getAllViewerApi = async (pageIndex, pageSize) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/viewers`,
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

    const getAllShowtimeApi = async (pageIndex, pageSize) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/showtimes`,
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
    const getAllRoomApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/rooms`,
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },
        );
    };
    const getFoodAdminApi = async (type, pageIndex, pageSize, status) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/foods`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    type: type,
                    index: pageIndex,
                    size: pageSize,
                    status: status
                },
            },
        );
    };
    const getAllTicketApi = async (pageIndex, pageSize) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/tickets`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    type: type,
                    index: pageIndex,
                    size: pageSize,
                },
            },
        );
    };

    const getAllBookingtApi = async (pageIndex, pageSize, status, cinemaId) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/staff/bookings`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    index: pageIndex,
                    size: pageSize,
                    status: status,
                    cinemaId: cinemaId
                },
            },
        );
    };

    const getOneRoomApi = async (roomId) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/rooms/${roomId}`,
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },
        );
    };
    const getOneUserApi = async (userId) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/users/${userId}`,
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },
        );
    };
    const getTotalRevenueApi = async (params) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/total-revenue`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: params,
            },
        );
    };
    const totalRevenueOfYearApi = async (year) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/year/total-revenue`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    year: year,
                },
            }
        );
    };
    const totalRevenueOfCinema = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/cinemas/total-revenue`,
            {
                headers: {
                    "Authorization": bearerToken,
                }
            }
        );
    }
    const totalTicketByCinemaApi = async (year) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/year/total-ticket`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    year: year,
                },
            }
        );
    };
    const getCinemasUnmanagedApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/cinemas/unmanaged`,
            {
                headers: {
                    "Authorization": bearerToken,
                }
            },
        );
    };
    const getAllCinemaApi = async (pageIndex, pageSize, status) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/cinemas`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    index: pageIndex,
                    size: pageSize,
                    status: status
                },
            },
        );
    };
    const getShowtimeByCinemaApi = async (cinemaId, pageIndex, pageSize, date) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/cinemas/${cinemaId}/showtimes`,
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
    const getShowtimeByRoomApi = async (roomId, pageIndex, pageSize, date) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/rooms/${roomId}/showtimes`,
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
    const getRoomeByCinemaApi = async (cinemaId, pageIndex, pageSize, isDelete) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/cinemas/${cinemaId}/rooms`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    index: pageIndex,
                    size: pageSize,
                    isDelete: isDelete
                },
            },
        );
    };
    const deleteRoomAdminApi = async (roomId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.patch(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/rooms/${roomId}`,
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
    const addRoomAdminApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/rooms/room`,
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
    const updateRoomAdminApi = async (data, roomId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.put(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/rooms/${roomId}`,
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
    const quantitySeatBookedApi = async (showtimeId, scheduleId) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/seats-booked/count`,
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
    const addScheduleAdminApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.post(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/schedule`,
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
    const deleteScheduleAdminApi = async (scheduleId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.delete(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/schedule/${scheduleId}`,
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
    const confirmTicketApi = async (bookingId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axios.put(
                `${process.env.REACT_APP_HOST_API_KEY}/staff/bookings/${bookingId}/confirm`,
                null,
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
    const getStatisticsOverviewApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/stats/overview`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
            },
        );
    };
    const getTopUsersApi = async (params) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/top-users`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: params
            },
        );
    };
    const getTopMovieRatingApi = async (params) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/top-rated-movies`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: params
            },
        );
    };
    const getFinanceAllCinemaApi = async (year) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/finance`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: { year: year }
            },
        );
    };
    const getAllPromotionApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/promotions`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
            },
        );
    };
    const getDetailFinanceApi = async (params) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/finance/detail`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: params
            },
        );
    };
    return {
        addManagerApi,
        addCinemaApi,
        updateCinemaApi,
        addFoodApi,
        updateFoodApi,
        updatePriceSeatApi,
        deleteMovieApi,
        updateMovieApi,
        addMovieApi,
        getAllUserApi,
        getOneUserApi,
        getAllShowtimeApi,
        getAllRoomApi,
        deleteUserApi,
        changeStatusMovieApi,
        changeStatusCinemaApi,
        deleteCinemaApi,
        getOneRoomApi,
        deleteFoodApi,
        changeStatusUserApi,
        getTotalRevenueApi,
        totalRevenueOfYearApi,
        totalRevenueOfCinema,
        totalTicketByCinemaApi,
        getCinemasUnmanagedApi,
        getAllTicketApi,
        getAllBookingtApi,
        getAllCinemaApi,
        getAllMovieApi,
        getShowtimeByCinemaApi,
        getShowtimeByRoomApi,
        getRoomeByCinemaApi,
        addRoomAdminApi,
        deleteRoomAdminApi,
        quantitySeatBookedApi,
        addScheduleAdminApi,
        deleteScheduleAdminApi,
        getAllPersonnelApi,
        getAllViewerApi,
        updateUserApi,
        updateRoomAdminApi,
        confirmTicketApi,
        getFoodAdminApi,
        getStatisticsOverviewApi,
        getTopUsersApi,
        getTopMovieRatingApi,
        getFinanceAllCinemaApi,
        getAllPromotionApi,
        getDetailFinanceApi
    }
}

export default AdminService