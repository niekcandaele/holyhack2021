const axios = require('axios').default
const { traktTv } = require('./trakt');
const fs = require('fs');
const { wait, logstash, store } = require('./lib');
const baseUrlMovieDB = `https://api.themoviedb.org/3`;



async function getAllShows(iterations) {
    let currentCursor = 1

    while (currentCursor < iterations) {
        console.log(`Getting movies page ${currentCursor}`);
        const res = await getTv(currentCursor)

        // Empty response, end the loop
        if (!res.data.results.length) {
            currentCursor = iterations
        }

        await store(res.data.results, 'shows')

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