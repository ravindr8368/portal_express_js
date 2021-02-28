const { body } = require('express-validator')

exports.validate = (method) => {

switch (method) {

    case 'createUser': {
      return [
        body('username', "username doesn't exists").exists(),
        body('name', "name doesn't exists").exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('password', "password doesn't exists").exists(),
      ]
    }
    case 'login': {
        return [
          body('username', "userName doesn't exists").exists(),
          body('password', "userName doesn't exists").exists()
        ]
      }
      case 'forgotPassword' : {
        return [
          body('username', "userName doesn't exists").exists()
        ]
      }
  }
}