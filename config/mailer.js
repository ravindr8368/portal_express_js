const express = require('express');
const app = express();
var mailer = require('express-mailer');
const path = require('path');

 
var mail = mailer.extend(app, {
    from: 'no-reply@example.com',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: 'ravindrsharma99@gmail.com',
        pass: 'lgpdzkkbalelkwjz'
    }
})

app.set('views', __dirname + '/../views');
app.set('view engine', 'jade');


module.exports = mail