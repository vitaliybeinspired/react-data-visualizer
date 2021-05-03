const MongoClient = require('mongodb').MongoClient;
const {date_to_week, date_to_weekUS, date_to_weekJS, date_rangeUS}  = require('../date_to_week');

// status codes:
// Informational responses (100–199)
// Successful responses (200–299)
// Redirects (300–399)
// Client errors (400–499)
// Server errors (500–599)

//Database UserName: REACT
//Database password: WattTime2021
const MONGODB_URI = 'mongodb+srv://REACT:WattTime2021@cluster0.tbh2o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

exports.CostaRica = async (req, res) => {
    const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
    if(!client.isConnected()){
        await client.connect();
    }
    try {
        var h_entries = [];
        var f_entries = [];
        let cr_client = client.db("Costa_Rica");
        let cr_historic = cr_client.collection("Historic");
        let cr_forecast = cr_client.collection("Forecast");
        //date range
        if(req.body.date_range != null || req.body.date_range != undefined){
            let weeks = date_rangeUS(req.body.date_range[0], req.body.date_range[1])
            for(var i = 0; i < weeks.length; ++i){
                let week = weeks[i];
                let cr_h_cursor = cr_historic.find({"_id": week });
                await cr_h_cursor.forEach(function(data) {h_entries.push(data)});
                let cr_f_cursor = cr_forecast.find({"_id": week });
                await cr_f_cursor.forEach(function(data) {f_entries.push(data)});
            }
        }
        //single date selection
        else{
            let week = ""
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
            await cr_h_cursor.forEach(function(data) {h_entries.push(data)});
            let cr_f_cursor = cr_forecast.find({"_id": week });
            await cr_f_cursor.forEach(function(data) {f_entries.push(data)});
        }
        //clean-up
        var h_output = {}
        var f_output = {}
        for (let index = 0; index < h_entries.length; ++index) {
            delete h_entries[index]['_id']
            h_output = Object.assign({}, h_output, h_entries[index]);
        }
        for (let index = 0; index < f_entries.length; ++index) {
            delete f_entries[index]['_id']
            f_output = Object.assign({}, f_output, f_entries[index]);
        }
        res.json({'Historic' : h_output, 'Forecast' : f_output})
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: err});
    }
    if(client.isConnected()){
        await client.close();
    }
}

exports.Nicaragua = async (req, res) => {
    const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
    if(!client.isConnected()){
        await client.connect();
    }
    try {
        var h_entries = [];
        var f_entries = [];
        await client.connect();
        const n_client = client.db("Nicaragua");
        const n_historic = n_client.collection("Historic");
        const n_forecast = n_client.collection("Forecast");
        //date range
        if(req.body.date_range != null || req.body.date_range != undefined){
            let weeks = date_rangeUS(req.body.date_range[0], req.body.date_range[1])
            for(var i = 0; i < weeks.length; ++i){
                let week = weeks[i];
                let n_h_cursor = n_historic.find({"_id": week });
                await n_h_cursor.forEach(function(data) {h_entries.push(data)});
                let n_f_cursor = n_forecast.find({"_id": week });
                await n_f_cursor.forEach(function(data) {f_entries.push(data)});
            }
        }
        //single date selection
        else{
            let week = ""
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
            let n_h_cursor = n_historic.find({ "_id": week});
            await n_h_cursor.forEach(function(data) {h_entries.push(data)});
            let n_f_cursor = n_forecast.find({"_id": week });
            await n_f_cursor.forEach(function(data) {f_entries.push(data)});
        }
        //clean-up
        var h_output = {}
        var f_output = {}
        for (let index = 0; index < h_entries.length; ++index) {
            delete h_entries[index]['_id']
            h_output = Object.assign({}, h_output, h_entries[index]);
        }
        for (let index = 0; index < f_entries.length; ++index) {
            delete f_entries[index]['_id']
            f_output = Object.assign({}, f_output, f_entries[index]);
        }
        res.json({'Historic' : h_output, 'Forecast' : f_output})
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: err});
    }
    if(client.isConnected()){
        await client.close();
    }
}

exports.ElSalvador = async (req, res) => {
    const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
    if(!client.isConnected()){
        await client.connect();
    }
    try {
        var h_entries = [];
        var f_entries = [];
        await client.connect();
        const el_client = client.db("El_Salvador");
        const el_historic = el_client.collection("Historic");
        const el_forecast = el_client.collection("Forecast");
        //date range
        if(req.body.date_range != null || req.body.date_range != undefined){
            let weeks = date_rangeUS(req.body.date_range[0], req.body.date_range[1])
            for(var i = 0; i < weeks.length; ++i){
                let week = weeks[i];
                let el_h_cursor = el_historic.find({"_id": week });
                await el_h_cursor.forEach(function(data) {h_entries.push(data)});
                let el_f_cursor = el_forecast.find({"_id": week });
                await el_f_cursor.forEach(function(data) {f_entries.push(data)});
            }
        }
        //single date selection
        else{
            let week = ""
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
            let el_h_cursor = el_historic.find({"_id": week });
            await el_h_cursor.forEach(function(data) {h_entries.push(data)});
            let el_f_cursor = el_forecast.find({"_id": week });
            await el_f_cursor.forEach(function(data) {f_entries.push(data)});
        }
        //clean-up
        var h_output = {}
        var f_output = {}
        for (let index = 0; index < h_entries.length; ++index) {
            delete h_entries[index]['_id']
            h_output = Object.assign({}, h_output, h_entries[index]);
        }
        for (let index = 0; index < f_entries.length; ++index) {
            delete f_entries[index]['_id']
            f_output = Object.assign({}, f_output, f_entries[index]);
        }
        res.json({'Historic' : h_output, 'Forecast' : f_output})
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: err});
    }
    if(client.isConnected()){
        await client.close();
    }
}

exports.Mexico = async (req, res) => {
    const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
    if(!client.isConnected()){
        await client.connect();
    }
    try{
        var h_entries = [];
        await client.connect();
        const m_client = client.db("Mexico");
        const m_historic = m_client.collection("Historic");
        //date range
        if(req.body.date_range != null || req.body.date_range != undefined){
            let weeks = date_rangeUS(req.body.date_range[0], req.body.date_range[1])
            for(var i = 0; i < weeks.length; ++i){
                let week = weeks[i];
                const m_h_cursor = m_historic.find({"_id": week });
                await m_h_cursor.forEach(function(data) {h_entries.push(data)});
            }
        }
        //single date selection
        else{
            let week = ""
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
        }
        //clean-up
        var h_output = {}
        for (let index = 0; index < h_entries.length; ++index) {
            delete h_entries[index]['_id']
            h_output = Object.assign({}, h_output, h_entries[index]);
        }
        res.json({'Historic' : h_output, 'Forecast': null})
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(500).json({err: err});
    }
    if(client.isConnected()){
        await client.close();
    }
}