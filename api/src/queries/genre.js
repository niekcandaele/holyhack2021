const esclient = require('../connection');
const eb = require('elastic-builder');
const esb = require('elastic-builder');

const getGenres = async (req, res, idx) => {
    const requestBody = new esb.RequestBodySearch().agg(
        new esb.TermsAggregation('genres', 'genres')
    );

    try {
        const response = await esclient.search({
            index: idx,
            body: requestBody.toJSON()
        });
        console.log(response.hit.hit)
        res.json(response.hit.hit);
    } catch (e) {
        res.status(e.statuscode || 500);
        res.json({
            error: e.name,
            message: e.message,
            statusCode: e.statusCode || 500
        });
    }
};

const countGenres = async (req, res, idx, name) => {
    try {
        console.log(name);
        const response = await esclient.count({
            index: idx,
            body: {
                    query: {
                        "match": {
                            "genre.name": name
                        }
                    }
                }
        });
        console.log(response)
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

module.exports = {
    getGenres: getGenres,
    countGenres: countGenres
}