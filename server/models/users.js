const connection = require('../config/database');
const crypto = require("crypto");
const browesModel = require("./browes");


exports.updateProfileRequest = async function (req, res) {
    if(req.age && req.id && req.firstName && req.lastName && req.gender && req.lookingfor)
    {
        const query1 = "UPDATE users SET age = ?, firstName = ?, lastName = ?, gender = ?, lookingfor = ? WHERE id = ?";
        await connection.query(query1, [req.age, req.firstName,req.lastName, req.gender, req.lookingfor, req.id]);
            return true
    }
    return false
}
exports.updateProfileEmailRequest = async function (req, res) {
    if(req.id && req.email)
    {
        const query1 = "UPDATE users SET email = ? WHERE id = ?";
        await connection.query(query1, [req.email, req.id]);
            return true
    }
    return false
}

exports.updateProfileBioRequest = async function (req, res) {
    if(req.id && req.bio)
    {
        const query1 = "UPDATE users SET bio = ? WHERE id = ?";
        await connection.query(query1, [req.bio, req.id]);
            return true
    }
    return false
}
exports.updatePasswordRequest = async function (req, res) {
    var hash = crypto.createHash('whirlpool').update(req.password).digest('hex');
    const query1 = "UPDATE users SET password = ? WHERE id= ?";
    await connection.query(query1, [hash, req.id])
}

async function checkTag(login, tag) {
    const qr = 'select * from tags where login = ? AND tag = ?'
    var check = await connection.query(qr, [login, tag])
    return check
}

async function checkUpdateTag(login, tag) {
    const qr = 'select * from tags where login = ? AND tag = ?'
    var check = await connection.query(qr, [login, tag])
    return check
}

async function addTags(login, tag) {
    const qr = 'insert into tags (login, tag) VALUES (?, ?)'
    await connection.query(qr, [login, tag])
}

async function deleteTags(login) {
    const qr = 'delete from tags where login = ?'
    await connection.query(qr, [login])
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

exports.getLiked = async function (login) {
    const qr = 'select u.firstName, u.lastName, u.login, u.mainFoto, l.action_date from liked l, users u where l.login = u.login AND l.liked = ? ORDER by l.action_date DESC'
    var liked = await connection.query(qr, [login])
    if (liked.length > 0){
        liked = JSON.stringify(liked)
        liked = JSON.parse(liked)
        return liked
    }
    return false
}

exports.getSeen = async function (login) {
    const qr = 'select u.firstName, u.lastName, u.login, u.mainFoto, s.action_date from seen s, users u where s.viewer = u.login AND s.login = ? ORDER by s.action_date DESC'
    var seen = await connection.query(qr, [login])
    if (seen.length > 0){
        seen = JSON.stringify(seen)
        seen = JSON.parse(seen)
        return seen
    }
    return false
}

exports.getLogin = async function (id) {
    const qr = 'select login from users where id = ?'
    var login = await connection.query(qr, [id])
    if (login.length > 0){
        login = JSON.stringify(login[0])
        login = JSON.parse(login)
        login = login.login
        return login
    }
    return false
}

exports.fill = async function (req, res) {
    const query1 = "UPDATE users SET gender = ?, lookingfor = ?, bio = ?, age = ?, fill = 1 WHERE login = ?";
    await connection.query(query1, [req.user.gender, req.user.mylookingfor, req.user.biography , req.user.age, req.info.login]);
    for (let i = 0; i < req.user.chips.length; i++) {
        var check = await checkTag(req.info.login, req.user.chips[i])
        if (check.length > 0)
            continue
        await addTags(req.info.login, req.user.chips[i]);
    }
}


exports.updateProfileTagsRequest = async function (req, res) {
    var chips = req.chips;
    const addqr = 'select login from users where id = ?'
    var login = await connection.query(addqr, req.id)
    if (login.length > 0){
        login = JSON.stringify(login[0])
        login = JSON.parse(login)
        login = login.login
    }
    else
        return false
        await deleteTags(login);
    for (let i = 0; i < chips.length; i++) {
       var check = await checkUpdateTag(login, chips[i])
        if (check.length > 0)
            continue
        await addTags(login, chips[i]);
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

exports.getOtherUserInfo = async function (id, login, user) {
    var check = await browesModel.checkBlock({login: login, user: user})
    if (!check)
        return false
    const rq = "SELECT * from users WHERE id = ? AND access = true"
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