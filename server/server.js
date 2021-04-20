const express =  require('express');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const cors = require('cors');
const {date_to_week, date_to_weekUS}  = require('./date_to_week');
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
var cr_h_data = [];
var cr_f_data = [];
var el_h_data = [];
var el_f_data = [];
var n_h_data = [];
var n_f_data = [];
var m_h_data = [];
var m_f_data = [];


const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 8080;

//Database UserName: REACT
//Database password: WattTime2021
const MONGODB_URI = 'mongodb+srv://REACT:WattTime2021@cluster0.tbh2o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const client = new MongoClient(MONGODB_URI);

// 'MM/DD/YYYY' format for US
const week = "09/01/2019";
const country = "Costa_Rica";
const database = "Historic";

async function run(week, country, database) {
    try {
        await client.connect();
        const cr_client = client.db("Costa_Rica");
        const el_client = client.db("El_Salvador");
        const n_client = client.db("Nicaragua");
        const m_client = client.db("Mexico");

        const cr_historic = cr_client.collection("Historic");
        const el_historic = el_client.collection("Historic");
        const n_historic = n_client.collection("Historic");
        const m_historic = m_client.collection("Historic");

        //const cr_forecast = cr_client.collection("Forecast");
        //const el_forecast = el_client.collection("Forecast");
        //const n_forecast = n_client.collection("Forecast");
        //const m_forecast = m_client.collection("Forecast");

        const cr_h_cursor = cr_historic.find({"_id": week });
        //const cr_f_cursor = cr_forecast.find({"_id": week });
        const el_h_cursor = el_historic.find({"_id": week });
        //const el_f_cursor = el_forecast.find({ "_id": week});
        const n_h_cursor = n_historic.find({ "_id": week});
        //const n_f_cursor = n_forecast.find({ "_id": week});
        const m_h_cursor = m_historic.find({"_id": week });
        //const m_f_cursor = m_forecast.find({ "_id": week});

        if ((await cr_h_cursor.count()) === 0) {
            console.log("No Costa Rica Historic Documents");
        //}if ((await cr_f_cursor.count()) === 0) {
        //    console.log("No Costa Rica Forecast Documents");
        }
        if ((await el_h_cursor.count()) === 0) {
            console.log("No El Salvador Historic Documents");
        //}if ((await el_f_cursor.count()) === 0) {
        //    console.log("No El Salvador Forecast Documents");
        }
        if ((await n_h_cursor.count()) === 0) {
            console.log("No Nicaragua Historic Documents");
        //}if ((await n_f_cursor.count()) === 0) {
         //   console.log("No Nicaragua Forecast Documents");
        }
        if ((await m_h_cursor.count()) === 0) {
            console.log("No Mexico Historic Documents");
        //}if ((await m_f_cursor.count()) === 0) {
        //    console.log("No Mexico Forecast Documents");
        }

        await cr_h_cursor.forEach(function(data) {cr_h_data.push(data)});
        //await cr_f_cursor.forEach(function(data) {cr_f_data.push(data)});
        await el_h_cursor.forEach(function(data) {el_h_data.push(data)});
        //await el_f_cursor.forEach(function(data) {el_f_data.push(data)});
        await n_h_cursor.forEach(function(data) {n_h_data.push(data)});
        //await n_f_cursor.forEach(function(data) {n_f_data.push(data)});
        await m_h_cursor.forEach(function(data) {m_h_data.push(data)});
        //await m_f_cursor.forEach(function(data) {m_f_data.push(data)});

        console.log("cr_h: " + cr_h_data.length);
        //console.log("cr_f: " + cr_f_data.length);
        console.log("el_h: " + el_h_data.length);
        //console.log("el_f: " + el_f_data.length);
        console.log("n_h: " + n_h_data.length);
        //console.log("n_f: " + n_f_data.length);
        console.log("m_h: " + m_h_data.length);
        //console.log("m_f: " + m_f_data.length);

        } finally {
          await client.close();
    }
}


run(date_to_weekUS(week), country, database).catch(console.dir);

// Routes
app.get('/CostaRica/Historic', (req, res) => {
    cr_h_data.forEach(element =>  res.json(element))})
app.get('/CostaRica/Forecast', (req, res) => {
    cr_f_data.forEach(element =>  res.json(element))})
app.get('/ElSalvador/Historic', (req, res) => {
    el_h_data.forEach(element =>  res.json(element))})
app.get('/ElSalvador/Forecast', (req, res) => {
    el_f_data.forEach(element =>  res.json(element))})
app.get('/Nicaragua/Historic', (req, res) => {
    n_h_data.forEach(element =>  res.json(element))})
app.get('/Nicaragua/Forecast', (req, res) => {
    n_f_data.forEach(element =>  res.json(element))})
app.get('/Mexico/Historic', (req, res) => {
    m_h_data.forEach(element =>  res.json(element))})
app.get('/Mexico/Forecast', (req, res) => {
    m_f_data.forEach(element =>  res.json(element))})

app.listen(PORT, console.log(`Server is starting at ${PORT}`));