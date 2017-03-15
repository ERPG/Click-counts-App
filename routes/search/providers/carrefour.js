 const rp = require('request-promise')
 const imgNoDisp = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSeRMkxYTjrreUnillHK0czA3SxIxQ9j8p7lhlStLRVut0lyGW3dQ'
 const cheerio = require('cheerio')
 
 module.exports = function( carrefUrl ) {

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