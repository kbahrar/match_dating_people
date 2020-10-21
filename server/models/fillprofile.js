const connection = require('../config/database');

async function addTags(login, tag) {
    // console.log(login)
    const qr = 'insert into tags (login, tag) VALUES (?, ?)'
    var check = await connection.query(qr, [login, tag])
    return check
}

const fill = async function (req, res) {
    try {
        // console.log(req)
        const query1 = "UPDATE users SET sexe = ?, bio = ?, city = ?, age = ? WHERE login = ?";
        var ops = await connection.query(query1, [req.user.gender ,req.user.biography , req.user.city, req.user.age, req.info.login]);
        // console.log(req.user.chips.length);
        for (let i = 0; i < req.user.chips.length; i++) {
            var check = await addTags(req.info.login, req.user.chips[i]);
        }
    }
    catch (err)
    {

        console.log(err)
    }
}

module.exports = {fill};