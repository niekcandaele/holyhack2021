const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

const { queryAll, countType, queryType } = require('./queries/query');
const { getGenres, countGenres } = require('./queries/genre')

router.get('/', (req, res) => {
    res.send('GET test request');
});

router.post('/query_movies', bodyParser.json(), async (req, res) => {
    await queryAll(req, res, 'movies');
});

router.get('/genres', async (req, res) =>  {
    await getGenres(req, res, 'movies');
});

/*
// query: { match: {} }, field: videotype
router.get('/query/count', bodyParser.json(), async (req, res) => {
    await countType(req, res, 'movies');
});

// 
router.get('/movies',bodyParser.json(), async (req, res) => {
    await query(req, res, 'movies');
});

// 
router.get('/shows',bodyParser.json(), async (req, res) => {
    await query(req, res, 'movies');
});

// 
router.get('/genres', async (req, res) => {
    await getGenres(req, res);
});

router.get('/genres/count', async (req, res) => {
    await countGenres(req, res);
});*/

module.exports = router;