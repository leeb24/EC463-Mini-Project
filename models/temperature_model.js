const mongoose = require('mongoose');

const random_temperature = require('./Random_functions/Random_temperature.js');
const random_time = require('./Random_functions/Random_time.js');
const temperature_data =  random_temperature.temperature_generated();
const temperature_data =  random_temperature.temperature_generated();
console.log(temperature_data);
var temperature_model = mongoose.model('Temperature', {
    _id: { type: String },
    Room_1: { 
        type: [],
        default: random_temperature.temperature_generated()
    },
    Room_2: { 
        type: [],
        default: random_temperature.temperature_generated()
    },
    Room_3: { 
        type: [],
        default: random_temperature.temperature_generated() 
    },
    Time: { 
        type: [],
        default: random_time.time_generated() 
    }
});

module.exports = {temperature_model};