const express = require("express");
const bodyParser = require('body-parser');
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var app = express();
var firebase = require("firebase");
var jwt = require('jsonwebtoken');
const hbs = require('hbs');
const fs = require('fs');
const request = require('request');

var {mongoose} = require('./models/mongoose.js');
var {temperature_model} = require('./models/temperature_model.js');  //"mongoose validation", moogoose schemas
var {humidity_model} = require('./models/humidity_model.js');

var config = {
    
    apiKey: "AIzaSyD4QbS7xiS5kkkUrH8sY6dEaDiOmzy0-Yw",
    authDomain: "mini-proj-f24a3.firebaseapp.com",
    databaseURL: "https://mini-proj-f24a3.firebaseio.com",
    projectId: "mini-proj-f24a3",
    storageBucket: "mini-proj-f24a3.appspot.com",
    messagingSenderId: "443719865364"
    
};


firebase.initializeApp(config);
mongoose.Promise = global.Promise
mongoose.connect('mongodb://test2:dlqudtjf24@ds119422.mlab.com:19422/test-todo-db');


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
var logged =  function (req,res,next) {

    console.log('IN MIDDLEWARE');
    //VERIFY USER
    
    firebase.auth().onAuthStateChanged(function(user) {
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

var cookieVerify = function (req,res,next){
    console.log(req.cookies);
    jwt.verify(req.cookies.Token, 'Mini_Project', function(err, decoded){
        if(err){
            console.log(err);
            console.log('Invalid Access Detected');
        }
        else{
            console.log('Token Verified!: ', decoded);
            res.cookie('Decoded',decoded);
            next();
        }
    });
};



app.set('view engine', 'ejs');

app.get('/', function(req, res){
  //res.render('index.ejs');
    res.sendFile(__dirname + '/Views/login_page.html');
});


app.post('/register',(req,res)=>{
    console.log('email: ',req.body.email);
    console.log('password: ',req.body.pw);
    let email = req.body.email;
    let password = req.body.pw;
        
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(user){
          console.log('successful reg');
          var token = jwt.sign({ email: email , pw: password }, 'Mini_Project');
          console.log(token);

            //Create User Collection
            /*info.temp = 12;
            info.humidity = 80;
            info.email = email;

            user1
            .save().then((result)=>{

                console.log('Save Finished');

            },(e)=>{

                console.log(e);

            });*/


          return res.cookie('Token' , token).send('cookie set');
      })
      .catch(function(error){
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
});

app.post('/login',(req,res)=>{
  let email = req.body.email;
  let password = req.body.pw;
    
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(firebaseUser) {
       console.log('POST logged in');
       var token = jwt.sign({ email: email , pw: password }, 'Mini_Project');
       console.log(token);
       res.cookie('Token' , token);
       return res.redirect('/login');
   })
  .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      return res.redirect('/');
      // ...
  });
    
});

app.get('/login',cookieVerify,(req,res)=>{

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

   res.render('homepage.hbs',{
    pageTitle:'Temp and Humidity Plotter',
    welcomeMessage:'hihi'

   });
    

});

    
app.listen(3000,()=>{
    console.log('SERVER STARTED');
});