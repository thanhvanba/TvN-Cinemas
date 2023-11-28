import React from 'react'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"

const CinemaService = (page) => {
    const getAllCinemaApi = async () => {
        let params = { index: page, size: 8 }
        return await axios.get(
            "http://localhost:8080/api/v1/cinemas",
            {
                params: params
            }
        );
    };
    return {
        getAllCinemaApi
    }
}

export default CinemaService