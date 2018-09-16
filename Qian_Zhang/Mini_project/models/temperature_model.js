const mongoose = require('mongoose');

const random_temperature = require('./Random_functions/Random_temperature.js');

var Temperature_model = mongoose.model('Temperature_model', {
    _id: { type: String },
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
      },
    Room_1: { 
        type: String,
        default: random_temperature.temperature_generated()
    },
    Room_2: { 
        type: String,
        default: random_temperature.temperature_generated()
    },
    Room_3: { 
        type: String,
        default: random_temperature.temperature_generated() 
    }
});

module.exports = {Temperature_model};