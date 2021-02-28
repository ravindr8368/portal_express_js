//empty check
var empty = require('is-empty');

const User = require('./../model/User')
const ResetPassword = require('./../model/ResetPassword')

//used for file upload
const multer = require('multer');
var upload = multer({ dest: 'public/upload/' })

//password encryption
var bcrypt = require('bcryptjs');

///mail fxn
var mail = require('../config/mailer')

const user = {}

user.profile = async (req, res) => {
    try{
        var user = await User.findById(req.user).select('-password')
        return res.status(200).json({ message: user});
    } catch(err) {
        return res.status(200).json({ message: err.message});
    }
}
user.uploadFile = async(req, res) => {
    await upload.any('avatar')(req, res, function (err, result) {
        if(err) {
            return res.status(200).json({ message: err.message});
        }
        var savedFile =  req.file.path
        User.findOneAndUpdate({_id:req.user}, {avatar:savedFile},function(err, result){
            if(err) {
                return res.status(200).json({ message: err.message});
            }
            return res.status(200).json({ message: "Image uploaded successfully"});
        })
    })
}
user.updateProfile = async(req, res) => {
    await User.findOneAndUpdate({_id:req.user},
        {
            $set:{
                name:req.body.name,
                email:req.body.email
            }
        },function(err, result){
            if(err) {
                return res.status(200).json({ message: err.message});
            }
            return res.status(200).json({ message: "Profile updated successfully"});
    })

}

user.changePassword = async(req, res) => {
    const password = req.body.password;
    let salt  = await bcrypt.genSalt(10)
    let hashPassword  = await bcrypt.hash(password, salt)

    await User.findById(req.user, function (req, user) {
        bcrypt.compare(password, user.password, function(err, result){
            if (!result) {
                return res.status(200).json({ message: "Old Password not matched."});
            }
            User.findOneAndUpdate({_id:req.user},
                {
                    $set:{
                        password:hashPassword
                    }
                },function(err, result){
                    if(err) {
                        return res.status(200).json({ message: err.message});
                    }
                    return res.status(200).json({ message: "Password changed successfully"});
            })
        })
    })

}

module.exports = user;