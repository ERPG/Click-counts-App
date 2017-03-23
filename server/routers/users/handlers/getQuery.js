const User = require('../../../models/User')

module.exports = (req, res) => {

	const id = req.params.id
	const { query } = req.body

	User.findById(id)
		.then( user => {
			if(user.querySearch.indexOf(query) !== -1) {
				res.status(200)
			} else {
				User.findByIdAndUpdate(id , {'$push': {querySearch: query} } )
					.then( user => {
						console.log('hola')
      					console.log('User has been updated succesfully')
      				res.status(200)
			})

		}
	 
    })
    .catch( err => console.log(err) + ' ERROR EN UPDATE getQuery.js' )


}