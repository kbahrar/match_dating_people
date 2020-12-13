const connection = require('../config/database')

async function getlookfor (id) {
    const qr = 'select lookingfor from users where id = ?'
    var lookfor = await connection.query(qr, [id])
    if (lookfor.length > 0){
        lookfor = JSON.stringify(lookfor[0])
        lookfor = JSON.parse(lookfor)
        lookfor = lookfor.lookingfor
        return lookfor
    }
    return false
}

exports.getmyinfo = async function (id) {
    const qr = 'select firstName, lastName, login, age, bio, fame, mainfoto, foto1, foto2, foto3, foto4 registrationDate, tag , gender, lookingfor, city, online from users where id = ?'
    var myinfo = await connection.query(qr, [id])
    if (myinfo.length > 0){
        myinfo = JSON.stringify(myinfo[0])
        myinfo = JSON.parse(myinfo)
        myinfo = myinfo.lookingfor
        return myinfo
    }
    return false
}
exports.mypro = async function (id) {
    const lookfor = await getmyinfo(id);
    return(lookfor);
}

async function getAdress (id) {
    const qr = 'select latitude, longitude from users where id = ?'
    var lookfor = await connection.query(qr, [id])
    if (lookfor.length > 0){
        lookfor = JSON.stringify(lookfor[0])
        lookfor = JSON.parse(lookfor)
        // lookfor = lookfor.lookingfor
        return lookfor
    }
    return false
}

async function getUsers (adress, gender, id) {
    const qr = 'select id, login, FLOOR(ST_Distance_Sphere(point(?, ?), point(longitude, latitude)) / 1000) as distance, firstName, lastName, age, bio, fame, mainfoto from users where gender = ? AND id != ? ORDER BY distance, age'
    var lookfor = await connection.query(qr, [adress.longitude, adress.latitude, gender, id])
    if (lookfor.length > 0){
        lookfor = JSON.stringify(lookfor)
        lookfor = JSON.parse(lookfor)
        return lookfor
    }
    return false
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


exports.getList = async function (id) {
    const lookfor = await getlookfor(id)
    const Adress = await getAdress(id)
    const users = await getUsers(Adress, lookfor, id)
    for (let i = 0; i < users.length; i++)
    {
        // if (users[i].distance > 10000)
        //     users.splice(i, 1);
        var tags = await getTags(users[i].login)
        users[i].tags = tags
    }
    return users
    // console.log(users)
}

exports.seen = async function (body) {
    var qr = 'insert into seen (login, viewer) values (?, ?)'
    await connection.query(qr, [body.login, body.viewer])
}

exports.like = async function (body) {
    var qr = 'insert into liked (login, liked) values (?, ?)'
    await connection.query(qr, [body.login, body.liked])
}

exports.dislike = async function (body) {
    var qr = 'DELETE from liked Where login = ? AND liked = ?'
    // console.log(body)
    await connection.query(qr, [body.login, body.liked])
}

exports.checkLike = async function (body) {
    // console.log(body)
    var qr = 'select * from liked Where login = ? AND liked = ?'
    const res = await connection.query(qr, [body.login, body.liked])
    if (res.length > 0)
        return false
    return true
}