const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast');
const exp = require('constants');

//Define paths for express
const pubDirPath = path.join(__dirname,'../public');
const viewsPath =  path.join(__dirname,'../templates/views');
const partialPath =  path.join(__dirname,'../templates/partials');
const port = process.env.PORT || 3000;

//Setup handlebars engine & views location
app.set('view engine','hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialPath);

//Setup static Dir to server
app.use(express.static(pubDirPath));

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        name:'Saran'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About Me',
        name:'Saran'
    });
});

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help',
        name:'Saran',
        helptext: 'This page will provide information about this site.'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Enter address to search weather'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, placeName} = {}) => {
        if(error){
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error });
            }

            res.send({
                address: req.query.address,
                placeName,
                data: forecastData,
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('page404',{
        title:'Help',
        name:'Saran',
        helptxt: 'Help article not found.'
    });
});

// Should always be placed at bottom
app.get('*', (req, res) => {
    res.render('page404',{
        title:'404 - Page Not Found',
        name:'Saran',
        helptxt: '404 - Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server is up on port' + port);
}); 