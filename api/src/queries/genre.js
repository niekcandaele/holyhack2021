const esclient = require('../connection');
const eb = require('elastic-builder');
const esb = require('elastic-builder');

const queryGenres = {
    aggs: {
        genres: {
            terms: {
                field: "genres"
            }
        }
    }
};

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

const countGenres = async (req, res, idx) => {
    try {
        const response = await esclient.count({
            index: idx,
            body: queryGenres
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

module.exports = {
    getGenres: getGenres,
    countGenres: countGenres
}