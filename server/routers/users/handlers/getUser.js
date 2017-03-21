const User = require ('../../../models/User')

module.exports = (req, res) => {

	const id = req.params.id

	User.findById(id)
		.then( user => res.json(user) )
		.catch( err => console.log( err + ' En getUSer.js'))

}