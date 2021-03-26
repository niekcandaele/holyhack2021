require('dotenv').config()
const { getAllMovies } = require('./movies')
const { getAllShows } = require('./shows')



getAllMovies()
getAllShows()