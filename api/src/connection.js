var elasticsearch = require("elasticsearch")

var esclient = new elasticsearch.Client({
    host: '127.0.0.1:9200'
});

module.exports = esclient;