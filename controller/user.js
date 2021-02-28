const {validationResult}  = require('express-validator')
const User = require('./../model/User')
const ResetPassword = require('./../model/ResetPassword')

//password encryption
var bcrypt = require('bcryptjs');

//jwt token
var jwt = require('jsonwebtoken');

//emptty check
var empty = require('is-empty');


//for getting of constants
const config = require('config');
const secret = config.get('jwt-secret')

///mail fxn
var mail = require('../config/mailer')

///mail fxn
var consts = require('../config/constants')

const user = {}

user.register = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const { username, name, email, password } = req.body

    try {

        let userEmail = await User.find({'email':email})

        if (!empty(userEmail)) {
            return res.status(200).json({ message: "Email already exists.", error:true});
        }

        let userName = await User.find({'username':username})
        if (!empty(userName)) {
            return res.status(200).json({ message: "Username already exists.", error:true});
        }


        let salt  = await bcrypt.genSalt(10)
        let hashPassword  = await bcrypt.hash(password, salt)

        var user = new User(
            {
                username: username,
                name: name,
                email: email,
                password: hashPassword,
                created_at: Date.now()
            }
        );
        await user.save()
        return res.status(200).json({ message: "User Registsred successfully.", error:false })

    } catch (err) {
        return res.status(500).json({ message: err.message});
    }
}
user.login = async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const { username, password } = req.body

    try {

        let user = await User.findOne({
            $or: [
              { 'username': username },
              { 'email': username }
            ]
        })

        if (empty(user)) {
            return res.status(200).json({ message: "Username or Email does not exists.", error:true});
        }
        
        await bcrypt.compare(password, user.password, function(err, result){
            if (!result) {
                return res.status(200).json({ message: "Password not matched.", error:true});
            }
            let  token = jwt.sign({
                data: {
                    _id: user._id
                }
            }, secret, { expiresIn: 60 * 60 });
            return res.status(200).json({ message: "User logged in successfully.", token :  token, error:false});
        })

    } catch (err) {
        return res.status(500).json({ message: err.message});
    }
}


user.forgotPassword = async (req, res) => {
    try{
        const username = req.body.username;
        let user = await User.findOne({
            $or: [
              { 'username': username },
              { 'email': username }
            ]
        })
        if (empty(user)) {
            return res.status(200).json({ message: "Email or username doesnot exists", error:true});
        }
        await ResetPassword.findOne({user:user._id},function(err,result){
            if(empty(result)) {
                //send mail 
                let password =  new ResetPassword({
                    user:user._id,
                    status:0,
                    token:"12421353"
                    })
                password.save(function(err){
                    if(err) return res.status(200).json({ message: err.message});
                });
            } else {
                result.status = 0;
                result.token = "@#5453";
                result.created_at = Date.now();
                result.save();
            }
            mail.mailer.send('email', {
                to: 'ravindr8368@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field. 
                subject: 'Test Email', // REQUIRED.
                link:"gfdgdfgs"
            },function (err) {
                if (err) {
                    return res.status(200).json({ message: err.message});
                }
                return res.status(200).json({ message: "Email sent.", error:true});
            });
        })
    } catch(err) {
        return res.status(200).json({ message: err.message});
    }
}

user.resetPassword = async(req, res) => {
    try{
        const token = req.body.token;
        const newPassword = req.body.newPassword;
        await ResetPassword.findOne({token:token},function(err,result){
            if(empty(result)) {
                password.save(function(err){
                    if(err) return res.status(200).json({ message: err.message});
                });
            } else {
                result.status = 0;
                result.token = "@#5453";
                result.created_at = Date.now();
                result.save();
            }
            return res.status(200).json({ message: "Check your email."});
        })

    } catch(err) {
        return res.status(200).json({ message: err.message});
    }
}

module.exports = user;