const getPromiseEbay = require('./providers/ebay')
const getPromiseCarrefour = require('./providers/carrefour')
const getPromiseCI = require('./providers/corteIngles')
const getPromiseFnac = require('./providers/fnac')

const express = require('express')
const router = express.Router()

const url = 'https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=ErnestoP-clickcou-PRD-e6c385072-30fa6fdb&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=[KEYWORD]&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-ES&siteid=186' 
const urlCarref = 'http://www.carrefour.es/global/?Dy=1&Nty=1&Ntt=[KEYWORD]&search='
const urlCI = 'https://www.elcorteingles.es/search/?s=[KEYWORD]'
const urlFnac = 'http://busqueda.fnac.es/SearchResult/ResultList.aspx?SCat=0%211&Search=[KEYWORD]&sft=1&sa=0'

router.post('/search', function (req, res){

	const searchProduct = req.body.searchQuery

	const ebayUrl = url.replace('[KEYWORD]', searchProduct)
	const promiseEbay = getPromiseEbay(ebayUrl)

	const carrefUrl = urlCarref.replace('[KEYWORD]', searchProduct)
	const promiseCarref = getPromiseCarrefour(carrefUrl)

	const CIUrl = urlCI.replace('[KEYWORD]', searchProduct)
	const promiseCI = getPromiseCI(CIUrl)

	const fnacUrl = urlFnac.replace('[KEYWORD]', searchProduct)
	const promiseFnac = getPromiseFnac(fnacUrl)

	Promise.all([promiseFnac, promiseCI, promiseCarref, promiseEbay])

        .then( results => {

            const allPromises = { results }
            res.json(allPromises)
        })
        .catch( error => {
            console.log(error)
        })
})


module.exports = router
