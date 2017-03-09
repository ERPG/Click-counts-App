const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.redirect('login.html')
})

app.get('/login', function(req, res) {
    res.redirect('home.html')
})

var amazonImg = [];
var aliexpressImg = [];

app.post('/home/find', function(req, res) {


    const searchProduct = req.body.productSearch

    const url = "https://www.amazon.es/s/?field-keywords=[KEYWORD]"

    const amazonUrl = url.replace('[KEYWORD]', searchProduct)

    // request(amazonUrl, (err, res, body) => {


    //     var amazon = []


    //     var $ = cheerio.load(body);

    //     $('ul#s-results-list-atf li').each(function(i, elem) {
    //         let product = {}
    //         product.images = $(this).find('img.s-access-image.cfMarker').attr('src')
    //         product.price = $(this).find('span.a-size-base.a-color-price.s-price.a-text-bold').text()
    //         product.description = $(this).find('h2.a-size-medium.a-color-null.s-inline.scx-truncate.s-access-title.color-variation-title-replacement.a-text-normal').text()

    //         console.log(product);

    //         amazon.push(product)

    //         var jsonAmazon = JSON.stringify(amazon);

    //         fs.writeFile('data/data.json', jsonAmazon, 'utf8', function(err) {
    //             console.log('saved products');

    //         })
    //     })

    // })

    const urlali = "https://es.aliexpress.com/wholesale?catId=0&initiative_id=[products-ID]&SearchText=[KEYWORD]"

    const aliUrl = urlali.replace('[KEYWORD]', searchProduct)

    request(aliUrl, (err, res, body) => {

    	var $ = cheerio.load(body);

        var aliexpress = []

        $('ul#hs-list-items li').each(function(i, elem) {
            let product = {}
            product.images = $(this).find('img.picCore.pic-Core-v').attr('src')
            product.price = $(this).find('span.value').text()
            product.description = $(this).find('a.history-item.product').text()

            console.log(product);

            aliexpress.push(product)

            var jsonAliexpress = JSON.stringify(aliexpress);

            fs.writeFile('data/data.json', jsonAliexpress, 'utf8', function(err) {
                console.log('saved products');

            })
        })

    })

})

// -------------------------- aliexpress------------------------------


app.listen(PORT, () => console.log(`listening on PORT ${ PORT }...`))
