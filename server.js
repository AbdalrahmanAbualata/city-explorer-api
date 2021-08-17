"use strict";

const express = require('express');
require('dotenv').config();
const cors = require('cors')
// const weatherData = require('./data/weather.json')
const axios = require('axios')
const server = express();
const PORT = process.env.PORT;
server.use(cors());

class CityWeather {
    constructor(elem) {
        this.date = elem.valid_date;
        this.descreption = `Low of ${elem.low_temp}, high of ${elem.max_temp} with ${elem.weather.description}`
    }
}

class Movie {
    constructor(elem) {
      this.title = elem.title;
      this.date =elem.release_date;
      this.overview =elem.overview;
      this.vote =elem.vote_count;
      this.avgVote = elem.vote_average;
      this.src = `https://image.tmdb.org/t/p/original${elem.poster_path}`;
    }
  }


server.get('/', homeHandler); // check branch clab03 to see the another way .
server.get('/weather', getDataWeather);
server.get('/movies', getDataMovies);
server.get('*', notFoundHandler);




//localhost:5001/
function homeHandler(req, res) {
    res.send('home route')
}


// localhost:5001/weather?lon=-122.3300624&lat=47.6038321
function getDataWeather
(req, res) {

    console.log(req.query.lon);
    console.log(req.query.lat);

    let cityLonQ = Number(req.query.lon);
    let cityLatQ = Number(req.query.lat);

    // https://api.weatherbit.io/v2.0/forecast/daily?key=<KEY&lat=<LAT&lon=<LON&days=NUM_OF_DAYS3
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${cityLatQ}&lon=${cityLonQ}&days=${5}`
    try {
        axios.get(weatherUrl).then((weatherData) => {
            console.log(weatherData);

            let weaArr = weatherData.data.data.map((elem) => {
                return new CityWeather(elem);
            })

            res.status(200).send(weaArr) 
        })

        } catch (error) {
            console.log(error);
            res.status(500).send('not found');
        }
    }
// ************************************************************************************************************************
// localhost:5001/movies?cityName=amman
function getDataMovies (req, res) {

    console.log(req.query.cityName);
  

    let cityName =req.query.cityName;
    

    
        let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}&include_adult=false`
    try {
        axios.get(movieUrl).then((movieData) => {
            console.log(movieData);

            let weaArr = movieData.data.results.map((elem) => {
                return new Movie(elem);
            })

            res.status(200).send(weaArr) 
        })

        } catch (error) {
            console.log(error);
            res.status(500).send('not found');
        }
    }


// ***********************************************************************************************************************************
function notFoundHandler(req, res) {
    res.status(404).send('not found')
}




server.listen(PORT, () => {
    console.log(`Listning on PORT ${PORT}`)
})