const connection = require('../config/database')

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

async function getUsers(adress, lookfor, id, infos) {
    var data = []
    var i = 4
    var qr = "select DISTINCT u.id, u.login, FLOOR(ST_Distance_Sphere(point(?, ?), point(u.longitude, u.latitude)) / 1000) as distance, u.firstName, u.lastName, u.age, u.bio, u.fame, u.mainfoto from users u, tags t where u.gender = ? AND u.id != ? AND t.login = u.login AND u.access = true "
    data[0] = adress.longitude
    data[1] = adress.latitude
    data[2] = lookfor
    data[3] = id
    if (infos.age) {
        qr += "AND age BETWEEN ? AND ? "
        data[i++] = infos.age.min
        data[i++] = infos.age.max
    }
    if (infos.fame) {
        qr += "AND fame BETWEEN ? AND ? "
        data[i++] = infos.fame.min
        data[i++] = infos.fame.max
    }
    if (infos.city) {
        qr += "AND city = ?"
        data[i++] = infos.city
    }
    if (infos.tags && infos.tags.length > 0) {
        qr += "AND t.tag IN ("
        for (let j = 0; j < infos.tags.length; j++) {
            qr += " ?"
            data[i++] = infos.tags[j]
            if (j < infos.tags.length - 1)
                qr += ", "
        }
        qr += ")"
    }
    qr += " ORDER BY distance, age"
    var lookfor = await connection.query(qr, data)
    if (lookfor.length > 0){
        lookfor = JSON.stringify(lookfor)
        lookfor = JSON.parse(lookfor)
        return lookfor
    }
    return false
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

exports.search = async function (id, info) {
    const blockers = await getBlockList(id)
    const lookfor = await getlookfor(id)
    const Adress = await getAdress(id)
    const users = await getUsers(Adress, lookfor, id, info)
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