function checkprofilesettings(req) {
    var body = req.informations
    // if (!req.info.login || !body.gender || !body.age || !body.email || !body.firstName || !body.lastName)
    //     return 'You didnt send any informations'
    if (body.age < 18)
    {
        return 'invalid Age'
    }
    return 'OK'
}

module.exports = {
    checkUpdateInformations: checkprofilesettings
}