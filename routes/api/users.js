const express = require('express')
const router = express.Router()


//validateion
const validate = require('./../../middleware/validate')

//controller
const user = require('../../controller/user')




router.post(
    '/register',
    validate.validate('createUser'), 
    user.register
)

router.post(
    '/login',
    validate.validate('login'), 
    user.login
)

router.post(
    '/forgotPassword',
    validate.validate('forgotPassword'), 
    user.forgotPassword
)



module.exports = router