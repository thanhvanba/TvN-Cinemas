import React from 'react'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"

const CinemaService = () => {
    const getAllCinemaApi = async () => {
        return await axios.get(
            "http://localhost:8080/api/v1/cinemas"
        );
    };
    return {
        getAllCinemaApi
    }
}

export default CinemaService