const mongoose = require('mongoose');
const random_humidity = require('./Random_functions/Random_humidity.js');
const random_temperature = require('./Random_functions/Random_temperature.js');
var random_time = require('./Random_functions/Random_time.js');
var temperature_data =  random_temperature.temperature_generated();
var humidity_data = random_humidity.humidity_generated();

var user_model = mongoose.model('User_Data', {
    _id: { type: String },
    Room_1_humidity: { 
        type: [],
        default: humidity_data.slice(0,9)
    },
    Room_2_humidity: { 
        type: [],
        default: humidity_data.slice(10,19)
    },
    Room_3_humidity: { 
        type: [],
        default: humidity_data.slice(20,29)
    },
    Room_1_temperature: { 
        type: [],
        default: temperature_data.slice(0,9)
    },
    Room_2_temperature: { 
        type: [],
        default: temperature_data.slice(10,19)
    },
    Room_3_temperature: { 
        type: [],
        default: temperature_data.slice(20,29)
    },
    Time: { 
        type: [],
        default: random_time.time_generated() 
    }
});

module.exports ={user_model};