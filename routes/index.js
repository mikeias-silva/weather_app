import { Router } from "express";

const routes = new Router();
routes.get('/', (req, res) => res.send("oi"))

export default routes;