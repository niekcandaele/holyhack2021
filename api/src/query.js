const esclient = require('./connection');

query = async (req, res) => {
    if (!req.body.query) {
        res.status(400);
        res.json({
            error: 'Bad request',
            message: 'Missing parameter <body.query>',
            statuscode: 400
        });
        return;
    }

    try {
        const response = await esclient.search({
            index: 'idx',
            body: {
                query: JSON.parse(req.body.query)
            }
        });
        res.json(response.body);
    } catch (e) {
        res.status(e.statuscode || 500);
        res.json({
            error: e.name,
            message: err.message,
            statusCode: err.statusCode || 500
        });
    }
};

module.exports = query;