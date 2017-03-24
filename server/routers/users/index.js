const express = require ('express')
const router = express.Router()

const getUser = require ('./handlers/getUser')
const editUser = require ('./handlers/editUser')
const getSearchQuery = require('./handlers/getQuery')

router.get('/:id', getUser )
router.put('/edit/:id', editUser )
router.put('/:id', getSearchQuery )

module.exports = router
