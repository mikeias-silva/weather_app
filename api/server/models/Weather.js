import axios from 'axios';
import dotenv from 'dotenv';
const env = dotenv.config().parsed;

const Weather = {
    async byCity(city) {
        let token = `${env.API_TOKEN_OPENWEATHER}`;
        let app_url = `${env.APP_URL}`;
        let url = `${app_url}q=${city}&appid=${token}&units=metric&lang=pt_br`;
        // let url = `https://api.openweathermap.org/data/2.5/onecall?lat=-25.094994&lon=-50.159667&appid=${token}&lang=pt_br&units=metric`
        let data = axios.get(url)
        let response = await data;
        const dados = Weather.tempoDia(response.data);
        return dados;
    },
    tempoDia(data) {
        const tempo = {};
        let dataAtualizacao = new Date(data.dt * 1000)
        tempo.data = dataAtualizacao.toLocaleDateString();
        tempo.pais = data.sys.country;
        tempo.cidade = data.name;
        tempo.tempo = {
            "descricao": data.weather[0].description,
            "icon": data.weather[0].icon
        }
        tempo.temperatura = {
            "atual": data.main.temp,
            "sensacao_termica": data.main.feels_like,
            "pressao": data.main.pressure,
            "umidade": data.main.humidity,
            "minima": data.main.temp_min,
            "maxima": data.main.temp_max
        }
        let nascerSol = new Date(data.sys.sunrise * 1000)
        let porSol = new Date(data.sys.sunset * 1000);
        tempo.nascerSol = nascerSol.toLocaleTimeString();
        tempo.porSol = porSol.toLocaleTimeString()
        tempo.vento = {
            "velocidade": data.wind.speed
        }
        tempo.coordenadas = {
            "lon": data.coord.lon,
            "lat": data.coord.lat
        }

        return tempo
    },
    async previsaoTempo(city) {
        const token = `${env.API_TOKEN_OPENWEATHER}`;
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${token}&limit=1`;

        let data = axios.get(url);
        // console.log(url)
        let response = await data;
        let coordenadas = {
            "lat": response.data[0].lat,
            "lon": response.data[0].lon
        }

        console.log(coordenadas.lat)
        const urlPrevisao = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordenadas.lat}&lon=${coordenadas.lon}&appid=${token}&lang=pt_br&units=metric`
        let dataPrevisao = axios.get(urlPrevisao)

        let responsePrevisao = await dataPrevisao


        return responsePrevisao.data

    }
}



export default Weather;