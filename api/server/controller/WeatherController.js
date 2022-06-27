
import axios from 'axios';

const WeatherController = {
  byCity(request, response, next) {
    const city = request.params.city;
    let token = `a5f2fb1bbbaa03ac4d06c69353d78eeb`
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}`;

    axios.get(url)
      .then(result =>
        response.json(result.data)
      )
      .catch(next)
  }
}

export default WeatherController