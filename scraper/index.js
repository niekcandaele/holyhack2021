require('dotenv').config()
const { wait, store, TYPES, redis } = require('./lib/lib');
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

            res.data.results = res.data.results.map(async element => {
                const details = await getDetails(element.id, type)
                return Object.assign(element, details.data)
            })


            res.data.results = await Promise.all(res.data.results)

            await store(res.data.results, type)
            await wait()
        } catch (error) {
            if (process.env.DEBUG) {
                console.log(error);
            }
            console.log('Something went wrong! Lets continue after waiting a bit :)');
            console.log(error.message);
            await wait(300)
        }

    }
}

async function getDetails(id, type) {
    console.log(`Getting details for ${type} ${id}`)
    switch (type) {
        case TYPES.MOVIE:
            return axios.get(`${baseUrlMovieDB}/movie/${id}`, {
                params: {
                    api_key: process.env.TMDB_API_KEY,
                }
            })
        case TYPES.SHOW:
            return axios.get(`${baseUrlMovieDB}/tv/${id}`, {
                params: {
                    api_key: process.env.TMDB_API_KEY,
                }
            })
        default:
            throw new Error('invalid type')
    }

}

async function get(page, type) {
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