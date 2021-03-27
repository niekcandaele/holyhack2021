const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const { queryAll, countType, getTopVideos } = require('./queries/query');
const { getGenres, countGenres } = require('./queries/genre')

router.get('/', (req, res) => {
    res.send('GET test request');
});

router.post('/query_movies', bodyParser.json(), async (req, res) => {
    await queryAll(req, res, 'movies');
});

router.get('/genres', async (req, res) => {
    await getGenres(req, res, 'movies');
});


router.get('/query/count/:type', bodyParser.json(), async (req, res) => {
    await countType(req, res, 'movies', req.params.type);
});

router.get('/query/top/:type', bodyParser.json(), async (req, res) => {
    await getTopVideos(req, res, 'movies', req.params.type, req.query.size);
});

module.exports = router;