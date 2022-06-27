
import axios from 'axios';
import Weather from '../models/Weather.js';
const WeatherController = {
  byCity(request, response, next) {
    const city = request.params.city;
    Weather.byCity(city)
      .then(result => {
        response.json(result)
        let options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC', hour12: false };
        let nascerSol = new Date(result.sys.sunrise * 1000)
        let porSol = new Date(result.sys.sunset * 1000);
        let timezone = new Date(result.timezone * 1000);
        console.clear()
        console.log("*** Nascer do Sol **")
        console.log(nascerSol.toLocaleDateString())
        console.log(nascerSol.toLocaleTimeString())


        console.log("*** Pôr do Sol **")
        console.log(porSol.toLocaleDateString());
        console.log(porSol.toLocaleTimeString())
      })
      .catch(next)
  }
}

export default WeatherController