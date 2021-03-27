const esclient = require('../connection');

const updateOverview = async (req, res, idx, id) => {
    if (!req.body) {
        res.status(400);
        res.json({
            error: 'Bad request',
            message: 'Missing parameter: body.overview',
            statuscode: 400
        });
        return;
    }
    try {
        await esclient.update({
            index: idx,
            id: id,
            body: {
                doc: req.body
            }
        });
        res.json(`Updated item ${id}`);
    } catch (e) {
        res.status(e.statuscode || 500);
        res.json({
            error: e.name,
            message: e.message,
            statusCode: e.statusCode || 500
        });
    }
}

module.exports = {
    updateOverview: updateOverview
}