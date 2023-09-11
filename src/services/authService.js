import * as request from "../utils/request";
import axios from "axios";

export const loginService = async (body) => {
    const response = await request.api.post('token/', body);
    return response;
}

export const refreshTokenService = async (body) => {
    const response = await request.api.post('token/refresh/', body);
    return response;
}

export const logoutService = async (body) => {

    const response = await request.apiAuth.post('logout/', body);
    return response;
}

export const registerService = async (body)=>{
    const response = await request.apiAttach.post('register/', body);
    return response;
}

export const testService = async (body) => {
    const request = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',

    });
    request.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token')) : null;
            config.headers['Authorization'] = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    const bodyFormData = new FormData();
    bodyFormData.append('refresh_token', body.refresh_token);
    const response = await request.post('hello/', bodyFormData);
    return response;


}

