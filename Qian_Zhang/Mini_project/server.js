var express = require('express');
var bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');
const request = require('request');

var {mongoose} = require('./models/mongoose.js');
var {temperature_model} = require('./models/temperature_model.js')  //"mongoose validation", moogoose schemas
var {humidity_model} = require('./models/humidity_model.js');


var app = express();

app.use(bodyParser.json());

app.post('/temperature', (req, res) => {
    var Temperature_User = new temperature_model({
        _id: req.body._id
    });
    Temperature_User.save().then((doc)=> {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.post('/humidity', (req, res)=> {
    var Humidity_User = new humidity_model({
        _id: req.body._id
    });
    Humidity_User.save().then((doc)=> {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/temperature', (req,res)=> {
    temperature_model.find().then((Temperature_Data)=> {
        res.send({Temperature_Data});
    }, (e) => {
        res.status(400).send(e);
    });
});


app.get('/temperature/:id',(req,res)=>{
    var id = req.params.id;
    temperature_model.findById('student_1',{'Room_1':1}).lean().then((temperature_data)=>{
        if (!temperature_data) {
            return rs.status(400).send();
        }
        res.send({temperature_data:temperature_data});
        
    
    }).catch((e) => {
        res.status(400).send();
    });
});
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

module.exports = {app};