const axios = require('axios').default
const Redis = require("ioredis");
const { traktTv, traktMovies } = require('./trakt');
const redis = new Redis();

const logstash = {
    send: async (data) => {
        return axios.post(process.env.LOGSTASH_URL, JSON.stringify(data));
    }
}

async function wait(seconds = 5) {
    // Reeee rate limits
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, seconds * 1000)
    })
}


async function store(data, type) {
    for (let element of data) {

        if (type === 'movie') {
            console.log(`Storing ${element.title}`);
            const traktData = await traktMovies(element)
            element.trakt = traktData

        } else {
            console.log(`Storing ${element.name}`);
            const traktData = await traktTv(element)
            element.trakt = traktData
        }


        if (process.env.DEBUG) {
            fs.writeFileSync(`./data/movies/${element.id}.json`, JSON.stringify(element, null, 4))
        }

        await logstash.send(element)
    }
}

module.exports = {
    wait,
    logstash,
    redis,
    store
}