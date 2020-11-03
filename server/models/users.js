const connection = require('../config/database');
const utils = require("../utils/auth")

async function checkTag(login, tag) {
    const qr = 'select * from tags where login = ? AND tag = ?'
    var check = await connection.query(qr, [login, tag])
    return check
}

async function addTags(login, tag) {
    try {
        const qr = 'insert into tags (login, tag) VALUES (?, ?)'
        await connection.query(qr, [login, tag])
    }
    catch (err) {
        console.log("addTags\n" + err)
    }
}

exports.fill = async function (req, res) {
    try {
        const query1 = "UPDATE users SET gender = ?, lookingfor = ?, bio = ?, city = ?, age = ?, fill = 1 WHERE login = ?";
        await connection.query(query1, [req.user.gender, req.user.mylookingfor, req.user.biography , req.user.city, req.user.age, req.info.login]);
        for (let i = 0; i < req.user.chips.length; i++) {
            var check = await checkTag(req.info.login, req.user.chips[i])
            if (check.length > 0)
                continue
            await addTags(req.info.login, req.user.chips[i]);
        }
    }
    catch (err) {
        console.log(err)
    }
}

exports.location = async function (req, res) {
    try {
        const qr = "UPDATE users SET city = ?, latitude = ?, longitude = ? WHERE login = ?"
        await connection.query(qr, [req.location.city, req.location.lat, req.location.lng, req.info.login]);
    }
    catch (err){
        console.log(err)
    }
}

exports.uImages = async function (images, id) {
    const qr = "UPDATE users SET mainFoto = ?, foto1 = ?, foto2 = ?, foto3 = ?, foto4 = ? WHERE id = ?"
    await connection.query(qr, [images[0], images[1], images[2], images[3], images[4], id])
}