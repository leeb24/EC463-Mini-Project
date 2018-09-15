const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const request = require('request');


// request({
//   url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301+lombard+st+philadelphia&key=AIzaSyBy7CIzynTi7vwWtQokAEVq9pkOWLp2hk0',
//   json: true
// }, (error, response, body) => {
//   console.log(JSON.stringify(body, undefined, 2));
// });



hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
 

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
    return text.toUpperCase()
})



app.get('/', (req, res) => {
    res.render('homepage.hbs', {
        pageTitle: 'Temperature and Humidity Plotter',
        welcomeMessage: 'Home page', 
    });
});

var temp_data = fs.readFileSync('temp_data.txt', 'utf8', function(err, contents) {
    return contents;
});

app.get('/temperature', (req,res)=>{
    res.render('temperature.hbs', {
        pageTitle: 'Plot Temperature',
        data: temp_data,
    });
});

app.get('/humidity', (req,res)=> {
    res.render('humidity.hbs', {
        pageTitle: 'Plot Humidity',
    });
}); 

app.listen(3000, () => {
    console.log('Server Started')
});  