import axios from 'axios';
import toastNotify from "../utils/UseToastForNotify";
import AuthService from './AuthService';
import RefreshToken from './RefreshToken';
import { jwtDecode } from 'jwt-decode';
import { checkTokenExp } from '../utils/token';
import { useNavigate } from 'react-router-dom';

let refreshTokenRequest = null;

const axiosService = () => {
    const { refreshTokenApi } = RefreshToken()


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const accessToken = localStorage.getItem('token') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';

    const loadRefreshToken = async () => {
        try {
            if (refreshToken) {
                const response = await refreshTokenApi(accessToken, refreshToken);
                return response;
            }
        } catch (error) {
            console.log('error when call refresh token: ', error);
            throw error;
        }
    };

    const axiosInstance = axios.create({
        baseURL: `${process.env.REACT_APP_HOST_API_KEY}`,
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    // Truoc khi gui server
    axiosInstance.interceptors.request.use(
        async (config) => {
            if (!checkTokenExp(accessToken)) {
                refreshTokenRequest = loadRefreshToken();
                try {
                    const response = await refreshTokenRequest;
                    if (response) {
                        localStorage.setItem('token', response.data.result.accessToken);
                        localStorage.setItem('refreshToken', response.data.result.refreshToken);
                        config.headers = {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${response?.data?.result?.accessToken}`,
                        };
                        // reset token request for the next expiration
                        refreshTokenRequest = null;
                    }
                } catch (error) {
                    refreshTokenRequest = null;
                    if (!error.response) {
                        if (!error.response) {
                            console.log('Lỗi khi kết nối với server', { variant: 'error' });
                        }
                    }
                }
                return config;
            }
            return config;
        },

        (error) => {
            Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        (errors) => {
            if (!errors.response) {
                console.log('Lỗi khi kết nối với server', { variant: 'error' });
            }
            if (errors?.response?.status === 401) {
                console.log('Phiên đăng nhập đã hết hạn', { variant: 'error' });
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('username');
                window.location.href = '/signup'; 
            }
            throw errors;
        }
    );
    return axiosInstance
}
export default axiosService;
