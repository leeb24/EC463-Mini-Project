const mongoose = require('mongoose');
const random_humidity = require('./Random_functions/Random_humidity.js');
var random_time = require('./Random_functions/Random_time.js');

var humidity_model = mongoose.model('Humidity', {
    _id: { type: String },
    Room_1: { 
        type: [],
        default: random_humidity.humidity_generated()
    },
    Room_2: { 
        type: [],
        default: random_humidity.humidity_generated()
    },
    Room_3: { 
        type: [],
        default: random_humidity.humidity_generated() 
    },
    Time: { 
        type: [],
        default: random_time.time_generated() 
    }
});

module.exports = {humidity_model};