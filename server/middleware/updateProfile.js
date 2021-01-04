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

module.exports = {
    checkUpdateProfile: checkUpdateProfile
}