import express from "express";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import cors from 'cors'
const app = express();

app.disable('X-Powered-By')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(routes)
export default app;