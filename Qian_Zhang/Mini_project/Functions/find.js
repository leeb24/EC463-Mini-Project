
const { mongoose } = require('../models/mongoose.js');



module.exports.find_data = (id, subject, room) => {

    var Subject = mongoose.model(subject, {
        _id: { type: String },
    });
    var num;
    var out = Subject.findById(id, room, { lean: true }, function (err, user) {
        if (err) {
            console.log('err');
        }
        console.log(user);
        return user;
    });
    
}