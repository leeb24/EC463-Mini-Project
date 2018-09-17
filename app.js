const express = require("express");
const bodyParser = require('body-parser');
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var app = express();
var firebase = require("firebase");
var jwt = require('jsonwebtoken');
const hbs = require('hbs');
var plotly = require('plotly')("Mini-Project", "gyJSx4qEcM6AZ77gntxr");

var { mongoose } = require('./models/mongoose.js');
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
    });


});

app.get('/Room1', (req, res) => {
    var id = req.cookies.Decoded.email;
    console.log('id is : ', id);
    user_model.findById(id, function (err, data) {
        if (err) {
            return console.log(err);
        }
        else {
            console.log('Time is',data);

            var Humiditydata = [
                {
                    x: data.Time,
                    y: data.Room_1_humidity,
                    name: "Humidity",
                    marker: {color: "rgb(135,206,250)"},
                    type: "bar"
                }
            ];
            var Tempdata ={
                x:data.Time,
                y:data.Room_1_temperature,
                name: "Temperature",
                marker: {color: "rgb(255,0,0)"},
                type:"scatter"
            }
              var temp_layout = {
              title:"Temperature Graph",
              yaxis:{title:"Temperature"}
              };

              var hum_layout = {
                title:"Humidity Graph",
                yaxis:{title:"Humidity"}
              };

              var Humidity_Data = {
                x: data.Time,
                y: data.Room_1_humidity,
                name:"Humidity_Data",
                fill: "tozeroy",
                type: "scatter"
              };

              var Temperature_Data = {
                x: data.Time,
                y: data.Room_1_temperature,
                name:"Temperature_Data",
                fill: "tonexty",
                type: "scatter"
              };
              var layout = {
                title:"Temperature and Humidity",
                autosize: false,
                width: 500,
                height: 500,
                margin: {
                  l: 50,
                  r: 50,
                  b: 100,
                  t: 100,
                  pad: 4
                },
                paper_bgcolor: "#ffffff",
                plot_bgcolor: "#ffffff"
              };
              var data = [Humidity_Data, Temperature_Data];
              var graphOptions = {layout:layout,filename: "basic-area", fileopt: "overwrite"};
                  plotly.plot(data, graphOptions, function (err, msg) {
                   console.log('new plot',msg);
               });       
            var graphOptions = { layout: temp_layout ,filename: "Temp-data", fileopt: "overwrite" };
            plotly.plot(Tempdata, graphOptions, function (err, msg) {
                if(err){
                    console.log(err);
                }
                console.log(msg);        
            });
            var graphOptions = { filename: "Hum_data", fileopt: "overwrite" };
            plotly.plot(Humiditydata, graphOptions, function (err, msg) {
                if(err){
                    console.log(err);
                }
                console.log(msg);
                res.sendFile(__dirname + '/Views/plot1.html');
            });
        }
    });



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
            room1Hum = data.Room_3_humidity,
                room1Temp = data.Room_3_temperature
        }
 
    });

});
app.listen(3000, () => {
    console.log('SERVER STARTED');
});