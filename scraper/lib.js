const axios = require('axios').default
const Redis = require("ioredis");
const { traktTv, traktMovies } = require('./trakt');
const redis = new Redis({ host: process.env.REDIS_HOST });

const logstash = {
    send: async (data) => {
        return axios.post(process.env.LOGSTASH_URL, JSON.stringify(data));
    }
}

async function wait(seconds = 10) {
    // Reeee rate limits
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, seconds * 1000)
    })
}


async function store(data, type) {
    const promises = data.map(async (element) => {
        if (type === TYPES.MOVIE) {
            console.log(`Storing ${type} ${element.title}`);
            const traktData = await traktMovies(element)
            element.trakt = traktData

        } else {
            console.log(`Storing ${type} ${element.name}`);
            const traktData = await traktTv(element)
            element.trakt = traktData
        }


        if (process.env.DEBUG) {
            fs.writeFileSync(`./data/movies/${element.id}.json`, JSON.stringify(element, null, 4))
        }

        await logstash.send(element)
    });

    return Promise.all(promises)
}

const TYPES = {
    MOVIE: 'movie',
    SHOW: 'show'
}

module.exports = {
    wait,
    logstash,
    redis,
    store,
    TYPES
}