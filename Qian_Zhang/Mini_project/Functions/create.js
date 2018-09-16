


const {mongoose} = require('../models/mongoose.js');





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