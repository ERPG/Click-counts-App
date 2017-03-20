 const rp = require('request-promise')
 const imgNoDisp = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeRMkxYTjrreUnillHK0czA3SxIxQ9j8p7lhlStLRVut0lyGW3dQ'
 const cheerio = require('cheerio')
 
 module.exports = function( fnacUrl ) {

        let productsFound = []

        return rp(fnacUrl).then(body => {

            var $ = cheerio.load(body)

            $('li.clearfix.Article-item').each(function(i, elem) {

                const image = $(this).find('.Article-itemVisual').find('img').attr('src') || imgNoDisp
                const price = $(this).find('a.userPrice').text() || ' No Available'
                const description = $(this).find('a.js-minifa-title').text()
                const link = $(this).find('a.js-minifa-title').attr('href')

                productsFound.push({ image, price, description, link })

            })

            // console.log(productsFound + ', ' + 'Fnac')

            return productsFound
        })

    }
