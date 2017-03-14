const fs = require('fs')
const request = require('request')
const express = require('express')
const cheerio = require('cheerio')
const bodyParser = require('body-parser')
const https = require('https')
const rp = require('request-promise')
const promise = require('bluebird')

const app = express()
const PORT = process.env.PORT || 3000

const urlCI = 'https://www.elcorteingles.es/search/?s=[KEYWORD]'
const urlCarref = 'http://www.carrefour.es/global/?Dy=1&Nty=1&Ntt=[KEYWORD]&search='
const urlFnac = 'http://busqueda.fnac.es/SearchResult/ResultList.aspx?SCat=0%211&Search=[KEYWORD]&sft=1&sa=0'
const url = "https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=ErnestoP-clickcou-PRD-e6c385072-30fa6fdb&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=[KEYWORD]&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-ES&siteid=186"
const imgNoDisp = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeRMkxYTjrreUnillHK0czA3SxIxQ9j8p7lhlStLRVut0lyGW3dQ'


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.post('/api/search', function(req, res) {

    const searchProduct = req.body.searchQuery
    const COUrl = urlCI.replace('[KEYWORD]', searchProduct)
    const carrefUrl = urlCarref.replace('[KEYWORD]', searchProduct)
    const fnacUrl = urlFnac.replace('[KEYWORD]', searchProduct)
    const ebayUrl = url.replace('[KEYWORD]', searchProduct)


    const getPromiseElCorteIngles = () => {

        let productsFound = []

        return rp(COUrl).then(body => {

            var $ = cheerio.load(body);

            $('ul.product-list.4 li').each(function(i, elem) {

                const image = $(this).find('img.c12').attr('src') || imgNoDisp
                const price = $(this).find('span.current').text()+ ' - ' || ' No Available'
                const description = $(this).find('a.js-product-click').text()
                const link = $(this).find('a.event').attr('href')

                productsFound.push({ image, price, description, link })

            })

            console.log(productsFound + ', ' + 'corte Ingles')

            return productsFound
        })

    }

    function getPromiseCarrefour() {

        let productsFound = []

        return rp(carrefUrl).then(body => {

            var $ = cheerio.load(body)

            $('div.producto').each(function(i, elem) {

                const image = $(this).find('img.img-producto').attr('src') || imgNoDisp
                const price = $(this).find('p.precio-nuevo').text() + ' - ' || ' No Available'
                const description = $(this).find('h2.titular-producto').text()
                const link = $(this).find('a.track-click.imagenes-productos.enlace-producto').attr('href')

                productsFound.push({ image, price, description, link })

            })

            console.log(productsFound + ', ' + 'carrefour')

            return productsFound

        })

    }


    function getPromiseFnac() {

        let productsFound = []

        return rp(fnacUrl).then(body => {

            var $ = cheerio.load(body)

            $('li.clearfix.Article-item').each(function(i, elem) {

                const image = $(this).find('img').attr('src') || imgNoDisp
                const price = $(this).find('a.userPrice').text() + ' - ' || ' No Available'
                const description = $(this).find('a.js-minifa-title').text()
                const link = $(this).find('a.js-minifa-title').attr('href')

                productsFound.push({ image, price, description, link })

            })

            console.log(productsFound + ', ' + 'Fnac')

            return productsFound
        })

    }

    function getPromiseEbay() {

        let productsFound = []

        return rp(ebayUrl).then(data => {

            let parsedData = data.replace("/**/_cb_findItemsByKeywords(", "")
            parsedData = parsedData.replace("})", "}")
            parsedData = JSON.parse(parsedData)

            productsFound.push(parsedData)

            return productsFound
        })
        console.log(productsFound + ', ' + 'ebay')


    }

    Promise.all([getPromiseElCorteIngles(), getPromiseFnac(), getPromiseCarrefour(), getPromiseEbay()])
        .then(results => {

            const allPromises = { results }

            res.json(allPromises)
        })
        .catch(error => {

            console.log('loading failed')
        })

})


app.listen(PORT, () => console.log(`listening on PORT ${ PORT }...`))


