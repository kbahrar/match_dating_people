const connection = require('../config/database');

async function getMsgs (login, user) {
    const qr = "select * from message where login in (?, ?) AND user in (?, ?) ORDER by sendTime"
    var msgs = await connection.query(qr, [login, user, login, user])
    msgs = JSON.stringify(msgs)
    msgs = JSON.parse(msgs)
    return msgs
}

async function getCountMsgs (login, user) {
    const qr = "select count(*) as cnt from message where login = ? AND user = ? AND seen = 1"
    var count = await connection.query(qr, [user, login])
    count = JSON.stringify(count[0])
    count = JSON.parse(count)
    count = parseInt(count.cnt)
    return count
}

exports.checkMatched = async function (login, user) {
    const qr = "select * from matched where login in (?, ?) AND matched in (?, ?)"
    var match = await connection.query(qr, [login, user, login, user])
    if (match.length > 0)
        return true
    return false
}

exports.getMatched = async function (login) {
    var query1 = "SELECT * from matched WHERE login = ? OR matched = ?";
    var matched = await connection.query(query1, [login, login]);
    if (matched.length == 0)
        return false
    matched = JSON.stringify(matched)
    matched = JSON.parse(matched)
    query1 = "SELECT u.id, u.login, u.firstName, u.lastName, u.mainFoto, m.last_used from matched m, users u WHERE u.login in (m.login, m.matched) AND  u.login in ("
    var logins = []
    for (let i = 0; i < matched.length; i++) {
        query1 += '?'
        if (i < matched.length - 1)
            query1 += ', '
        if (matched[i].login == login)
            logins[i] = matched[i].matched
        else
            logins[i] = matched[i].login
    }
    query1 += ') AND m.matched in (?'
    var j = logins.length
    logins[j++] = login
    for (let i = 0; i < matched.length; i++) {
        if (i == 0)
            query1 += ', '
        query1 += '?'
        if (i < matched.length - 1)
            query1 += ', '
        if (matched[i].login == login)
            logins[j++] = matched[i].matched
        else
            logins[j++] = matched[i].login
    }
    query1 += ') AND m.login in (?'
    j = logins.length
    logins[j++] = login
    for (let i = 0; i < matched.length; i++) {
        if (i == 0)
            query1 += ', '
        query1 += '?'
        if (i < matched.length - 1)
            query1 += ', '
        if (matched[i].login == login)
            logins[j++] = matched[i].matched
        else
            logins[j++] = matched[i].login
    }
    query1 +=  ') order by m.last_used DESC'
    var users = await connection.query(query1, logins);
    users = JSON.stringify(users)
    users = JSON.parse(users)
    for (let i = 0; i < users.length; i++) {
        users[i].msgs = await getMsgs(login, users[i].login)
        users[i].count = await getCountMsgs(login, users[i].login)
    }
    return users
}

exports.sendMsg = async function (login, user, message) {
    var qr = "INSERT INTO message (login, sendTime, user, message, seen) values (?, NOW(), ?, ?, 1)"
    await connection.query(qr, [login, user, message])
    var qr = "INSERT INTO notification (login, sendTime, type, message, seen) values (?, NOW(), 'message you !', ?, 0)"
    await connection.query(qr, [user, login])
    var qr = "UPDATE matched SET last_used = now() WHERE login in (?, ?) AND matched in (?, ?)"
    await connection.query(qr, [login, user, login, user])
}

exports.getMsgs = async function (login, user) {
    var qr = "select * from message where login in (?, ?) AND user in (?, ?)"
    var msgs = await connection.query(qr, [login, user, login, user])
    msgs = JSON.stringify(msgs)
    msgs = JSON.parse(msgs)
    var cnt = await getCountMsgs(login, user)
    return {msgs: msgs, count: cnt}
}

exports.seenMsgs = async function (login, user) {
    var qr = "UPDATE message SET seen = 0 where login = ? AND user = ?"
    await connection.query(qr, [login, user, login, user])
}