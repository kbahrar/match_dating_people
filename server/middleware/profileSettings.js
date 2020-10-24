function checkUpdateInformations(req) {
    var body = req.informations
    // if (!req.info.login || !body.gender || !body.age || !body.email || !body.firstName || !body.lastName)
    //     return 'You didnt send any informations'
    if (body.age < 18)
    {
        return 'invalid Age'
    }
    if (body.email)
    {
        if (!(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)*$/.test(body.email)) || body.email.length < 0)
        return 'Invalid email!'
    }
    if(body.firstName)
    {
        if (!(/^[A-Za-z][A-Za-z]{2,31}$/.test(body.firstName)))
        return 'Invalid first name!'
    }
    if(body.lastName)
    {
        if (!(/^[A-Za-z][A-Za-z]{2,31}$/.test(body.lastName)))
        return 'Invalid last name!'
    }
    return 'OK'
}

module.exports = {
    checkUpdateInformations: checkUpdateInformations
}