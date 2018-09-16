const mongoose = require('mongoose');
const random_humidity = require('./Random_functions/Random_humidity.js');
const random_temperature = require('./Random_functions/Random_temperature.js');
var random_time = require('./Random_functions/Random_time.js');

var user_model = mongoose.model('User_Data', {
    _id: { type: String },
    Room_1_humidity: { 
        type: [],
        default: random_humidity.humidity_generated()
    },
    Room_2_humidity: { 
        type: [],
        default: random_humidity.humidity_generated()
    },
    Room_3_humidity: { 
        type: [],
        default: random_humidity.humidity_generated() 
    },
    Room_1_temperature: { 
        type: [],
        default: random_temperature.temperature_generated()
    },
    Room_2_temperature: { 
        type: [],
        default: random_temperature.temperature_generated()
    },
    Room_3_temperature: { 
        type: [],
        default: random_temperature.temperature_generated() 
    },
    Time: { 
        type: [],
        default: random_time.time_generated() 
    }
});

module.exports ={user_model};