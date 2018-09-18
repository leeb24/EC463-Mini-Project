
const rn = require('random-number');


var temperature_random = {
    min: 60,
    max: 75,
    integer: true
}

var matrix =[];


module.exports.temperature_generated = () => {
    for (i = 0; i < 10; i++) {
        matrix[i] = rn(temperature_random);
    };
    

    return matrix;
};

