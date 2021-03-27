const esclient = require('../connection');
const esb = require('elastic-builder');

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

const getTopVideos = async (req, res, idx, type, size) => {
    try {
        const response = await esclient.search({
            index: idx,
            body: {
                "_source": ["title", "name", "popularity", "release_date", "genres.name"],
                "sort": [
                    {
                        "popularity": {
                        "order": "desc"
                        }
                    }
                ],
                "query": {
                  "match": {
                    "videoType": type
                  }
                },
                "size": size
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

module.exports = {
    queryAll: queryAll,
    countType: countType,
    getTopVideos
}