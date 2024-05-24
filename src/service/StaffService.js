import axios from 'axios';
import React from 'react'
import toastNotify from "../utils/UseToastForNotify"
import axiosService from './axiosInstance';

function StaffService() {
    const axiosInstance = axiosService()
    const getNowPlayingMovieStaffApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axiosInstance.get(
            `${process.env.REACT_APP_HOST_API_KEY}/staff/movie/now-playing`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
            }
        );
    };

    const getMovieComingSoonStaffApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axiosInstance.get(
            `${process.env.REACT_APP_HOST_API_KEY}/staff/movie/other`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
            }
        );
    };
    const sellTicketApi = async (userId, seats, foods) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axiosInstance.post(
                `${process.env.REACT_APP_HOST_API_KEY}/staff/sell-ticket`,
                {
                    userId: userId,
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
    const searchViewerApi = async (keyWord) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        const params = { keyWord: keyWord }
        return await axiosInstance.get(
            `${process.env.REACT_APP_HOST_API_KEY}/staff/search/viewer`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: params
            },
        );
    }
    const addViewerApi = async (data) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axiosInstance.post(
                `${process.env.REACT_APP_HOST_API_KEY}/staff/viewer`,
                data,
                {
                    headers: {
                        "Authorization": bearerToken,
                    }
                },
            );
            if (response.data.success) {
                toastNotify(response.data.message, "success")
                return response
            }
        }
        catch (err) {
            toastNotify(err.response.data.message, "error")
        }
    };

    const getAllBookingStaffApi = async (pageIndex, pageSize, status, cinemaId) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axiosInstance.get(
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
    return {
        getNowPlayingMovieStaffApi, getMovieComingSoonStaffApi, sellTicketApi, searchViewerApi, addViewerApi, getAllBookingStaffApi
    }
}

export default StaffService
