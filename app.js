const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')

var amazonProducts = []



app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.post('/api/search', function(req, res) {


	const searchProduct = req.body.productSearch

	const url = "https://www.amazon.es/s/?field-keywords=[KEYWORD]"

	const amazonUrl = url.replace('[KEYWORD]', searchProduct)

	request(amazonUrl, (err, response, body) => {

		var $ = cheerio.load(body);

		$('ul#s-results-list-atf li').each(function(i, elem) {
			let product = {}
			product.images = $(this).find('img.s-access-image.cfMarker').attr('src')
			product.price = $(this).find('span.a-size-base.a-color-price.s-price.a-text-bold').text()
			product.description = $(this).find('h2.a-size-medium.a-color-null.s-inline.scx-truncate.s-access-title.color-variation-title-replacement.a-text-normal').text()
			amazonProducts.push(product)
		})

		res.json(amazonProducts)
	})

})

// -------------------------- aliexpress------------------------------

// -------------------------- ebay ------------------------------



app.listen(PORT, () => console.log(`listening on PORT ${ PORT }...`))
