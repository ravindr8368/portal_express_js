//jwt token
var jwt = require('jsonwebtoken')

//config to get secret key
const config = require('config')
const secret = config.get('jwt-secret')

module.exports = function (req, res, next) {
    const token = req.header('token')
    if (!token) {
        return res.status(200).json({ message: "Token is required."});
    }
    try{
        var decoded = jwt.verify(token, secret)
        req.user = decoded.data._id
        next()
    } catch(err) {
        return res.status(200).json({ message: "Token is expired."});
    }
}