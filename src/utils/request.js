import axios from 'axios';

const WEATHER_API_URL = 'https://v1.nocodeapi.com/ott1/ow/hcfQibLgGYhKhNMi/';
const BASE_URL = 'http://127.0.0.1:8000/';

export const instance = (config = {}, auth = false) => {
    const request = axios.create(config);

    request.interceptors.request.use(
        (config) => {
            if (auth) {
                const token = localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token')) : null;
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    request.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status) {
                return Promise.resolve({
                    status: error.response.status,
                    data: error.response.data,
                });
            }
            return error.response;
        },
    );

    return request;
};

export const api = instance({
    baseURL: BASE_URL + 'api/',
    headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
    },
});

export const apiAuth = instance(
    {
        baseURL: BASE_URL + 'api/',
        headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
        },
    },
    true,
);

export const apiAttach = instance({
    baseURL: BASE_URL + 'api/',
    headers: {
        'Content-Type': 'multipart/form-data',
        Accept: '*/*',
    },
});

export const apiAuthAttach = instance(
    {
        baseURL: BASE_URL + 'api/',
        headers: {
            'Content-Type': 'multipart/form-data',
            Accept: '*/*',
        },
    },
    true,
);

export const apiWeather = () => {
    const request = axios.create({
        baseURL: WEATHER_API_URL,
    });
    return request;
};
