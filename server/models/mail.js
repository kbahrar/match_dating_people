const connection = require('../config/database');
var nodemailer = require('nodemailer');

function sendEmail(email) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kamalbahrar99@gmail.com',
            pass: ' '
        }
    });

    var mailOptions = {
        from: 'kamalbahrar99@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

