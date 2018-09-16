const mongoose = require('mongoose');

const random_temperature = require('./Random_functions/Random_temperature.js');

var temperature_model = mongoose.model('Temperature', {
    _id: { type: String },
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

module.exports = {temperature_model};