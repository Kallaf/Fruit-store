const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;

const MongoClient = require('mongodb').MongoClient;
const createDatabase = require('./database');
const dbUrl = "mongodb://localhost:27017/";

createDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/fruits', (req, res) => {
    MongoClient.connect(dbUrl, function(err, db) {
        if (err) 
        {
            res.send(err);
            return;
        }
        var dbo = db.db("fruitsDB");
        dbo.collection("fruits").find({}).toArray(function(err, fruits) {
          if (err) throw err;
          res.json(fruits);
          db.close();
        });
      });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});