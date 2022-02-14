const request = require('postman-request');

const geocode = (address, callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?limit=1&access_token=pk.eyJ1Ijoic2FyYW45NTk3IiwiYSI6ImNrejRjaWVudjA2d20ycW10ZHR6OW5saXMifQ.1RhKuqw_PWdFhuNxjAqMIw"

    request({url:geocodeURL, json: true, rejectUnauthorized: false}, (error, {body}) => {
        if(error){
            //System error or connection error
            callback('Unable to connect to location services', undefined);
        }else if(body.message){
            //Error with the request
            callback(body.message, undefined);
        }else if(body.features.length === 0){
            //No result for the request
            callback('Location not found. Try with another search!!!', undefined);
        }else{
            //Final output
            const data = {
                placeName: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            }

            callback(undefined, data);
        }
    });
};

module.exports = geocode;