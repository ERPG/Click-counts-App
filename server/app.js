const request = require('request')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const https = require('https')
const rp = require('request-promise')

const routesAuth = require('./routers/auth')
const routesPrivate = require('./routers/private')
const routerSearch = require('../routes/search')

const app = express()
const pathPublic = path.join(__dirname + '/../public')

app.use(express.static( pathPublic ));

console.log(`Serving static files from: ${pathPublic}`)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json() );

app.use('/api', routerSearch);
app.use('/api', routesAuth );
app.use('/private', routesPrivate );

module.exports = app