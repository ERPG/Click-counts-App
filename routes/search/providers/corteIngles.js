 const rp = require('request-promise')
 const imgNoDisp = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeRMkxYTjrreUnillHK0czA3SxIxQ9j8p7lhlStLRVut0lyGW3dQ'
 const cheerio = require('cheerio')
 
 module.exports = function( CIUrl ) {

 	    let productsFound = []

        return rp(CIUrl).then(body => {

            var $ = cheerio.load(body);

            $('ul.product-list.4 li').each(function(i, elem) {

                const image = $(this).find('img.c12').attr('src') || imgNoDisp
                const price = $(this).find('div.product-price').find('span.current').text() || ' No Available'
                const description = $(this).find('a.js-product-click').text()
                const link = $(this).find('a.event').attr('href')

                productsFound.push({ image, price, description, link })

            })

            // console.log(productsFound + ', ' + 'corte Ingles')

            return productsFound
        })

    }