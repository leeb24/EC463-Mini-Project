const MongoClient = require('mongodb').MongoClient;



//Create new var
// var Room_1 = {temperature: '123123', humidity: '123123'};
// var{temperature} = Room_1;
// console.log(temperature);

//Create  
MongoClient.connect('mongodb://localhost:27017/Mini_Project_databse', (err, db)=> {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    db.collection('Humidity').insertOne({
        _id: 'person1',
        Room_1: '1 2 3 4 5 6 6 7',
        Room_2: '1 2 3 4 5 6 6 7',
        Room_3: '1 2 3 4 5 6 2',
    }, (error, result)=>{
        if (err) {
            return console.log('Unable to insert data', err);
        }
    });
    
    db.close();
});

