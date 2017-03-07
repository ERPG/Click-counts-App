const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const express = require('express')
const app = express()


app.use(express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.post('/login', function (req, res){
	res.redirect('home')
})

app.post()

//---------------

const amazonUrl ="https://www.amazon.es/s/ref=nb_sb_noss_2?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&url=search-alias%3Daps&field-keywords=[KEYWORD]"


request(amazonUrl, function (err, res, body){

	var $ = cheerio.load(body);

	var links = $('link').map(function(i) {
			return $(this).attr('href') + "\n";
    }).get();

    fs.writeFile('test.txt', links, function(err){
    	if (err) throw err;
    	console.log('Its saved')
    })


})
  