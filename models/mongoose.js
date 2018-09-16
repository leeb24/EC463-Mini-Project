var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://Mini-project:z123456@ds259802.mlab.com:59802/mini-project', { useNewUrlParser: true });
module.exports = {mongoose};

//./mongod --dbpath ~/mongo-data
//./mongo