const express = require("express");
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var app = express();
var firebase = require("firebase");
var jwt = require('jsonwebtoken');
const hbs = require('hbs');
var plotly = require('plotly')("Mini-Project", "gyJSx4qEcM6AZ77gntxr");
var pug = require ('pug');

const { mongoose } = require('./models/mongoose.js');
const { user_model } = require('./models/user_model.js');

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
app.set('view engine', 'pug');
app.set('view engine', 'hbs');

var cookieVerify = function (req, res, next) {
    console.log(req.cookies);
    jwt.verify(req.cookies.Token, 'Mini_Project', function (err, decoded) {
        if (err) {
            console.log(err);
            console.log('Invalid Access Detected');
            res.redirect('/');
        }
        else {
            console.log('Token Verified!: ', decoded);
            res.cookie('Decoded', decoded);
            next();
        }
    });
};


app.get('/', function (req, res) {
    res.render('login_page.pug');
    //res.sendFile(__dirname + '/Views/login_page.html');
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
            res.cookie('Token', token);
            res.redirect('/login');
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
            var parse = email.split("@");
            var name = parse[0];
            return res.render('homepage.hbs', {name:name});
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            return res.render('login_page.pug',{msg:`${errorMessage}`});
            //return res.redirect('/');
            // ...
        });

});

app.get('/login', cookieVerify, (req, res) => {

    console.log('Cookie',req.cookies);
    console.log('redirecting');

    
   
    var id = req.cookies.Decoded.email;
    var parse = id.split("@");
    var name = parse[0];

    console.log(name); 

    res.render('homepage.hbs', {name:name},(err, html) => {
        if (err){
            return console.log(err);
        } 
        console.log(html);
    });


});

app.get('/Room1',cookieVerify ,(req, res) => {
    var id = req.cookies.Decoded.email;
    var parse = id.split("@");
    var name = parse[0];
    console.log('id is : ', id);
    user_model.findById(id, function (err, data) {
        if (err) {
            return console.log(err);
        }
        else {
            console.log('Time is',data);
              var Humidity_Data = {
                x: data.Time,
                y: data.Room_1_humidity,
                name: "Humidity_Data",
                fill: "tozeroy",
                type: "scatter"
            };

            var Temperature_Data = {
                x: data.Time,
                y: data.Room_1_temperature,
                name: "Temperature_Data",
                fill: "tonexty",
                type: "scatter"
              };

              var layout = {
                title:`<b> ${name}'s Temperature and Humidity (Room 1) </b>`,
                autosize: false,
                width: 800,
                height: 800,
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
                    if(err){
                        console.log(err);
                    }
                   console.log('new plot',msg);
                   res.render('plot1.pug');
               });
        }
    });

});

app.get('/Room2',cookieVerify,(req, res) => {
    var id = req.cookies.Decoded.email;
    var parse = id.split("@");
    var name = parse[0];
    console.log('id is : ', id);
    user_model.findById(id, function (err, data) {
        if (err) {
            return console.log(err);
        }
        else {
            //console.log(data.Room_2);
            var Humidity_Data = {
                x: data.Time,
                y: data.Room_2_humidity,
                name:"Humidity_Data",
                fill: "tozeroy",
                type: "scatter"
              };

              var Temperature_Data = {
                x: data.Time,
                y: data.Room_2_temperature,
                name:"Temperature_Data",
                fill: "tonexty",
                type: "scatter"
              };

              var layout = {
                title:`<b> ${name}'s Temperature and Humidity (Room 2) </b>`,
                autosize: false,
                width: 800,
                height: 800,
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
                    if(err){
                        console.log(err);
                    }
                   console.log('new plot',msg);
                   res.render('plot1.pug');
               });
        }
    });

});

app.get('/Room3',cookieVerify, (req, res) => {

    var id = req.cookies.Decoded.email;
    var parse = id.split("@");
    var name = parse[0];
    console.log('id is : ', id);
    var data1 = "Room_3_humidity";
    user_model.findById(id, function (err, data) {
        if (err) {
            return console.log(err);
        }
        else {
            //console.log(data.Room_3);
            var Humidity_Data = {
                x: data.Time,
                y: data.Room_3_humidity,
                name:"Humidity_Data",
                fill: "tozeroy",
                type: "scatter"
              };

              var Temperature_Data = {
                x: data.Time,
                y: data.Room_3_temperature,
                name:"Temperature_Data",
                fill: "tonexty",
                type: "scatter"
              };

              var layout = {
                title:`<b> ${name}'s Temperature and Humidity (Room 3) </b>`,
                autosize: false,
                width: 800,
                height: 800,
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
                    if(err){
                        console.log(err);
                    }
                   console.log('new plot',msg);
                   res.render('plot1.pug');
               });
        }
    });

});
app.post('/tohome',(req,res)=>{
    res.redirect('/login');
});

app.post('/logout',(req,res)=>{
    //Destroy Private route Access 
    res.clearCookie("Token");
    res.redirect('/');
});
app.listen(3000, () => {
    console.log('SERVER STARTED');
});