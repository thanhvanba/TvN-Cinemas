import axios from 'axios';
import React from 'react'
import toastNotify from "../utils/UseToastForNotify"

function StaffService() {
    const getNowPlayingMovieStaffApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
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
        return await axios.get(
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
            const response = await axios.post(
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
        return await axios.get(
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
            const response = await axios.post(
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
    return {
        getNowPlayingMovieStaffApi, getMovieComingSoonStaffApi, sellTicketApi, searchViewerApi, addViewerApi
    }
}

export default StaffService
