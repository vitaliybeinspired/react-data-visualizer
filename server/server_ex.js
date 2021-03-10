// import npm packages
const express =  require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//const bodyParser = require('body-parser');
//const routes = require('./routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

//Database UserName: REACT
//Database password: WattTime2021
const MONGODB_URI = 'mongodb+srv://REACT:WattTime2021@cluster0.tbh2o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const client = new MongoClient(MONGODB_URI);
async function run() {
  try {
    await client.connect();
    const database = client.db("Costa_Rica");
    const cr_historic = database.collection("historic");

    const cursor = cr_historic.find({ });

    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }
    // replace console.dir with your callback to access individual elements
    await cursor.forEach(console.dir);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

// HTTP request logger
app.use(morgan('tiny'));







// Second example trial
const client = new MongoClient(MONGODB_URI,
    {useNewUrlParser: true,
     useUnifiedTopology: true});


client.connect(err => {
const collection = client.db("test").collection("devices");

const  findDocuments = function(client, callback){
const collection = client.db.collection('documents');
DatabaseData = collection.find({}).toArray(function(err, docs){
assert.equal(err, null);
console.log("Found the following records");
console.log(docs)
callback(docs);
});
}

client.close();
})









// mongoose trials
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

const Schema = mongoose.Schema;
const DataSchema = new Schema();
const DatabaseData = mongoose.model('Costa_Rica.historic', DataSchema);

// HTTP request logger
app.use(morgan('tiny'));









// Route
app.get('/CostaRica', (req, res) => {

    DatabaseData.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta)
        });

})

app.get('/Nicaragua', (req, res) => {

    DatabaseData.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta)
        });

})

app.get('/ElSalvador', (req, res) => {

    DatabaseData.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta)
        });

})

app.get('/Mexico', (req, res) => {

    DatabaseData.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta)
        });
})

app.listen(PORT, console.log(`Server is starting at ${PORT}`));