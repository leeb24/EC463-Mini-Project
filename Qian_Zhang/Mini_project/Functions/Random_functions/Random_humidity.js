

const rn = require('random-number');

var humidity_random  = {
    min:  15,
    max:  30,
    integer: true
}

var month_random  = {
    min:  1,
    max:  12,
    integer: true
}
var month = rn(month_random);

var day_random  = {
    min:  1,
    max:  30,
    integer: true
}
var day = rn(day_random);

var hour_random  = {
    min:  7,
    max:  20,
    integer: true
}
var hour = rn(hour_random);

var min_random  = {
    min:  1,
    max:  20,
    integer: true
}
var min = rn(min_random);

var matrix = [],
cols = 2;

for ( var i = 0; i < 2; i++ ) {
  matrix[i] = []; 
}


module.exports.humidity_generated = () => {

for (i = 0; i < 10; i++) { 
    matrix[0][i] = rn(humidity_random);
    
    matrix[1][i] = '2018'+'/'+month+'/'+day+'/'+hour+':'+min;
    min = min+3;
}


return matrix; 
};

