import axios from 'axios';
import React from 'react'

function FirebaseService() {
    const saveTokenFirebaseApi = async (token) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.post(
            `${process.env.REACT_APP_HOST_API_KEY}/user/save-token`,
            {
                token: token
            },
            {
                headers: {
                    "Authorization": bearerToken,
                },
            }
        );
    };
    const checkTokenFirebaseApi = async () => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/user/check/token`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
            }
        );
    };
    return {
        saveTokenFirebaseApi,
        checkTokenFirebaseApi
    }
}

export default FirebaseService
