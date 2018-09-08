const express = require("express");
const bodyParser = require('body-parser');

var app = express();

var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyD4QbS7xiS5kkkUrH8sY6dEaDiOmzy0-Yw",
    authDomain: "mini-proj-f24a3.firebaseapp.com",
    databaseURL: "https://mini-proj-f24a3.firebaseio.com",
    projectId: "mini-proj-f24a3",
    storageBucket: "mini-proj-f24a3.appspot.com",
    messagingSenderId: "443719865364"
};

firebase.initializeApp(config);

var logged =  function (req,res,next) {

    
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
        next();
        // ...
      } else {
        console.log('USER IS NOT SIGNED IN');
          
        // User is signed out.
        // ...
      }
    });
};



//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index.ejs');

});

app.post('/login',(req,res)=>{
    console.log('email: ',req.body.email);
    console.log('password: ',req.body.pw);
    let email = req.body.email;
    let password = req.body.pw;
    
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
});

app.get('/login',(req,res)=>{
    
});

app.get('/logged',logged,(req,res)=>{
    console.log('valid login');
});
    
app.listen(3000,()=>{
    console.log('SERVER STARTED');
});