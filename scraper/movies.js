const axios = require('axios').default
const { traktMovies } = require('./trakt');
const fs = require('fs');
const { wait, logstash } = require('./lib');
const baseUrlMovieDB = `https://api.themoviedb.org/3`;

async function storeMovies(movies) {
    for (let movie of movies) {
        console.log(`Storing movie ${movie.title}`);
        const traktData = await traktMovies(movie)
        console.log(traktData);
        movie.trakt = traktData
        console.log(movie);

        if (process.env.DEBUG) {
            fs.writeFileSync(`./data/movies/${movie.id}.json`, JSON.stringify(movie, null, 4))
        }

        await logstash.send(movie)
    }
}

async function getAllMovies(iterations) {
    let currentCursor = 1

    while (currentCursor < iterations) {
        console.log(`Getting movies page ${currentCursor}`);
        const res = await getMovies(currentCursor)

        // Empty response, end the loop
        if (!res.data.results.length) {
            currentCursor = iterations
        }

        await storeMovies(res.data.results)
        currentCursor++
        await wait()
    }
}


async function getMovies(page) {
    return axios.get(`${baseUrlMovieDB}/discover/movie`, {
        params: {
            sort_by: 'popularity.desc',
            page,
            api_key: process.env.TMDB_API_KEY,
        }
    })
}

module.exports.getAllMovies = getAllMovies