const getPromiseEbay = require('./providers/ebay')
const getPromiseCarrefour = require('./providers/carrefour')
const getPromiseCI = require('./providers/corteIngles')
const getPromiseFnac = require('./providers/fnac')
const getPromiseSolo = require('./providers/soloStock')

const express = require('express')
const router = express.Router()

const url = 'https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=ErnestoP-clickcou-PRD-e6c385072-30fa6fdb&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=[KEYWORD]&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-ES&siteid=186'
const urlCarref = 'http://www.carrefour.es/global/?Dy=1&Nty=1&Ntt=[KEYWORD]&search='
const urlCI = 'https://www.elcorteingles.es/search/?s=[KEYWORD]'
const urlFnac = 'http://busqueda.fnac.es/SearchResult/ResultList.aspx?SCat=0%211&Search=[KEYWORD]&sft=1&sa=0'
const urlSolo = 'http://www.solostocks.com/venta-productos/[KEYWORD]_b'

router.post('/search', function(req, res) {

    const searchProduct = req.body.searchQuery

    const ebayUrl = url.replace('[KEYWORD]', searchProduct)
    const promiseEbay = getPromiseEbay(ebayUrl)

    const carrefUrl = urlCarref.replace('[KEYWORD]', searchProduct)
    const promiseCarref = getPromiseCarrefour(carrefUrl)

    const CIUrl = urlCI.replace('[KEYWORD]', searchProduct)
    const promiseCI = getPromiseCI(CIUrl)

    const fnacUrl = urlFnac.replace('[KEYWORD]', searchProduct)
    const promiseFnac = getPromiseFnac(fnacUrl)

    const soloUrl = urlSolo.replace('[KEYWORD]', searchProduct)
    const promiseSolo = getPromiseSolo(soloUrl)

    Promise.all([promiseFnac, promiseCI, promiseCarref, promiseEbay, promiseSolo])

    .then(results => {
        let averagePrice = results[3].findItemsByKeywordsResponse[0].searchResult[0].item[0].sellingStatus[0].currentPrice[0].__value__
        console.log(averagePrice)
        let [ fnac, CI, carref, ebay, sStock ] = results
        ebay = results[3].findItemsByKeywordsResponse[0].searchResult[0].item

        function filterFnacPriceOverAverage(elem) { 
            if (elem.price.replace(/[^0-9-,]|€|-/g, '') >= averagePrice) { 
                return elem 
            }  
        }

        function filterOthersPriceOverAverage(elem) { 
            if (elem.price.replace(/€[\s\S]*$/g, '') >= averagePrice) { 
                return elem 
            }  
        }

        function filterEBayPriceOverAverage(elem) {
            const price = elem.sellingStatus[0].currentPrice[0].__value__
            if (parseInt(price) >= averagePrice) { 
                return elem 
            } 
        }

        function filterFirstTree(elem, index) { 
            return index <= 3
        }

        let fnacFiltered = fnac.filter(filterFirstTree)
                                .filter( filterFnacPriceOverAverage )

        let CiFiltered = CI.filter(filterFirstTree)
                            .filter( filterOthersPriceOverAverage)

        let carrefFiltered = carref.filter(filterFirstTree)
                                    .filter( filterOthersPriceOverAverage)

        let ebayFiltered = ebay.filter(filterFirstTree)
                                .filter( filterEBayPriceOverAverage )

        let stockFiltered = sStock.filter(filterFirstTree)
                                    .filter( filterOthersPriceOverAverage)

        results = [ fnacFiltered, CiFiltered, carrefFiltered, ebayFiltered, stockFiltered ]
        res.json(results)

    })
    .catch(error => {
        console.log(error + ' !! PROMISE error!!')
    })
})


module.exports = router
