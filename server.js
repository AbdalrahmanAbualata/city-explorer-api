"use strict";

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const server = express();
const PORT = process.env.PORT;
server.use(cors());
const getDataWeather =require("./modules/weather.js");
const getDataMovies =require("./modules/movies.js");


// localhost:5001/
server.get('/', homeHandler); 
// localhost:5001/weather?lon=-122.3300624&lat=47.6038321
server.get('/weather', getDataWeather);
// localhost:5001/movies?cityName=amman
server.get('/movies', getDataMovies);

server.get('*', notFoundHandler);


function homeHandler(req, res) {
    res.send('home route')
}

function notFoundHandler(req, res) {
    res.status(404).send('not found')
}

server.listen(PORT, () => {
    console.log(`Listning on PORT ${PORT}`)
})