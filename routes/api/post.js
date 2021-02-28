const express = require('express')
const router = express.Router()

//controller
const post = require('../../controller/post')

//middleware
const auth = require('./../../middleware/auth')

//caalled all times when routes is called
router.use(auth)


//get all posts
router.get('/', post.all)

//get a posts
router.get('/:post_id', post.get)

//insert a posts
router.post('/', post.insert)

//update a posts
router.patch('/:post_id', post.update)

//delete a posts
router.delete('/:post_id', post.delete)


module.exports = router