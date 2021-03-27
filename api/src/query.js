const esclient = require('./connection');

query = async (req, res, idx) => {
    if (!req.body || !req.body.query) {
        console.log(req.headers);
        console.log(req.body);
        res.status(400);
        res.json({
            error: 'Bad request',
            message: 'Missing parameter: body.query',
            statuscode: 400
        });
        return;
    }
    console.log(req.body);

    try {
        const response = await esclient.search({
            index: idx,
            body: {
                query: req.body.query
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

module.exports = query;