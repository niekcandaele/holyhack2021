var elasticsearch = require("elasticsearch")

var esclient = new elasticsearch.Client({
    host: 'es01:9200'
});

module.exports = esclient;