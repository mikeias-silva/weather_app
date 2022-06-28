import { Router } from "express";
import axios from "axios";
import weatherController from '../controller/WeatherController.js';
const route = new Router();
route.get('/', (req, res) => res.send("oi"))

route.get('/:city', weatherController.byCity);

route.get('/previsaoTempo/:city', weatherController.previsao);



export default route;