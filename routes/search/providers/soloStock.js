 const rp = require('request-promise')
 const imgNoDisp = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeRMkxYTjrreUnillHK0czA3SxIxQ9j8p7lhlStLRVut0lyGW3dQ'
 const cheerio = require('cheerio')
 
 module.exports = function( soloUrl ) {

        let productsFound = []

        return rp(soloUrl).then(body => {

            var $ = cheerio.load(body)

            $('.list-item.item.producto.clear').each(function(i, elem) {

                const image = $(this).find('a.img-container').find('img').attr('src') || imgNoDisp
                const price = $(this).find('span.standard-list-price-no-iva').text() + ' - ' || ' No Available'
                const description = $(this).find('h2.titulo').find('a.js-item-link').text()
                const link = $(this).find('h2.titulo').find('a.js-item-link').attr('href')

                productsFound.push({ image, price, description, link })

            })

            console.log(productsFound + ', ' + ' soloStock')

            return productsFound

        })

    }