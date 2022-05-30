import { Router } from "express";
import axios from "axios";

const route = new Router();
route.get('/', (req, res) => res.send("oi"))

route.get('/tempo_pg', (req, res) => {

    let token = `a5f2fb1bbbaa03ac4d06c69353d78eeb`
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=-25.094994&lon=-50.159667&appid=${token}`;

    axios.get(url)
        .then(function (response) {
            res.json(response.data)
        })
        .catch(function (error) {
            res.json(error)
        })

});



export default route;