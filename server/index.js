const request = require('request')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const https = require('https')
const rp = require('request-promise')
const promise = require('bluebird')

const routesAuth = require('./routers/auth')
const routesPrivate = require('./routers/private')
const routerSearch = require('../routes/search')

const app = express()

app.use(express.static( path.join(__dirname + '../public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json() );

app.get('/', (req, res) => res.send(`Hello! The API is at http://localhost:${PORT}/api`) )
app.use('/api', routerSearch)
app.use('/api', routesAuth );
app.use('/private', routesPrivate );

module.exports = app