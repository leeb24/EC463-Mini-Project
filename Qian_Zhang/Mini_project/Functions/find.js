
const { mongoose } = require('./mongoose.js');
var output;




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