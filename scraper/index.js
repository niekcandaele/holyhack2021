require('dotenv').config()
const { getAllMovies } = require('./movies')
const { getAllShows } = require('./shows')

// Get this many pages of objects, or until empty responses
const iterations = 500

getAllMovies(iterations)
getAllShows(iterations)