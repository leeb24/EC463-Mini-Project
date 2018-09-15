const MongoClient = require('mongodb').MongoClient;



//Create new var
// var Room_1 = {temperature: '123123', humidity: '123123'};
// var{temperature} = Room_1;
// console.log(temperature);

module.exports.update_data = (id,subject,room,data) => { 
    //subject: temperature/humdity
    MongoClient.connect('mongodb://localhost:27017/Mini_Project_databse', (err, db) => {
        if (err) {
            return console.log('Unable to connect to MongoDB server');
        }
        console.log('Connected to MongoDB server');

        db.collection(subject).findOneAndUpdate(
            {_id: id}, 
            { $set: { Room_1: data }}, 
            { returnOriginal: false}
            )
        db.close();
    });
}