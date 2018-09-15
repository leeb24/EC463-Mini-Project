
const {MongoClient, ObjectID} = require('mongodb');

//Read 
MongoClient.connect('mongodb://localhost:27017/Mini_Project_databse', (err, db)=> {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Temperature').find({
        _id: 'person1'
    }).toArray().then((docs) => {
        console.log('Temperature');
        console.log(JSON.stringify(docs, undefined,2));
    }, (err) => {
        console.log('Unable to fetch temperature', err);
    });

    db.close();

});

