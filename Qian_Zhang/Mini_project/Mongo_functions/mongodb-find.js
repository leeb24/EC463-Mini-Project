const { MongoClient, ObjectID } = require('mongodb');

module.exports.find_data = (id, subject, room) => {
    var output;
    MongoClient.connect('mongodb://localhost:27017/Mini_Project_databse', (err, db) => {
        if (err) {
            return console.log('Unable to connect to MongoDB server');
        }
        console.log('Connected to MongoDB server');

        db.collection(subject).find({_id: id}).toArray().then((docs) => {
            console.log(docs.Room_1);
        }, (err) => {
            console.log('Unable to fetch temperature', err);
        });
        
        db.close();

    });
};
