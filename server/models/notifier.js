const connection = require('../config/database')

async function getlogin (id) {
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

async function getNotRead(login) {
    const qr = "select count(*) as cnt from notification WHERE seen = 0 AND login = ?"
    var count = await connection.query(qr, [login])
    count = JSON.stringify(count[0])
    count = JSON.parse(count)
    count = parseInt(count.cnt)
    return count
}

exports.getNotif = async function (id) {
    var login = await getlogin(id)
    var qr = 'select * from notification Where login = ? order by sendTime DESC'
    var res = await connection.query(qr, [login])
    if (res.length > 0) {
        res = JSON.stringify(res)
        res = JSON.parse(res)
        var cnt = await getNotRead(login)
        var notif = new Object()
        notif.notifs = res
        notif.count = cnt
        return notif
    }
    return false
}

exports.seenNotif = async function (id) {
    var login = await getlogin(id)
    var qr = 'UPDATE notification SET seen = 1 Where login = ?'
    var res = await connection.query(qr, [login])
}