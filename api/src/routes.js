const express = require('express');
const elastic = require('elasticsearch');

const router = express.Router();
const esclient = require('./connection');

const query = require('./query');

router.get('/', (req, res) => {
    res.send('GET test request');
});

router.get('/query_movies', async (req, res) => {
    await query(req, res, 'movies');
});

router.get('/query_shows', async (req, res) => {
    await query(req, res, 'shows');
});

module.exports = router;