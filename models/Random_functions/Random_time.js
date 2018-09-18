

const rn = require('random-number');


const dateTime = require('node-datetime');
var dt = dateTime.create();
var time_ec_hour_min = dt.format('Y-m-d ');
var time_hour = dt.format('H');
var time_min = dt.format('M');
time_hour = Number(time_hour);
time_min = Number(time_min);


var matrix =[];
module.exports.time_generated = () => {
    for (i = 0; i < 10; i++) {
        matrix[i] = time_ec_hour_min+time_hour+':'+time_min;
        time_min = time_min+5;
        if (time_min>=60){
             time_min -= 60;
             time_hour +=1;
         }
        console.log(time_ec_hour_min+time_hour+':'+time_min);
    }
    return matrix;
};

