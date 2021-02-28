const express = require('express')
const router = express.Router()

const auth = require('./../../middleware/auth')
const authCtrl = require('./../../controller/auth')


//caalled all times when routes is called
router.use(auth)


router.get(
    '/',
    authCtrl.profile
)


router.post(
    '/uploadFile',
    authCtrl.uploadFile
)


router.post(
    '/updateProfile',
    authCtrl.updateProfile
)

router.get(
    '/changePassword',
    authCtrl.changePassword
)

module.exports = router