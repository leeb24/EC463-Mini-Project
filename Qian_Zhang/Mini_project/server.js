const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const request = require('request');

const rand_num = require('./random_num.js');

console.log(rand_num.number_generated());

// const {mongoose} = require('./Mongo_functions/mongoose.js');

// const mongo_create = require('./Mongo_functions/create.js');
// //"mongoose validation", moogoose schemas

// //const mongodb_update = require('./Mongo_functions/mongodb-update.js');
// //const mongodb_find = require('./Mongo_functions/mongodb-find.js');

// mongo_create.create_data('student_6'); //connect_data = (id)
// //mongodb_update.update_data('student_2', 'Temperature', 'Room_1', 90); //update_data = (id,subject,room,data)
// //mongodb_find.find_data('student_2', 'Temperature', 90); //update_data = (id,subject,room,data)

// const mongodb_delete = require('./Mongo_functions/mongodb-delete.js');


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

// app.listen(3000, () => {
//     console.log('Server Started')
// });    
