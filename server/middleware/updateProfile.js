const policies = require('../middleware/register');

function checkGender(req)
{
    if(req && (req === 'Male' || req === 'Female' || req === 'Others'))
        return true;
    return false;
}

function checkUpdateProfile(req) {
    
    if (req.age < 18 || req.age > 100)
        return 'invalid Age';
    if(!policies.checkFirstName(req.FirstName))
        return 'invalid First Name';
    if(!policies.checkLastName(req.lastName))
        return 'invalid last Name';
    if(!checkGender(req.gender))
        return 'invalid gender';
    if(!checkGender(req.lookingfor))
        return 'invalid looking for gender';
    return 'OK';
}
function checkMailUpdate(email) {
    const emailRegexp = /.+@.+\..+/;
    var regex = emailRegexp.test(email);
    if (email.length < 0 || !regex)
        return false;
    return "OK";
}
function checkBioUpdate(bio) {
    if(bio)
    {
        if (bio.length < 100)
            return false
        return "OK";
    }
    return false
}

function checkTagsUpdate(tags) {
    var i;

    i = 0;
    while(tags[i])
    {
        if (tags[i].length < 3 || !tags[i])
            return false
        return "OK";
    }
    return false
}
module.exports = {
    checkUpdateProfile: checkUpdateProfile,
    checkTagsUpdate: checkTagsUpdate,
    checkMailUpdate: checkMailUpdate,
    checkBioUpdate: checkBioUpdate,
}