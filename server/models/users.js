const connection = require('../config/database');
const utils = require("../utils/auth")

exports.updateAge = async function (req, res) {
    if(req.body.info.age && req.body.info.id)
    {
        const query1 = "UPDATE users SET age = ? WHERE id = ?";
        await connection.query(query1, [req.body.info.age, req.body.info.id]);
            return true
    }
    return false
}

async function checkTag(login, tag) {
    const qr = 'select * from tags where login = ? AND tag = ?'
    var check = await connection.query(qr, [login, tag])
    return check
}

async function addTags(login, tag) {
    const qr = 'insert into tags (login, tag) VALUES (?, ?)'
    await connection.query(qr, [login, tag])
}

async function getTags (login) {
    const qr = "select tag from  tags where login = ?"
    var tags = await connection.query(qr, [login]);
    if (tags.length > 0)
    {
        tags = JSON.stringify(tags);
        tags = JSON.parse(tags);
        return tags;
    }
    return false;
}


exports.getId = async function (login) {
    const qr = 'select id from users where login = ?'
    var id = await connection.query(qr, [login])
    if (id.length > 0){
        id = JSON.stringify(id[0])
        id = JSON.parse(id)
        id = id.id
        return id
    }
    return false
}

exports.fill = async function (req, res) {
    const query1 = "UPDATE users SET gender = ?, lookingfor = ?, bio = ?, city = ?, age = ?, fill = 1 WHERE login = ?";
    await connection.query(query1, [req.user.gender, req.user.mylookingfor, req.user.biography , req.user.city, req.user.age, req.info.login]);
    for (let i = 0; i < req.user.chips.length; i++) {
        var check = await checkTag(req.info.login, req.user.chips[i])
        if (check.length > 0)
            continue
        await addTags(req.info.login, req.user.chips[i]);
    }
}

exports.location = async function (req) {
    try {
        const qr = "UPDATE users SET city = ?, latitude = ?, longitude = ? WHERE login = ?"
        await connection.query(qr, [req.location.city, req.location.lat, req.location.lng, req.info.login]);
    }
    catch (err){
        console.log(err)
    }
}

exports.uImages = async function (images, id) {
    var qr = "UPDATE users SET mainFoto = ?, foto1 = ?, foto2 = ?, foto3 = ?, foto4 = ? WHERE id = ?"
    await connection.query(qr, [images[0], images[1], images[2], images[3], images[4], id])
}

exports.getUserInfo = async function (id) {
    const rq = "SELECT * from users WHERE id = ?"
    var user = await connection.query(rq, [id])
    if (user.length > 0){
        user = JSON.stringify(user[0])
        user = JSON.parse(user)
        var tags = await getTags(user.login)
        user.tags = tags
        return user
    }
    return false 
}

exports.getMyInfo = async function (id) {
    const rq = "SELECT * from users WHERE id = ?"
    var user = await connection.query(rq, [id])
    if (user.length > 0){
        user = JSON.stringify(user[0])
        user = JSON.parse(user)
        return user
    }
    return false 
}

exports.getOtherUserInfo = async function (id, login) {
    const rq = "SELECT * from users WHERE id = ?"
    var user = await connection.query(rq, [id])
    if (user.length > 0){
        user = JSON.stringify(user[0])
        user = JSON.parse(user)
        const tags = await getTags(login)
        user.tags = tags
        return user
    }
    return false 
}