const axios = require('axios')
module.exports = getDataWeather; 


function getDataWeather
(req, res) {
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
    
class CityWeather {
    constructor(elem) {
        this.date = elem.valid_date;
        this.descreption = `Low of ${elem.low_temp}, high of ${elem.max_temp} with ${elem.weather.description}`
    }
}