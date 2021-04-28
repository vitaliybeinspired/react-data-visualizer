const MongoClient = require('mongodb').MongoClient;
const {date_to_week, date_to_weekUS, date_to_weekJS}  = require('../date_to_week');

// status codes:
// Informational responses (100–199)
// Successful responses (200–299)
// Redirects (300–399)
// Client errors (400–499)
// Server errors (500–599)

//Database UserName: REACT
//Database password: WattTime2021
const MONGODB_URI = 'mongodb+srv://REACT:WattTime2021@cluster0.tbh2o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

exports.CostaR_historic = async (req, res) => {
    const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
    if(!client.isConnected()){
        await client.connect();
    }
    try {
        var entries = [];
        let cr_client = client.db("Costa_Rica");
        let cr_historic = cr_client.collection("Historic");
        var week = ""
        if (req.body.dateUS != null || req.body.dateUS != undefined) {
            week = date_to_weekUS(req.body.dateUS);
        }
        else if (req.body.date != null || req.body.date != undefined) {
            week = date_to_week(req.body.date);
        }
        else if (req.body.dateJS != null || req.body.dateJS != undefined) {
            week = date_to_weekJS(req.body.dateJS);
        }
        else{
            res.status(400).json({err: "I need a valid date"})
            return
        }
        let cr_h_cursor = cr_historic.find({"_id": week });
        await cr_h_cursor.forEach(function(data) {entries.push(data)});
        entries.forEach(element =>  res.json(element));
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: err});
    }
    if(client.isConnected()){
        await client.close();
    }
}

exports.Nic_historic = async (req, res) => {
    const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
    if(!client.isConnected()){
        await client.connect();
    }
    try {
        var entries = [];
        await client.connect();
        const n_client = client.db("Nicaragua");
        const n_historic = n_client.collection("Historic");
        var week = ""
        if (req.body.dateUS != null || req.body.dateUS != undefined) {
            week = date_to_weekUS(req.body.dateUS);
        }
        else if (req.body.date != null || req.body.date != undefined) {
            week = date_to_week(req.body.date);
        }
        else if (req.body.dateJS != null || req.body.dateJS != undefined) {
            week = date_to_weekJS(req.body.dateJS);
        }
        else{
            res.status(400).json({err: "I need a valid date"})
            return
        }
        const n_h_cursor = n_historic.find({ "_id": week});
        await n_h_cursor.forEach(function(data) {entries.push(data)});
        entries.forEach(element =>  res.json(element));
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: err});
    }
    if(client.isConnected()){
        await client.close();
    }
}

exports.ElSalv_historic = async (req, res) => {
    const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
    if(!client.isConnected()){
        await client.connect();
    }
    try {
        var entries = [];
        await client.connect();
        const el_client = client.db("El_Salvador");
        const el_historic = el_client.collection("Historic");
        var week = ""
        if (req.body.dateUS != null || req.body.dateUS != undefined) {
            week = date_to_weekUS(req.body.dateUS);
        }
        else if (req.body.date != null || req.body.date != undefined) {
            week = date_to_week(req.body.date);
        }
        else if (req.body.dateJS != null || req.body.dateJS != undefined) {
            week = date_to_weekJS(req.body.dateJS);
        }
        else{
            res.status(400).json({err: "I need a valid date"})
            return
        }
        const el_h_cursor = el_historic.find({"_id": week });
        await el_h_cursor.forEach(function(data) {entries.push(data)});
        entries.forEach(element =>  res.json(element));
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: err});
    }
    if(client.isConnected()){
        await client.close();
    }
}

exports.Mex_historic = async (req, res) => {
    const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
    if(!client.isConnected()){
        await client.connect();
    }
    try{
        var entries = [];
        await client.connect();
        const m_client = client.db("Mexico");
        const m_historic = m_client.collection("Historic");
        var week = ""
        if (req.body.dateUS != null || req.body.dateUS != undefined) {
            week = date_to_weekUS(req.body.dateUS);
        }
        else if (req.body.date != null || req.body.date != undefined) {
            week = date_to_week(req.body.date);
        }
        else if (req.body.dateJS != null || req.body.dateJS != undefined) {
            week = date_to_weekJS(req.body.dateJS);
        }
        else{
            res.status(400).json({err: "I need a valid date"})
            return
        }
        const m_h_cursor = m_historic.find({"_id": week });
        await m_h_cursor.forEach(function(data) {entries.push(data)});
        entries.forEach(element =>  res.json(element));
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: err});
    }
    if(client.isConnected()){
        await client.close();
    }
}

exports.CostaR_forecast = async (req, res) => {
    const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
    if(!client.isConnected()){
        await client.connect();
    }
    try {
        var entries = [];
        await client.connect();
        const cr_client = client.db("Costa_Rica");
        const cr_forecast = cr_client.collection("Forecast");
        var week = ""
        if (req.body.dateUS != null || req.body.dateUS != undefined) {
            week = date_to_weekUS(req.body.dateUS);
        }
        else if (req.body.date != null || req.body.date != undefined) {
            week = date_to_week(req.body.date);
        }
        else if (req.body.dateJS != null || req.body.dateJS != undefined) {
            week = date_to_weekJS(req.body.dateJS);
        }
        else{
            res.status(400).json({err: "I need a valid date"})
            return
        }
        const cr_f_cursor = cr_forecast.find({"_id": week });
        await cr_f_cursor.forEach(function(data) {entries.push(data)});
        entries.forEach(element =>  res.json(element));
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: err});
    }
    if(client.isConnected()){
        await client.close();
    }
}

exports.Nic_forecast = async (req, res) => {
    const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
    if(!client.isConnected()){
        await client.connect();
    }
    try {
        var entries = [];
        await client.connect();
        const n_client = client.db("Nicaragua");
        const n_forecast = n_client.collection("Forecast");
        var week = ""
        if (req.body.dateUS != null || req.body.dateUS != undefined) {
            week = date_to_weekUS(req.body.dateUS);
        }
        else if (req.body.date != null || req.body.date != undefined) {
            week = date_to_week(req.body.date);
        }
        else if (req.body.dateJS != null || req.body.dateJS != undefined) {
            week = date_to_weekJS(req.body.dateJS);
        }
        else{
            res.status(400).json({err: "I need a valid date"})
            return
        }
        const n_f_cursor = n_forecast.find({ "_id": week});
        await n_f_cursor.forEach(function(data) {entries.push(data)});
        entries.forEach(element =>  res.json(element));
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: err});
    }
    if(client.isConnected()){
        await client.close();
    }
}

exports.ElSalv_forecast = async (req, res) => {
    const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
    if(!client.isConnected()){
        await client.connect();
    }
    try {
        var entries = [];
        await client.connect();
        const el_client = client.db("El_Salvador");
        const el_forecast = el_client.collection("Forecast");
        var week = ""
        if (req.body.dateUS != null || req.body.dateUS != undefined) {
            week = date_to_weekUS(req.body.dateUS);
        }
        else if (req.body.date != null || req.body.date != undefined) {
            week = date_to_week(req.body.date);
        }
        else if (req.body.dateJS != null || req.body.dateJS != undefined) {
            week = date_to_weekJS(req.body.dateJS);
        }
        else{
            res.status(400).json({err: "I need a valid date"})
            return
        }
        const el_f_cursor = el_forecast.find({ "_id": week});
        await el_f_cursor.forEach(function(data) {entries.push(data)});
        entries.forEach(element =>  res.json(element));
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: err});
    }
    if(client.isConnected()){
        await client.close();
    }
}