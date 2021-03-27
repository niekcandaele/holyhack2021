const esclient = require('../connection');
const esb = require('elastic-builder');

const queryType = async (req, res, idx) => {
    if (!req.query || !req.query.type || !req.query.query) {
        console.log(req.body);
        res.status(400);
        res.json({
            error: 'Bad request',
            message: 'Missing parameter: body.query',
            statuscode: 400
        });
        return;
    }
    console.log(req.query);
    try {
        const response = await esclient.search({
            index: idx,
            body: {
                query: req.query.query,
                aggs: {
                    type: {
                        terms: {
                            field: JSON.parse(req.query.type)
                        }
                    }
                }
            }
        });
        res.json(response.hits.hits);
    } catch (e) {
        res.status(e.statuscode || 500);
        res.json({
            error: e.name,
            message: e.message,
            statusCode: e.statusCode || 500
        });
    }
};

const countType = async (req, res, idx, type) => {
    try {
        const response = await esclient.count({
            index: idx,
            body: {
                query: {
                    "match": {
                        "videoType": type
                    }
                }
            }
        });
        res.json(response.count);
    } catch (e) {
        res.status(e.statuscode || 500);
        res.json({
            error: e.name,
            message: e.message,
            statusCode: e.statusCode || 500
        });
    }
};

const queryAll = async (req, res, idx) => {
    if (!req.body || !req.body.query) {
        console.log(req.body);
        res.status(400);
        res.json({
            error: 'Bad request',
            message: 'Missing parameter: body.query',
            statuscode: 400
        });
        return;
    }
    try {
        const response = await esclient.search({
            index: idx,
            body: {
                query: req.body.query,
            }
        });
        res.json(response.hits.hits);
    } catch (e) {
        res.status(e.statuscode || 500);
        res.json({
            error: e.name,
            message: e.message,
            statusCode: e.statusCode || 500
        });
    }
};

const getMovies = async (req, res, idx) => {
    const responseBody = esb.mat
};


module.exports = {
    queryType: queryType,
    queryAll: queryAll,
    countType: countType
}