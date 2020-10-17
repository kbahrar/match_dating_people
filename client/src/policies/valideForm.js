export default {
    validFirstName (firstName) {
        var re = /^[A-Za-z][A-Za-z]{2,31}$/;
        return re.test(firstName);
    },
    validLastName (lastName) {
        var re = /^[A-Za-z][A-Za-z]{2,31}$/;
        return re.test(lastName);
    },
    validLogin (login) {
        var re = /^[A-Za-z][A-Za-z0-9]{2,31}$/;
        return re.test(login);
    },
    validEmail (email) {
        var re = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)*$/;
        return re.test(email);
    },
    validPwd (pwd) {
        var L = /(?=.*[a-z])/.test(pwd);
        var U = /(?=.*[A-Z])/.test(pwd); 
        var N = /(?=.*\d)/.test(pwd);
        if (pwd.length < 8 || !L || !U || !N)
            return false;
        return true;
    }
}