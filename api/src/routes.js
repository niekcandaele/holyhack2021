const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const query = require('./query');

router.get('/', (req, res) => {
    res.send('GET test request');
});

router.post('/query_movies', bodyParser.json(), async (req, res) => {
    await query(req, res, 'movies');
});

router.post('/query_shows',bodyParser.json(), async (req, res) => {
    await query(req, res, 'shows');
});

module.exports = router;