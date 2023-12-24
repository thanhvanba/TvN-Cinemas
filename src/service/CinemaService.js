import React from 'react'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"

const CinemaService = () => {
    const getAllCinemaApi = async () => {
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/cinemas`
        );
    };
    const getOneCinemaApi = async (cinemaId) => {
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/cinemas/${cinemaId}`
        );
    };
    return {
        getAllCinemaApi,
        getOneCinemaApi
    }
}

export default CinemaService