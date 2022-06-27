import axios from 'axios';
import dotenv from 'dotenv';
const env = dotenv.config().parsed;

const Weather = {
    async byCity(city) {
        let token = `${env.API_TOKEN_OPENWEATHER}`;
        let app_url = `${env.APP_URL}`;
        let url = `${app_url}q=${city}&appid=${token}`;
        let data = axios.get(url)
        let response = await data;
        return response.data;
    }
}

export default Weather;