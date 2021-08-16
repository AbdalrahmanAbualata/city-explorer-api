"use strict";
 
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const weatherData = require('./data/weather.json')

const server = express();
const PORT = process.env.PORT;
server.use(cors());



//localhost:3001/
server.get('/',(req,res)=>{
    res.send('home route')
})


// localhost:3006/weather?cityName=seattle 
server.get('/weather',(req,res)=>{
    console.log(req.query);
    let cityName = req.query.cityName;
    console.log(cityName);
    console.log(weatherData[0].city_name);
    let weatherForCity = weatherData.find(obj=>{
        if(obj.city_name.toLocaleLowerCase()===cityName) { //toLocaleLowerCase() her locale
            return obj;
        }
        
    })
    console.log(weatherForCity);
    res.status(200).send(weatherForCity);
})


server.get('*',(req,res)=>{
    res.status(404).send('not found')
})



server.listen(PORT,()=>{
    console.log(`Listning on PORT ${PORT}`)
})