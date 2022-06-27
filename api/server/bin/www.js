#!/usr/bin/env node
import app from "../app.js";
import dotenv from 'dotenv';
const env = dotenv.config().parsed;

const server = app.listen(env.PORT, () => console.log(`servidor iniciado na porta ${env.PORT}`));
server.on('error', (err) => console.log(err))
