/* eslint-disable consistent-return */
import axios from 'axios';
import AuthService from '../service/AuthService'
import { jwtDecode } from 'jwt-decode'
// import { checkTokenExp } from '../utils/token';
const httpClient = () => {
    let refreshTokenRequest = null;

    debugger
    const { refreshTokenApi } = AuthService()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const accessToken = localStorage.getItem('token') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';

    const checkTokenExp = (token) => {
        const date = new Date().getTime() / 1000;
        const expToken = jwtDecode(token).exp;
        if (expToken && expToken > date) {
            return true;
        }
        return false;
    };

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

    const axiosOptions = axios.create({
        baseURL: "http://localhost:8080/api/v1",
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    // Truoc khi gui server
    axiosOptions.interceptors.request.use(
        async (config) => {
            if (!checkTokenExp(accessToken)) {
                refreshTokenRequest = loadRefreshToken();
                try {
                    const response = await refreshTokenRequest;
                    if (response) {
                        localStorage.setItem('token', response.data.accessToken);
                        localStorage.setItem('refreshToken', response.data.refreshToken);
                        config.headers = {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${response?.data?.accessToken}`,
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

    axiosOptions.interceptors.response.use(
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
    return axiosOptions
}
// closure: to save the refreshTokenRequest


const post = (endpoint, data) => {
    debugger
    return httpClient().post(`${endpoint}`, data)
}



export const AxiosService = {
    post
};
