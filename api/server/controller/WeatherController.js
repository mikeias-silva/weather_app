
import axios from 'axios';
import Weather from '../models/Weather.js';
const WeatherController = {
  byCity(request, response, next) {
    const city = request.params.city;
    Weather.byCity(city)
      .then(result => response.json(result.data))
      .catch(next)
  }
}

export default WeatherController