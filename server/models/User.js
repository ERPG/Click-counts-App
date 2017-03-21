const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')
const collection = 'users'

const User = new Schema({
	email: String, 
	name: String,
	querySearch: [ String ], 
	image: { type: String, default: "https://d1fy1ym40biffm.cloudfront.net/images/default-avatar.png" }
}, {collection});

User.plugin( passportLocalMongoose );

module.exports = mongoose.model('User', User);