import React from 'react'
import axios from 'axios'
import toastNotify from "../utils/UseToastForNotify"
import axiosService from './axiosInstance';

const PromotionService = () => {
    const axiosInstance = axiosService();
    const getAllPromotionApi = async (pageIndex, pageSize, isFixed, code) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axiosInstance.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/promotions`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
                params: {
                    index: pageIndex,
                    size: pageSize,
                    isFixed: isFixed,
                    code: code
                },
            },
        );
    };
    const getOnePromotionApi = async (promotionId) => {
        let bearerToken = `Bearer ${localStorage.getItem("token")}`
        return await axiosInstance.get(
            `${process.env.REACT_APP_HOST_API_KEY}/admin/promotions/${promotionId}`,
            {
                headers: {
                    "Authorization": bearerToken,
                },
            },
        );
    };
    // Hàm chuyển đổi chuỗi dạng data URL thành đối tượng File
    const convertDataURLtoFile = async (dataURL, filename) => {
        const response = await fetch(dataURL);
        const blob = await response.blob();
        return new File([blob], filename);
    };
    const addPromotionsFixed = async (data) => {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                console.log(`Field: ${key}, Type: ${typeof data[key]}`);
            }
        }
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axiosInstance.post(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/promotionsFixed`,
                {
                    name: data.name,
                    description: data.description,
                    coupleValue: data.coupleValue,
                    vipValue: data.vipValue,
                    normalValue: data.normalValue,
                    validDayOfWeek: data.validDayOfWeek,
                    ageLimit: data.ageLimit,
                    validTimeFrameStart: data.validTimeFrameStart,
                    validTimeFrameEnd: data.validTimeFrameEnd,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    image: data.image
                },
                {
                    headers: {
                        "Authorization": bearerToken,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            if (response.data.success) {
                toastNotify(response.data.message, "success")
            }
        }
        catch (err) {
            toastNotify(err?.response?.data?.message, "error")
        }
    };
    const addPromotionsCode = async (data) => {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                console.log(`Field: ${key}, Type: ${typeof data[key]}`);
            }
        }
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axiosInstance.post(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/promotionsCode`,
                {
                    promotionCode: data.promotionCode,
                    maxUsage: data.maxUsage,
                    useForUserPerDay: data.useForUserPerDay,
                    name: data.name,
                    description: data.description,
                    discountType: data.discountType,
                    discountValue: data.discountValue,
                    maxDiscountAmount: data.maxDiscountAmount,
                    minOrderValue: data.minOrderValue,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    image: data.image
                },
                {
                    headers: {
                        "Authorization": bearerToken,
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            if (response.data.success) {
                toastNotify(response.data.message, "success")
            }
        }
        catch (err) {
            toastNotify(err?.response?.data?.message, "error")
        }
    };
    const updatePromotionsFixed = async (data, promotionId) => {
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
            const response = await axiosInstance.put(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/promotionsFixed/${promotionId}`,
                data,
                {
                    headers: {
                        "Authorization": bearerToken,
                        'Content-Type': 'multipart/form-data',
                    },
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
    const updatePromotionsCode = async (data, promotionId) => {
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
            const response = await axiosInstance.put(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/promotionsCode/${promotionId}`,
                data,
                {
                    headers: {
                        "Authorization": bearerToken,
                        'Content-Type': 'multipart/form-data',
                    },
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
    const deletePromotionsFixed = async (promotionId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axiosInstance.patch(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/promotionsFixed/${promotionId}`,
                {
                    headers: {
                        "Authorization": bearerToken,
                        'Content-Type': 'multipart/form-data',
                    },
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
    const deletePromotionsCode = async (promotionId) => {
        try {
            let bearerToken = `Bearer ${localStorage.getItem("token")}`
            const response = await axiosInstance.patch(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/promotionsCode/${promotionId}`,
                {
                    headers: {
                        "Authorization": bearerToken,
                        'Content-Type': 'multipart/form-data',
                    },
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
    return {
        getAllPromotionApi, getOnePromotionApi,
        addPromotionsFixed, addPromotionsCode,
        updatePromotionsFixed, updatePromotionsCode,
        deletePromotionsFixed, deletePromotionsCode
    }
}

export default PromotionService