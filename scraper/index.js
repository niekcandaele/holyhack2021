require('dotenv').config()
const { getRandomInt } = require('./lib/getRandomInt');
const { wait, store, TYPES } = require('./lib/lib');
const axios = require('axios').default


const request = axios.create({
    baseURL: `https://api.themoviedb.org/3`
})

request.interceptors.request.use(config => {
    const key = getRandomInt(1, 2)
    if (!config.params) {
        config.params = {}
    }

    config.params['api_key'] = process.env[`TMDB_API_KEY${key}`]
    return config
})


// Get this many pages of objects, or until empty responses
const iterations = 500


async function main() {

    if (!process.env.DEBUG) {
        // This can be smarter but ¯\_(ツ)_/¯
        console.log(`Waiting 60 seconds before starting so logstash & es are booted fully`);
        await wait(60)
    }

    getAll(TYPES.MOVIE)
    getAll(TYPES.SHOW)
}

main()

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
            return request(`/movie/${id}`)
        case TYPES.SHOW:
            return request(`/tv/${id}`)
        default:
            throw new Error('invalid type')
    }

}

async function get(page, type) {
    switch (type) {
        case TYPES.MOVIE:
            return request(`/discover/movie`, {
                params: {
                    sort_by: 'popularity.desc',
                    page,
                }
            })
        case TYPES.SHOW:
            return request(`/discover/tv`, {
                params: {
                    sort_by: 'popularity.desc',
                    page,
                }
            })
        default:
            throw new Error('invalid type')
    }


}