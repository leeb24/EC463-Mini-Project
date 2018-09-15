const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const request = require('request');

const {mongoose} = require('./Functions/mongoose.js');
const mongo_create = require('./Functions/create.js');  //"mongoose validation", moogoose schemas
const mongo_find = require('./Functions/find.js');
//mongo_create.create_data('student_1'); //connect_data = (id)
//mongo_find.find_data('student_6', 'humidity','Room_1');
//mongo_find.find_data('student_1', 'humidity');

var Subject = mongoose.model('temperature', {
    _id: { type: String },
});

var out = Subject.findById('student_1', 'Room_1', { lean: true }, function (err, user) {
    if (err) {
        console.log('err');
    }
    //console.log(user);
    return user.Room_1;
});

console.log(out);

// var app = express();
// app.post('', (req, res)=>
// )
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
