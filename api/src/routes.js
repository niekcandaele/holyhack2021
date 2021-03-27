const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const { queryAll, countType, getTopVideos, totalRuntime } = require('./queries/query');
const { countGenres } = require('./queries/genre')
const { updateOverview } = require('./queries/update');

router.get('/', (req, res) => {
    res.send('GET test request');
});

router.post('/query_movies', bodyParser.json(), async (req, res) => {
    await queryAll(req, res, 'movies');
});

router.get('/genres/count/:name', async (req, res) => {
    await countGenres(req, res, 'movies', req.params.name); 
});

router.get('/query/count/:type', bodyParser.json(), async (req, res) => {
    await countType(req, res, 'movies', req.params.type);
});

router.get('/query/top/:type', bodyParser.json(), async (req, res) => {
    await getTopVideos(req, res, 'movies', req.params.type, req.query.size);
});

router.put('/update', bodyParser.json(), async (req, res) => {
    await updateOverview(req, res, 'movies', req.query.id);
});

router.get('/total-runtime', bodyParser.json(), async (req, res) => {
    await totalRuntime(req, res, 'movies');
});

module.exports = router;