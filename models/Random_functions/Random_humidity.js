const rn = require('random-number');

var humidity_random = {
    min: 15,
    max: 30,
    integer: true
}

var matrix =[];

module.exports.humidity_generated = () => {

    for (i = 0; i < 10; i++) {
        matrix[i] = rn(humidity_random);

    }


    return matrix;
};

