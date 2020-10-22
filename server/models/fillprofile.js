const connection = require('../config/database');

async function checkTag(login, tag) {
    const qr = 'select * from tags where login = ? AND tag = ?'
    var check = await connection.query(qr, [login, tag])
    return check
}

async function addTags(login, tag) {
    const qr = 'insert into tags (login, tag) VALUES (?, ?)'
    var check = await connection.query(qr, [login, tag])
    return check
}

const fill = async function (req, res) {
    const query1 = "UPDATE users SET gender = ?, lookingfor = ?, bio = ?, city = ?, age = ?, fill = 1 WHERE login = ?";
    await connection.query(query1, [req.user.gender, req.user.mylookingfor, req.user.biography , req.user.city, req.user.age, req.info.login]);
    // console.log(check)
    for (let i = 0; i < req.user.chips.length; i++) {
        var check = await checkTag(req.info.login, req.user.chips[i])
        if (check.length > 0)
            continue
        await addTags(req.info.login, req.user.chips[i]);
    }
    return true
}

module.exports = {fill};