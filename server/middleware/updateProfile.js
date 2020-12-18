function checkUpdateProfile(req) {
    
    var age = req.info.age;
    // if (!req.info.login || !body.gender || !body.age || !body.email || !body.firstName || !body.lastName)
    //     return 'You didnt send any informations'
    if (age < 18 || age > 100)
    {
        return 'invalid Age'
    }
    return 'OK'
}

module.exports = {
    checkUpdateProfile: checkUpdateProfile
}