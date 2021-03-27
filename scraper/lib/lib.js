const axios = require('axios').default
const { traktTv, traktMovies } = require('../trakt');
const fs = require('fs')

const logstash = {
    send: async (data) => {
        return axios.post(process.env.LOGSTASH_URL,
            JSON.stringify(data),
            {
                headers:
                {
                    'Content-Type': 'application/json'
                }
            });
    }
}

async function wait(seconds = 30) {
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

        if (element.name) {
            element.title = element.name
        }

        if (element.title) {
            element.name = element.title
        }

        element.videoType = type
        if (process.env.DEBUG) {
            fs.writeFileSync(`./data/movies/${element.id}.json`, JSON.stringify(element, null, 4))
        } else {
            await logstash.send(element)
        }
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
    store,
    TYPES,
}