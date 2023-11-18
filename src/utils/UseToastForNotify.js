import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const UseToastNotify = (content, type) => {
    return toast[type](content, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'light'
    });
};
export default UseToastNotify 