import axios from 'axios';
import dotenv from 'dotenv';
const env = dotenv.config().parsed;
const token = `${env.API_TOKEN_OPENWEATHER}`;

const Weather = {
    async byCity(city) {
        let app_url = `${env.APP_URL}`;
        let url = `${app_url}q=${city}&appid=${token}&units=metric&lang=pt_br`;
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
        const coordenadas = await Weather.getCoordenadas(city)
        const urlPrevisao = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordenadas.lat}&lon=${coordenadas.lon}&appid=${token}&lang=pt_br&units=metric`
        let dataPrevisao = axios.get(urlPrevisao)
        let responsePrevisao = await dataPrevisao
        let dados = Weather.parsePrevisaoTempo(responsePrevisao.data);
        return responsePrevisao.data
    },
    async getCoordenadas(city) {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${token}&limit=1`;
        let data = axios.get(url);
        let response = await data;
        let coordenadas = {
            "lat": response.data[0].lat,
            "lon": response.data[0].lon
        }
        return coordenadas
    },
    parsePrevisaoTempo(data) {

        let minutos = data.minutely;

        const newMinutos = minutos.map((minuto) => ({ "minuto": minutoAMinuto(minuto), "precipitacao": minuto.precipitation }))

        function minutoAMinuto(minuto) {
            let minutoParse = new Date(minuto.dt * 1000).toLocaleTimeString();
            return minutoParse
        }

        function horaEmHoraParse(hora) {
            let horaParse = new Date(hora * 1000).toLocaleString();
            return horaParse
        }
        let proximasHoras = data.hourly
        const horaEmHora = proximasHoras.map(function (hora, index) {
            index = {
                "hora": horaEmHoraParse(hora.dt),
                "temperatura": hora.temp,
                "sensacao_termica": hora.feels_like,
                "umidade": hora.humidity,
                "nuvens": hora.clouds,
                "tempo": hora.weather[0].description,
                "icon": hora.weather[0].icon,
                "probabilidade": hora.pop,

            }
            if (hora.hasOwnProperty('rain')) {
                index.rain = hora.rain
            }
            return index
        });

        // console.log(horaEmHora)
        const previsaoTempo = {
            "atual": {
                "dataHoraAtualizacao": new Date(data.current.dt * 1000).toLocaleString(),
                "nascerSol": new Date(data.current.sunrise * 1000).toLocaleTimeString(),
                "porSol": new Date(data.current.sunset * 1000).toLocaleTimeString(),
                "temperatura": data.current.temp,
                "sensacaoTermica": data.current.feels_like,
                "pressao": data.current.pressure,
                "umidade": data.current.humidity,
                "nuvens": data.current.clouds,
                "velocidadeVento": data.current.wind_speed,
                "tempo": data.current.weather[0].description,
                "icon": data.current.weather[0].icon,
            },
            "minutoAMinuto": newMinutos,
            "proximas48Horas": horaEmHora,
            
        }

        console.log(previsaoTempo);
    }
}



export default Weather;