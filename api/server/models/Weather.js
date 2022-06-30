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
        dados.cidade = city
        return dados
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

        const parseMinutos = minutos.map((minuto) => ({ "minuto": minutoAMinuto(minuto), "precipitacao": minuto.precipitation }))

        function minutoAMinuto(minuto) {
            let minutoParse = new Date(minuto.dt * 1000).toLocaleTimeString();
            return minutoParse
        }

        function horaEmHoraParse(hora) {
            let horaParse = new Date(hora * 1000).toLocaleString();
            return horaParse
        }
        let proximasHoras = data.hourly
        const parseHoras = proximasHoras.map((hora, index) => (
            {
                "hora": horaEmHoraParse(hora.dt),
                "temperatura": hora.temp,
                "sensacao_termica": hora.feels_like,
                "umidade": hora.humidity,
                "nuvens": hora.clouds,
                "tempo": hora.weather[0].description,
                "icon": hora.weather[0].icon,
                "probabilidade": hora.pop,
                "chuva": hora.rain ? hora.rain : '0'

            })

        );

        let proximosDias = data.daily

        const parseDias = proximosDias.map((dia, index) => (
            {
                "dia": new Date(dia.dt * 1000).toLocaleDateString(),
                "nascerSol": new Date(dia.sunrise * 1000).toLocaleTimeString(),
                "porSol": new Date(dia.sunset * 1000).toLocaleTimeString(),
                "temperatura": {
                    "dia": dia.temp.day,
                    "minima": dia.temp.min,
                    "maxima": dia.temp.max,
                    "noite": dia.temp.night,
                    "manha": dia.temp.morn
                },
                "sensacaoTermica": {
                    "dia": dia.feels_like.day,
                    "noite": dia.feels_like.night,
                    "manha": dia.feels_like.morn
                },
                "pressao": dia.pressure,
                "umidade": dia.humidity,
                "velocidadeVento": dia.wind_speed,
                "tempo": dia.weather[0].description,
                "icon": dia.weather[0].icon,
                "nuvens": dia.clouds,
                "probabilidade": dia.pop,
                "chuva": dia.rain ? dia.rain : '0'
            }
        ))


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
            "minutoAMinuto": parseMinutos,
            "proximas48Horas": parseHoras,
            "proximos7dias": parseDias

        }

        return previsaoTempo
    }
}



export default Weather;