const express =  require('express');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const cors = require('cors');
const date_to_week = require('./date_to_week');
//const routes = require('./routes');

const country_database = (
    "Costa_Rica",
    "El_Salvador",
    "Nicaragua",
    "Mexico"
);

const database_type =(
    "Historic",
    "Forecast"
);

var query_data = [];
const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;

//Database UserName: REACT
//Database password: WattTime2021
const MONGODB_URI = 'mongodb+srv://REACT:WattTime2021@cluster0.tbh2o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const client = new MongoClient(MONGODB_URI);

const week = "09/01/2019";
const country = "Costa_Rica";
const database = "Historic";

async function run(week, country, database) {
    try {
        await client.connect();
        const cursor = client.db(country).collection(database).find({"_id": week});

        if ((await cursor.count()) === 0) {
            console.log("No " + country + " " + database + " Documents");
        }

        await cursor.forEach(function(items) {query_data.push(items)});
        //await cursor.toArray(query_data);

        console.log("data: " + query_data.length);

        } finally {
          await client.close();
    }
}


run(date_to_week[week], country, database).catch(console.dir);

//app.use(cors);
app.use(morgan('tiny'));
//app.use('/', routes);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.get('/QueryData', (req, res) => {
    res.json(query_data);
});

/*
app.post('/QueryRequest', (req, res) => {
    console.log("Request: ", req.body);
    const data = req.body;
    //res.json(req.body)
});*/

app.listen(PORT, console.log(`Server is starting at ${PORT}`));