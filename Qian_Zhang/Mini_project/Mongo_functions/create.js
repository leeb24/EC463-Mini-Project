const {mongoose} = require('./mongoose.js');


var Temperature_Data = mongoose.model('Temperature', {
    _id: { type: String },
    Room_1: { 
        type: String,
        default: null
    },
    Room_2: { 
        type: String,
        default:null
    },
    Room_3: { 
        type: String,
        default: null 
    }
});

var Humidity_Data = mongoose.model('Humidity', {
    _id: { type: String },
    Room_1: { 
        type: String,
        default: null
    },
    Room_2: { 
        type: String,
        default:null
    },
    Room_3: { 
        type: String,
        default: null 
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

};