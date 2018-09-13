const express = require("express");
const bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var app = express();
var firebase = require("firebase");
var jwt = require('jsonwebtoken');

var config = {
    
    apiKey: "AIzaSyD4QbS7xiS5kkkUrH8sY6dEaDiOmzy0-Yw",
    authDomain: "mini-proj-f24a3.firebaseapp.com",
    databaseURL: "https://mini-proj-f24a3.firebaseio.com",
    projectId: "mini-proj-f24a3",
    storageBucket: "mini-proj-f24a3.appspot.com",
    messagingSenderId: "443719865364"
    
};

firebase.initializeApp(config);

var ref = firebase.app().database().ref();
var datasRef = ref.child('data');

var time = Date.now();
console.log(time);

/*datasRef.push({
 email: "test@bu.edu",
 humidity: 50,
 temperature: 19,
 time: 0
});*/

//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/Views'));
app.use(cookieParser());

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
    console.log(req.cookie);
    jwt.verify(req.cookie, 'Mini-Project', function(err, decoded) {
        if(err){
            console.log('Invalid Access Detected');
        }
        else{
            console.log('Token Verified!');
            next();
        }
    });
}



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
          res.cookie('Token' ,  token , { maxAge: 900000 });
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

app.get('/login',logged,(req,res)=>{
    console.log(user_G);
    console.log('redirecting');
    console.log(req.cookies);
    res.send('LOGGED IN');
    
});

    
app.listen(3000,()=>{
    console.log('SERVER STARTED');
});