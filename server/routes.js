const express = require('express');
const query_data = require('./server')

const router = express.Router();

router.get('/QueryData', (req, res) => {
    res.json(query_data)})

module.exports = router;