
const random_humidity = require('./Random_functions/Random_humidity.js');
const random_temperature = require('./Random_functions/Random_temperature.js');

const {mongoose} = require('./mongoose.js');

var Temperature_Data = mongoose.model('Temperature', {
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

var Humidity_Data = mongoose.model('Humidity', {
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

module.exports.create_data = (id) => {
    var student_1_temperature = new Temperature_Data({
        _id: id,
    });
    student_1_temperature.save().then((doc) => {
        console.log('Temperature created');
    }, (e) => {
        console.log('User existed');
    });

    var student_1_humidity = new Humidity_Data({
        _id: id,
    });
    student_1_humidity.save().then((doc) => {
        console.log('Humidity created');
    }, (e) => {
        console.log('User existed');
    });
    return;
};