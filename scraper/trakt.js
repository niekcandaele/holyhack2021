const axios = require('axios').default


const request = axios.create({
    headers: { 'trakt-api-key': process.env.TRAKT_API_KEY },
    baseURL: `https://api.trakt.tv`
})

module.exports = async function trakt(movie) {
    const baseData = (await request.get(`/search/tmdb/${movie.id}`, { params: { type: 'movie' }, })).data
    console.log(baseData[0].movie);
    if (!baseData[0]) {
        console.log(`Movie ${movie.id} not found in Trakt`);
        return null
    }
    const traktId = baseData[0].movie.ids.trakt

    const aliases = (await request.get(`/movies/${traktId}/aliases`)).data
    const releases = (await request.get(`/movies/${traktId}/releases`)).data
    const translations = (await request.get(`/movies/${traktId}/translations`)).data
    const lists = (await request.get(`/movies/${traktId}/lists/all/popular`)).data
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
        lists,
        people,
        ratings,
        relatedMovies,
        stats,
        watching
    }
}