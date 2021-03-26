const axios = require('axios').default
const { traktTv } = require('./trakt');
const fs = require('fs');
const { wait, logstash } = require('./lib');
const baseUrlMovieDB = `https://api.themoviedb.org/3`;

async function storeTv(shows) {
    for (let show of shows) {
        console.log(`Storing tv show ${show.name}`);
        const traktData = await traktTv(show)
        console.log(traktData);
        show.trakt = traktData
        console.log(show);

        if (process.env.DEBUG) {
            fs.writeFileSync(`./data/shows/${show.id}.json`, JSON.stringify(show, null, 4))
        }

        await logstash.send(show)
    }
}

async function getAllShows() {
    let currentCursor = 1

    while (currentCursor < 100) {
        console.log(`Getting movies page ${currentCursor}`);
        const res = await getTv(currentCursor)
        await storeTv(res.data.results)
        currentCursor++
        await wait()
    }
}


async function getTv(page) {
    return axios.get(`${baseUrlMovieDB}/discover/tv`, {
        params: {
            sort_by: 'popularity.desc',
            page,
            api_key: process.env.TMDB_API_KEY,
        }
    })
}

module.exports.getAllShows = getAllShows