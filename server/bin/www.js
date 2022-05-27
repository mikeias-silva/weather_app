#!/usr/bin/env node
import app from "../app.js";

const server = app.listen(3000, () => console.log('servidor iniciado'));
server.on('error', (err) => console.log(err))
