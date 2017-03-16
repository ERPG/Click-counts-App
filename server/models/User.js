const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')
const collection = 'users'

const User = new Schema({}, {collection});

User.plugin( passportLocalMongoose );

module.exports = mongoose.model('User', User);