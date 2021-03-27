const axios = require('axios').default
const { getRandomInt } = require('./lib/getRandomInt')

const request = axios.create({
    headers: { 'trakt-api-key': process.env.TRAKT_API_KEY },
    baseURL: `https://api.trakt.tv`
})

request.interceptors.request.use(config => {
    const key = getRandomInt(1, 2)
    config.headers['trakt-api-key'] = process.env[`TRAKT_API_KEY${key}`]
    return config
})

async function traktMovies(movie) {
    const baseData = (await request.get(`/search/tmdb/${movie.id}`, { params: { type: 'movie' }, })).data
    if (!baseData[0]) {
        console.log(`Movie ${movie.id} not found in Trakt`);
        return null
    }
    const traktId = baseData[0].movie.ids.trakt

    const aliases = (await request.get(`/movies/${traktId}/aliases`)).data
    const releases = (await request.get(`/movies/${traktId}/releases`)).data
    const translations = (await request.get(`/movies/${traktId}/translations`)).data
    const people = (await request.get(`/movies/${traktId}/people/`)).data
    const ratings = (await request.get(`/movies/${traktId}/ratings/`)).data
    const relatedMovies = (await request.get(`/movies/${traktId}/related/`)).data
    const stats = (await request.get(`/movies/${traktId}/stats/`)).data
    // This contains PII, dont wanna expose that, just the amount of people watching is fine
    const watching = (await request.get(`/movies/${traktId}/watching/`)).data.length


    return {
        base: baseData[0].movie,
        aliases,
        releases,
        translations,
        people,
        ratings,
        relatedMovies,
        stats,
        watching
    }
}


async function traktTv(show) {
    const baseData = (await request.get(`/search/tmdb/${show.id}`, { params: { type: 'show' }, })).data
    if (!baseData[0]) {
        console.log(`Movie ${show.id} not found in Trakt`);
        return null
    }
    const traktId = baseData[0].show.ids.trakt

    const aliases = (await request.get(`/shows/${traktId}/aliases`)).data
    const translations = (await request.get(`/shows/${traktId}/translations`)).data
    const people = (await request.get(`/shows/${traktId}/people/`)).data
    const ratings = (await request.get(`/shows/${traktId}/ratings/`)).data
    const relatedMovies = (await request.get(`/shows/${traktId}/related/`)).data
    const stats = (await request.get(`/shows/${traktId}/stats/`)).data
    //This contains PII, dont wanna expose that, just the amount of people watching is fine
    const watching = (await request.get(`/shows/${traktId}/watching/`)).data.length

    return {
        base: baseData[0].movie,
        aliases,
        translations,
        people,
        ratings,
        relatedMovies,
        stats,
        watching
    }
}

module.exports = {
    traktMovies: traktMovies,
    traktTv: traktTv
}