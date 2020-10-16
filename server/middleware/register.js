function checkPwd(pwd) {
    if (pwd.length < 8)
        return false;
    var i = 0;
    var check = 0;
    var character = '';
    while (i <= pwd.length) {
        character = pwd.charAt(i);
        if (!isNaN(character * 1)) {
            check++;
        } else {
            if (character == character.toUpperCase()) {
                check++;
            }
            if (character == character.toLowerCase()) {
                check++;
            }
        }
        i++;
    }
    if (check < 3)
        return false;
    return true;
}

function checkMail(Mail) {
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    var regex = emailRegexp.test(Mail);
    if (!regex)
        return false;
    return true;
}

function checkNull(body) {
    if (body.password.length == 0 || body.email.length == 0 || body.lastName.length == 0 || body.firstName.length == 0 || body.login.length == 0)
        return false;
    return true;
}

module.exports = {
    checkPwd: checkPwd,
    checkMail: checkMail,
    checkNull: checkNull
}