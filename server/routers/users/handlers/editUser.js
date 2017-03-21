const User = require ('../../../models/User')

module.exports = (req, res) => {

	const id = req.params.id
	const { name, email, image } = req.body

	User.findByIdAndUpdate (id , { name, email, image} )
	.then( user => {

      console.log('User has been updated succesfully')
      res.json(user) 
    })
    .catch( err => console.log(err) + ' ERROR EN UPDATE editUser.js' )


}