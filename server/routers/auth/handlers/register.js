const User = require('../../../models/User')

function register(req, res) {

  const { username, password, name, email } = req.body
  const account = new User({ username, name, email })

  User.register( account, password, err => {
    if (err) {
    	console.log(err)
        return res.json({success: false, msg: `Username already exists.`})
    }
    console.log(account +' from Register.js')
    res.json({success: true, msg: 'Successful created new user.'})
  })

}

module.exports = register