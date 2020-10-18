
function checkNull(body) {
    console.log(body.password);
    if (body.password == 0 || body.email == 0 || body.lastName == 0 || body.firstName == 0 || body.login == 0)
        return false;
    if (body.password.length == 0 || body.email.length == 0 || body.lastName.length == 0 || body.firstName.length == 0 || body.login.length == 0)
        return false;
    return true;
}

function checkLogin(login) {
    const loginRegexp = /^[A-Za-z][A-Za-z0-9]{2,31}$/;
    var regex = loginRegexp.test(login);
    if (!regex)
        return false;
    return true;
}

function checkFirstName(firstName) {
    const firstNameRegexp = /^[A-Za-z][A-Za-z]{2,31}$/;
    var regex = firstNameRegexp.test(firstName);
    if (!regex)
        return false;
    return true;
}

function checkLastName(lastName) {
    const lastNameRegexp = /^[A-Za-z][A-Za-z]{2,31}$/;
    var regex = lastNameRegexp.test(lastName);
    if (!regex)
        return false;
    return true;
}

function checkMail(email) {
    const emailRegexp = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)*$/;
    var regex = emailRegexp.test(email);
    if (email.length < 0 || !regex)
        return false;
    return true;
}

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


module.exports = {
    checkPwd: checkPwd,
    checkLogin: checkLogin,
    checkFirstName: checkFirstName,
    checkLastName: checkLastName,
    checkMail: checkMail,
    checkNull: checkNull
}