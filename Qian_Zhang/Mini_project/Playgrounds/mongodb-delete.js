const MongoClient = require('mongodb').MongoClient;



MongoClient.connect('mongodb://localhost:27017/Mini_Project_databse', (err, db)=> {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected toMongoDB server');


    //deletemany matched
    // db.collection('Humidity').deleteMany({_id: 'person3'}).then((result) => {
    //     console.log(result);
    // });

    // //deleteone matched the first 
    // db.collection('Humidity').deleteOne({_id: 'person3'}).then((result) => {
    //     console.log(result);
    // });

    //Find one and delete 
    db.collection('Humidity').findOneAndDelete({_id: 'person5'}).then((result) => {
        console.log(result);
    });

    db.close();
});