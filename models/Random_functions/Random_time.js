

const rn = require('random-number');


var month_random = {
    min: 1,
    max: 12,
    integer: true
}
var month = rn(month_random);

var day_random = {
    min: 1,
    max: 30,
    integer: true
}
var day = rn(day_random);

var hour_random = {
    min: 7,
    max: 20,
    integer: true
}
var hour = rn(hour_random);

var min_random = {
    min: 1,
    max: 20,
    integer: true
}
var min = rn(min_random);

var matrix =[];
module.exports.time_generated = () => {
    for (i = 0; i < 10; i++) {
        matrix[i] = '2018' + '/' + month + '/' + day + '/' + hour + ':' + min;
        min = min+5;
    }
    return matrix;
};

