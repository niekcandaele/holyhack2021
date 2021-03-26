const express = require('express');
const elastic = require('elasticsearch')

const router = express.Router();
const esclient = require('./connection');

const query = require('./query')

router.get('/', (req, res) => {
    res.send('GET test request');
});

module.exports = router;