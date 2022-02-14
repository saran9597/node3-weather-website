const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&units=metric&APPID=1d367d9af123978e1fc12efefdc370b0'

    request({url: weatherURL, json:true, rejectUnauthorized: false}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to Weather Service!');
        }else if(body.message){
            callback(body.message);
        }else{
            callback(undefined,body.current.weather[0].description + '. It is currently ' + body.current.temp + ' degrees out. It feels like' + body.current.feels_like + ' degrees out.');
        }
    });
};

module.exports = forecast;