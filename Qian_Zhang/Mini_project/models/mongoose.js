var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Mini_Project_databse', { useNewUrlParser: true });

module.exports = {mongoose};