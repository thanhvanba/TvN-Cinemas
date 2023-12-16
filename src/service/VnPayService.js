import React from 'react'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"

const VnPayService = () => {
    const createPaymentApi = async (bookingId) => {
        const params = { bookingId: bookingId }
        return await axios.get(
            "http://localhost:8080/api/v1/vnpay/payment",
            {
                params: params
            }
        );
    };
    return {
        createPaymentApi
    }
}

export default VnPayService