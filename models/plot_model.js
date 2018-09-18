const express = require("express");
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var app = express();
const plotly = require('plotly')("Mini-Project", "gyJSx4qEcM6AZ77gntxr");

module.exports.plot_function = (Humiditydata,Tempdata,temp_layout, layout, data,res) => {

    console.log(data);
    var graphOptions = { layout: layout, filename: "basic-area", fileopt: "overwrite" };
    plotly.plot(data, graphOptions, function (err, msg) {
        console.log('new plot', msg);
    });
    var graphOptions = { layout: temp_layout, filename: "Temp-data", fileopt: "overwrite" };
    plotly.plot(Tempdata, graphOptions, function (err, msg) {
        if (err) {
            console.log(err);
        }
        console.log(msg);
    });
    var graphOptions = { filename: "Hum_data", fileopt: "overwrite" };
    plotly.plot(Humiditydata, graphOptions, function (err, msg) {
        if (err) {
            console.log(err);
        }
        console.log(msg);
        res.sendFile(__dirname + '/../Views/plot1.html');
    });
};