var nodemailer = require('nodemailer');
const { promisify } = require('util');

exports.sendEmail = async function (email, token) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'earthian.man@gmail.com',
            pass: 'Benbraitit1993*'
        }
    });

    var mailOptions = {
        from: 'earthian.man@gmail.com',
        to: email,
        subject: 'confirmation register in matcha',
        text: 'Confirm your register !',
        html: '<h1>Welcome our New user !</h1><p>click <a href="http://localhost:8080/active/'+ token + '">here</a> to active your account </p>'
    };

    transporter.sendMail = promisify(transporter.sendMail)
    await transporter.sendMail(mailOptions);
}

