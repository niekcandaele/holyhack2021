const express = require('express');
const elastic = require('elasticsearch')

const router = express.Router();
const esclient = require('./connection');

const query = require('./query')

router.get('/', (req, res) => {
    res.send('GET test request');
});

router.get('/query', async (req, res) => {
    await query(req, res);
});

module.exports = router;