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
    const addPromotionsFixed = async (data) => {
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
                },
                {
                    headers: {
                        "Authorization": bearerToken,
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
        console.log("🚀 ~ addPromotionsCode ~ data:", data)
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
                },
                {
                    headers: {
                        "Authorization": bearerToken,
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
            const response = await axiosInstance.put(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/promotionsFixed/${promotionId}`,
                data,
                {
                    headers: {
                        "Authorization": bearerToken,
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
            const response = await axiosInstance.put(
                `${process.env.REACT_APP_HOST_API_KEY}/admin/promotionsCode/${promotionId}`,
                data,
                {
                    headers: {
                        "Authorization": bearerToken,
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