 const rp = require('request-promise')
 
 module.exports = function( ebayUrl ) {

	return rp(ebayUrl)
		.then(data => {

		  let parsedData = data.replace("/**/_cb_findItemsByKeywords(", "")
		  parsedData = parsedData.replace("})", "}")
		  parsedData = JSON.parse(parsedData)

		  return parsedData
		})

}
