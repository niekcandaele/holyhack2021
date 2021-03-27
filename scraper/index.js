require('dotenv').config()
const { wait, store, TYPES, redis } = require('./lib');
const baseUrlMovieDB = `https://api.themoviedb.org/3`;
const axios = require('axios').default

// Get this many pages of objects, or until empty responses
const iterations = 500

getAll(TYPES.MOVIE)
getAll(TYPES.SHOW)

async function getAll(type) {
    let currentCursor = 1

    while (currentCursor < iterations) {
        try {
            console.log(`Getting ${type} page ${currentCursor}`);
            const res = await get(currentCursor, type)
            currentCursor++

            if (!res) {
                // No data returned, skipping this page
                continue
            }

            // Empty response, end the loop
            if (!res.data.results.length) {
                currentCursor = iterations
            }

            await store(res.data.results, type)
            await wait()
            await redis.set(`${type}:${currentCursor}`, true);
        } catch (error) {
            if (process.env.DEBUG) {
                console.log(error);
            }
            console.log('Something went wrong! Lets continue after waiting a bit :)');
            console.log(error.message);
            await wait(30)
        }

    }
}


async function get(page, type) {

    const exists = await redis.exists(`${type}:${page}`)
    if (exists) {
        console.log(`${type}:${page} already exists, skipping.`);
        return
    }


    switch (type) {
        case TYPES.MOVIE:
            return axios.get(`${baseUrlMovieDB}/discover/movie`, {
                params: {
                    sort_by: 'popularity.desc',
                    page,
                    api_key: process.env.TMDB_API_KEY,
                }
            })
        case TYPES.SHOW:
            return axios.get(`${baseUrlMovieDB}/discover/tv`, {
                params: {
                    sort_by: 'popularity.desc',
                    page,
                    api_key: process.env.TMDB_API_KEY,
                }
            })
        default:
            throw new Error('invalid type')
    }


}