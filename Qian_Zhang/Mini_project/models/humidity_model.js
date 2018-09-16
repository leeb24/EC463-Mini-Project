const mongoose = require('mongoose');
const random_humidity = require('./Random_functions/Random_humidity.js');

var Humidity_Data = mongoose.model('Humidity_Data', {
    _id: { type: String },
    Room_1: { 
        type: String,
        default: random_humidity.humidity_generated()
    },
    Room_2: { 
        type: String,
        default: random_humidity.humidity_generated()
    },
    Room_3: { 
        type: String,
        default: random_humidity.humidity_generated() 
    }
});

module.exports = {Humidity_Data};