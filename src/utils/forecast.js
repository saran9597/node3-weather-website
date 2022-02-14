const request = require('postman-request');
const chgCase = require('change-case');

const forecast = (latitude, longitude, callback) => {
    const weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&units=metric&APPID=1d367d9af123978e1fc12efefdc370b0'

    request({url: weatherURL, json:true, rejectUnauthorized: false}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to Weather Service!');
        }else if(body.message){
            callback(body.message);
        }else{
            const response = {
                overCast: chgCase.capitalCase(body.current.weather[0].description),
                currentTemp: body.current.temp,
                feelsLike: body.current.feels_like,
                humidity: body.current.humidity,
                weatherIcon: body.current.weather[0].icon
            }
            callback(undefined,response);
        }
    });
};

module.exports = forecast;