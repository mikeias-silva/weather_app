
import axios from 'axios';
import Weather from '../models/Weather.js';

const WeatherController = {
  byCity(request, response, next) {
    const city = request.params.city;
    Weather.byCity(city)
      .then(result => {
        response.json(result)
      })
      .catch(next)
  },
  previsao(request, response, next) {
    const city = request.params.city;
    
    Weather.previsaoTempo(city)
      .then(result => response.json(result))
      .catch(next)
  }
}

export default WeatherController