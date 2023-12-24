import React from 'react'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"

const VnPayService = () => {
    const createPaymentApi = async (bookingId) => {
        const params = { bookingId: bookingId }
        return await axios.get(
            `${process.env.REACT_APP_HOST_API_KEY}/vnpay/payment`,
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