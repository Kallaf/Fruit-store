const fruits = require('./fruits');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

module.exports = () => {
    MongoClient.connect(url + '/fruitsDB', function (err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
    });

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("fruitsDB");
        if (!dbo.collection('fruits').findOne()) {
            dbo.createCollection("fruits", function (err, res) {
                if (err) throw err;
                console.log("Collection created!");
                db.close();
            });
            dbo.collection("fruits").insertMany(fruits, function (err, res) {
                if (err) throw err;
                console.log("Number of documents inserted: " + res.insertedCount);
                db.close();
            });
        }
    });
}