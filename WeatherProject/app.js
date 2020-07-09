const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req,res) => {

    const cityName = req.body.cityName;
    const appId = 'hjhjkhhlkjhkjhjkjk';
    const units = 'metric';

    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+appId+'&units='+ units;

    https.get(url, getRes =>{
        
        getRes.on('data', data => {
            const dataObject = JSON.parse(data);

            let apiResponse = "";

            const weatherTemperature = dataObject.main.temp;
            const weatherDescription = dataObject.weather[0].description;

            const weatherImageCode = dataObject.weather[0].icon;

            const weatherImageUrl = "http://openweathermap.org/img/wn/"+weatherImageCode+"@2x.png";

            apiResponse += "<h1>The temperature in "+cityName+" is " + weatherTemperature + " degrees Celsius!</h1>";
            apiResponse += "<p>It is "+ weatherDescription +"</p>";
            apiResponse += '<img src="'+weatherImageUrl+'" alt="weather-image">';

            res.send(apiResponse);
        });

    });
})

app.listen(3000);