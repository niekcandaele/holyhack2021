const axios = require('axios').default
const Logstash = require('logstash-client')
require('dotenv').config()
const baseUrl = `https://api.themoviedb.org/3`;

const logstash = new Logstash({
    type: 'tcp',
    host: 'ergens',
    port: 1337
})


async function storeMovies(movies) {
    for (const movie of movies) {
        console.log(`Storing movie ${movie.title}`);
        await logstash.send(movie)
    }
}

async function getAllMovies() {
    let currentCursor = 1

    while (currentCursor < 100) {
        console.log(`Getting movies page ${currentCursor}`);
        const res = await getMovies(currentCursor)
        await storeMovies(res.data.results)
        currentCursor++
        await wait()
    }
}


async function getMovies(page) {
    return axios.get(`${baseUrl}/discover/movie`, {
        params: {
            sort_by: 'primary_release_date.desc',
            page,
            api_key: process.env.TMDB_API_KEY,
        }
    })
}

getAllMovies()



async function wait(seconds = 1) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, seconds * 1000)
    })
}