var nodemailer = require('nodemailer');
const { promisify } = require('util');

exports.sendEmail = async function (email, token, flag) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'earthian.man@gmail.com',
            pass: ''
        }
    });
    
    if (flag == 0) {
        var mailOptions = {
            from: 'earthian.man@gmail.com',
            to: email,
            subject: 'Confirmation Of Registration Matcha',
            text: 'Confirm your register !',
            html: '<h1 style="text-align: center; color: #20d8ed;"><strong>Confirmation Email</strong></h1>' +
            '<p style="text-align: center;"><strong>Matcha email confirmation<br />Thank you for your interest, we hope you find your match or life partner</strong></p>'+
            '<p style="text-align: center;">&nbsp;</p>'+
            '<p><strong><img style="display: block; margin-left: auto; margin-right: auto;" src="https://p4.wallpaperbetter.com/wallpaper/152/283/744/couple-silhouettes-night-love-wallpaper-preview.jpg" width="330" height="543" /></strong></p>'+
            '<p>&nbsp;</p>'+
            '<p style="text-align: center;">You are just one step away from validation your account and joining one of the bigest dating app.<br />Please click the link below to verify your email.</p>'+
            '<p style="text-align: center;">&nbsp;</p>'+
            '<p style="text-align: center;"><a style="background: orange; color: #ffffff; padding: 10px 50px; border-radius: 3px;" href="http://localhost:5000/#/active/'+ token + '">Confirm</a></p>'+
            '<p style="text-align: center;">&nbsp;</p>'+
            '<p style="text-align: center; font-size: 10px;"><code>Matcha is a registered business name of Dating web app world wide.</code><br /><br /><code>registered Office: Morocco , Khouribga 1337</code></p>'+
            '<p>&nbsp;</p>'
        };
    }
    else {
        var mailOptions = {
            from: 'earthian.man@gmail.com',
            to: email,
            subject: 'Reset Password Matcha',
            text: 'Confirm your password reset !',
            html: '<h1 style="text-align: center; color: #20d8ed;"><strong>Confirmation Email</strong></h1>' +
            '<p style="text-align: center;"><strong>Matcha Reset password<br />Thank you for your interest, we hope you find your match or life partner</strong></p>'+
            '<p style="text-align: center;">&nbsp;</p>'+
            '<p><strong><img style="display: block; margin-left: auto; margin-right: auto;" src="https://p4.wallpaperbetter.com/wallpaper/152/283/744/couple-silhouettes-night-love-wallpaper-preview.jpg" width="330" height="543" /></strong></p>'+
            '<p>&nbsp;</p>'+
            '<p style="text-align: center;">You are just one step away from reseting your password if you have any other problem dont hesistate to contact us enjoy.<br />Please click the link below to go to the reset passsword page.</p>'+
            '<p style="text-align: center;">&nbsp;</p>'+
            '<p style="text-align: center;"><a style="background: orange; color: #ffffff; padding: 10px 50px; border-radius: 3px;" href="http://localhost:5000/#/reset/'+ token + '">Confirm</a></p>'+
            '<p style="text-align: center;">&nbsp;</p>'+
            '<p style="text-align: center; font-size: 10px;"><code>Matcha is a registered business name of Dating web app world wide.</code><br /><br /><code>registered Office: Morocco , Khouribga 1337</code></p>'+
            '<p>&nbsp;</p>'
        };
    }

    transporter.sendMail = promisify(transporter.sendMail)
    await transporter.sendMail(mailOptions);
}

