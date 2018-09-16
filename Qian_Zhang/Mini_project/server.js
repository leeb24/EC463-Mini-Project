var express = require('express');
var bodyParser = require('body-parser');
//const hbs = require('hbs');
//const fs = require('fs');

//const request = require('request');

var {mongoose} = require('./models/mongoose.js');
var {Temperature_model} = require('./models/temperature_model.js')  //"mongoose validation", moogoose schemas
var {humidity} = require('./models/humidity_model.js');
var {Todo} = require('./models/todo');
//mongo_create.create_data('student_1'); //connect_data = (id)
//mongo_find.find_data('student_6', 'humidity','Room_1');
//mongo_find.find_data('student_1', 'humidity');

var app = express();

app.use(bodyParser.json());

app.post('/temperature', (req, res)=> {
    var todos = new Todo({
        text: req.body.text
    });
    todos.save().then(()=> {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});



// hbs.registerPartials(__dirname + '/views/partials');

// app.set('view engine', 'hbs');

// app.use(express.static(__dirname + '/public'));
 

// hbs.registerHelper('getCurrentYear', ()=>{
//     return new Date().getFullYear();
// });

// hbs.registerHelper('screamIt', (text) =>{
//     return text.toUpperCase()
// })



// app.get('/', (req, res) => {
//     res.render('homepage.hbs', {
//         pageTitle: 'Temperature and Humidity Plotter',
//         welcomeMessage: 'Home page', 
//     });
// });

// var temp_data = fs.readFileSync('temp_data.txt', 'utf8', function(err, contents) {
//     return contents;
// });

// app.get('/temperature', (req,res)=>{
//     res.render('temperature.hbs', {
//         pageTitle: 'Plot Temperature',
//         data: temp_data,
//     });
// });

// app.get('/humidity', (req,res)=> {
//     res.render('humidity.hbs', {
//         pageTitle: 'Plot Humidity',
//     });
// }); 

app.listen(3000, () => {
     console.log('Server Started')
});    


// var express = require('express');
// var bodyParser = require('body-parser');

// var {mongoose} = require('./db/mongoose');

// var {User} = require('./models/user');

// var app = express();

// app.use(bodyParser.json());

// app.post('/todos', (req, res) => {
//   var todo = new Todo({
//     text: req.body.text
//   });

//   todo.save().then((doc) => {
//     res.send(doc);
//   }, (e) => {
//     res.status(400).send(e);
//   });
// });

// app.listen(3000, () => {
//   console.log('Started on port 3000');
// });
