const { mongoose } = require('./../models/mongoose.js');
const {ObjectID} = require('mongodb');
var { temperature_model } = require('./../models/temperature_model.js');
var { humidity_model } = require('./../models/humidity_model.js');

var id = 'student_1';
if (!ObjectID.isValid(id)) 


temperature_model.findByID(id).then((Temperature_data) => {
    console.log(Temperature_data);
});

