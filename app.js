const express = require("express");
const bodyParser = require('body-parser');
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var app = express();
var firebase = require("firebase");
var jwt = require('jsonwebtoken');
const hbs = require('hbs');
var plotly = require('plotly')("DemoAccount", "lr1c37zw81");

//gyJSx4qEcM6AZ77gntxr
var { mongoose } = require('./models/mongoose.js');
var { temperature_model } = require('./models/temperature_model.js');  //"mongoose validation", moogoose schemas
var { humidity_model } = require('./models/humidity_model.js');
var { user_model } = require('./models/user_model.js');

var config = {

    apiKey: "AIzaSyD4QbS7xiS5kkkUrH8sY6dEaDiOmzy0-Yw",
    authDomain: "mini-proj-f24a3.firebaseapp.com",
    databaseURL: "https://mini-proj-f24a3.firebaseio.com",
    projectId: "mini-proj-f24a3",
    storageBucket: "mini-proj-f24a3.appspot.com",
    messagingSenderId: "443719865364"

};



firebase.initializeApp(config);


var Info = mongoose.model('datas', {
    temp: Number,
    humidity: Number,
    email: String
});
var info = new Info;

//MIDDLEWARE
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/Views'));
hbs.registerPartials(__dirname + './Views/partials');

var user_G;
var logged = function (req, res, next) {

    console.log('IN MIDDLEWARE');
    //VERIFY USER

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log('USER SIGNED IN');
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            user_G = user.email;
            next();
            // ...
        } else {
            console.log('USER IS NOT SIGNED IN');

            // User is signed out.
            // ...
        }
    });
};

var cookieVerify = function (req, res, next) {
    console.log(req.cookies);
    jwt.verify(req.cookies.Token, 'Mini_Project', function (err, decoded) {
        if (err) {
            console.log(err);
            console.log('Invalid Access Detected');
        }
        else {
            console.log('Token Verified!: ', decoded);
            res.cookie('Decoded', decoded);
            next();
        }
    });
};



app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    //res.render('index.ejs');
    res.sendFile(__dirname + '/Views/login_page.html');
});


app.post('/register', (req, res) => {
    console.log('email: ', req.body.email);
    console.log('password: ', req.body.pw);
    let email = req.body.email;
    let password = req.body.pw;

    //Create database;
    var User_Data = new user_model({
        _id: email
    });
    User_Data.save().then(() => {
        console.log('New user data created');
    }, (e) => {
        console.log('New user data error');
    });





    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user) {
            console.log('successful reg');
            var token = jwt.sign({ email: email, pw: password }, 'Mini_Project');
            console.log(token);
            res.cookie('Token', token).send('cookie set');

        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            // ...
        });


});

app.post('/login', (req, res) => {

    let email = req.body.email;
    let password = req.body.pw;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (firebaseUser) {
            console.log('POST logged in');
            var token = jwt.sign({ email: email, pw: password }, 'Mini_Project');
            console.log(token);
            res.cookie('Token', token);
            return res.redirect('/login');
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            return res.redirect('/');
            // ...
        });

});

app.get('/login', cookieVerify, (req, res) => {

    console.log('redirecting');

    console.log(req.cookies.Decoded.email); //Used to query user data

    var collection = req.cookies.Decoded.email;
    var result;
    /*user.find({email:collection},function(err,doc){
        if(err){
            return console.log(err)
        }
        result = doc;

    })
    
    */

    res.render('homepage.hbs', {
        pageTitle: 'Temp and Humidity Plotter',
        welcomeMessage: 'hihi'

    });


});

app.get('/Room1', (req, res) => {
    var id = req.cookies.Decoded.email;
    console.log('id is : ', id);
<<<<<<< HEAD

    user_model.findById(id ,{'Room_1_humidity':1, 'Room_1_temperature':1},function(err,data){
        if(err)
        {
=======
    var room1Temp;
    var room1Hum;
    var room1Time;
    user_model.findById(id, { 'Room_1_humidity': 1, 'Room_1_temperature': 1, 'Time': 1 }, function (err, data) {
        if (err) {
>>>>>>> 11b21951381030d3ce349f6bece51b72bdf63f39
            return console.log(err);
        }
        else {
            //console.log(data.Room_1);
<<<<<<< HEAD
            
=======
            room1Hum = data.Room_1_humidity,
            room1Temp = data.Room_1_temperature,
            room1Temp = data.Time
>>>>>>> 11b21951381030d3ce349f6bece51b72bdf63f39
        }
    });

    // temperature_model.findById(id ,{'Room_1':1},function(err,data){
    //     if(err)
    //     {
    //         return console.log(err);
    //     }
    //     else{
    //         //console.log(data.Room_1);
    //         room1Temp= data.Room_1;
    //     }
    // });
    // console.log(room1Hum,room1Temp);

});

app.get('/Room2', (req, res) => {
    var id = req.cookies.Decoded.email;
    console.log('id is : ', id);
    var room2Temp;
    var room2Hum;
    user_model.findById(id, { 'Room_2_humidity': 1, 'Room_2_temperature': 1 }, function (err, data) {
        if (err) {
            return console.log(err);
        }
        else {
            //console.log(data.Room_2);
            room2Hum = data.Room_2_humidity,
                room2Temp = data.Room_2_temperature
        }
    });

    // temperature_model.findById(id ,{'Room_2':1},function(err,data){
    //     if(err)
    //     {
    //         return console.log(err);
    //     }
    //     else{
    //         console.log(data.Room_2);
    //     }
    // }); 
});

app.get('/Room3', (req, res) => {
    var id = req.cookies.Decoded.email;
    console.log('id is : ', id);
    var room3Temp;
    var room3Hum;
    user_model.findById(id, { 'Room_3_humidity': 1, 'Room_3_temperature': 1 }, function (err, data) {
        if (err) {
            return console.log(err);
        }
        else {
            //console.log(data.Room_3);
            room3Hum = data.Room_3_humidity,
                room3Temp = data.Room_3_temperature
        }
        // temperature_model.findById(id ,{'Room_3':1},function(err,data){
        //     if(err)
        //     {
        //         return console.log(err);
        //     }
        //     else{
        //         console.log(data.Room_3);
        //     }
        // });
    });
});

app.listen(3000, () => {
    console.log('SERVER STARTED');
});