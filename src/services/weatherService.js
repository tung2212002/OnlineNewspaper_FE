import { apiWeather } from "../utils/request";

export const getWeatherService = async (params) => {
    const response = await apiWeather().get(`byCityName`, { params: params });
    return response.data;
}