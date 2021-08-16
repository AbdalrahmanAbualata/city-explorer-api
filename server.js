"use strict";
 
const express = require('express');
require('dotenv').config();
const cors = require('cors')
const weatherData = require('./data/weather.json')

const server = express();
const PORT = process.env.PORT;
server.use(cors());

class CityWeather {
    constructor(item) {
      this.date =item.valid_date;
      this.descreption = item.weather.description;
    }
  }

  
//localhost:3001/
server.get('/',(req,res)=>{
    res.send('home route')
})


// localhost:5001/weather?cityName=seattle&lon=x&lat=y
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
    if (weatherForCity) {
        let weaArr = weatherForCity.data.map((elem) => {
            return new CityWeather(elem) ;
         });

      
    res.status(200).send(weaArr);
    }
   else{
    res.status(404).send('not found')
   }
})


server.get('*',(req,res)=>{
    res.status(404).send('not found')
})



server.listen(PORT,()=>{
    console.log(`Listning on PORT ${PORT}`)
})