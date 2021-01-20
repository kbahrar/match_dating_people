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
async function getFame (login) {
    var qr = "select fame from users where login = ?"
    var fame = await connection.query(qr, [login])
    fame = JSON.stringify(fame[0])
    fame = JSON.parse(fame)
    fame = parseInt(fame.fame)
    return fame
}

async function getAdress (id) {
    const qr = 'select latitude, longitude from users where id = ?'
    var lookfor = await connection.query(qr, [id])
    if (lookfor.length > 0){
        lookfor = JSON.stringify(lookfor[0])
        lookfor = JSON.parse(lookfor)
        return lookfor
    }
    return false
}

async function getUsers (adress, gender, id) {
    var qr = 'select id, login, FLOOR(ST_Distance_Sphere(point(?, ?), point(longitude, latitude)) / 1000) as distance, firstName, lastName, age, bio, fame, mainfoto from users where id != ? AND access = true '
    if (gender != 'Others')
        qr += "AND gender = ? "
    qr += "ORDER BY distance, age"
    var lookfor = await connection.query(qr, [adress.longitude, adress.latitude, id, gender])
    // console.log(gender)
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

async function getBlockList (id) {
    var list = []
    const query = "select login from users where id = ?"
    var login = await connection.query(query, [id])
    login = JSON.stringify(login[0])
    login = JSON.parse(login)
    login = login.login
    const qr = "select * from blocked where login = ? OR user = ?"
    var blockers = await connection.query(qr, [login, login])
    if (blockers.length > 0) {
        blockers = JSON.stringify(blockers)
        blockers = JSON.parse(blockers)
        for (let i = 0; i < blockers.length; i++) {
            if (blockers[i].user == login)
                list[i] = blockers[i].login
            else
                list[i] = blockers[i].user
        }
    }
    return list
}

exports.getList = async function (id) {
    const blockers = await getBlockList(id)
    const lookfor = await getlookfor(id)
    const Adress = await getAdress(id)
    var users = await getUsers(Adress, lookfor, id)
    // console.log(blockers, lookfor, Adress)
    if (users)
        users = users.filter(user => user.distance < 150)
    for (let i = 0; i < users.length; i++)
    {
        var tags = await getTags(users[i].login)
        users[i].tags = tags
        for (let j = 0; j < blockers.length; j++) {
            if (users[i].login == blockers[j]) { 
                users.splice(i, 1);
            }
        }
    }
    return users
}

exports.seen = async function (body) {
    var qr = 'insert into seen (login, viewer, action_date) values (?, ?, NOW())'
    await connection.query(qr, [body.login, body.viewer])
}

exports.checkReport = async function (body) {
    var qr = 'SELECT * from report where login = ? AND reporter = ?'
    var check = await connection.query(qr, [body.login, body.reporter])
    if (check.length > 0) {
        return false
    }
    return true
}

exports.checkBlock = async function (body) {
    var qr = 'SELECT * from blocked where login in (?, ?) AND user in (?, ?)'
    var check = await connection.query(qr, [body.login, body.user, body.login, body.user])
    if (check.length > 0) {
        return false
    }
    return true
}

exports.block = async function (body) {
    var qr = 'insert into blocked (login, user) values (?, ?)'
    await connection.query(qr, [body.login, body.user])
    var qr = 'UPDATE users set fame = fame - 500 where login = ?'
    await connection.query(qr, [body.user])
}

exports.report = async function (body) {
    var qr = 'insert into report (login, reporter) values (?, ?)'
    await connection.query(qr, [body.login, body.reporter])
    qr = 'UPDATE users set fame = fame - 500 where login = ?'
    await connection.query(qr, [body.login])
    var fame = await getFame(body.login)
    if (fame <= 0) {
        qr = 'UPDATE users set access = false where login = ?'
        await connection.query(qr, [body.login])
        qr = 'DELETE FROM matched WHERE login = ? OR matched = ?'
        await connection.query(qr, [body.login, body.login])
        qr = 'DELETE FROM liked WHERE login = ?'
        await connection.query(qr, [body.login])
        qr = 'DELETE FROM seen WHERE viewer = ?'
        await connection.query(qr, [body.login])
    }
}

exports.like = async function (body) {
    var qr = 'insert into liked (login, liked, action_date) values (?, ?, NOW())'
    await connection.query(qr, [body.login, body.liked])
}

exports.dislike = async function (body) {
    var qr = 'DELETE from liked Where login = ? AND liked = ?'
    await connection.query(qr, [body.login, body.liked])
}

exports.checkLike = async function (body) {
    var qr = 'select * from liked Where login = ? AND liked = ?'
    const res = await connection.query(qr, [body.login, body.liked])
    if (res.length > 0)
        return false
    return true
}