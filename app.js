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

app.post('/home/find', function(req, res) {


    const searchProduct = req.body.productSearch

    const url = "https://www.amazon.es/s/ref=nb_sb_noss_2?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&url=search-alias%3Daps&field-keywords=[KEYWORD]"

    const amazonUrl = url.replace('[KEYWORD]', searchProduct)

    request(amazonUrl, (err, res, body) => {

        var $ = cheerio.load(body);

        $('ul#s-results-list-atf img.s-access-image.cfMarker').each(function(i, elem) {

            var images = $(this).attr('src')

            amazonImg.push(images)
        });

        console.log(amazonImg);

        res.redirect('home')

    })


})

app.listen(PORT, () => console.log(`listening on PORT ${ PORT }...`))
