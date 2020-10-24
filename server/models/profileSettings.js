const connection = require('../config/database');


const updateinformations = async function (req, res) {
    if(req.informations.age && req.informations.email && req.informations.firstName && req.informations.lastName)
    {

        const query1 = "UPDATE users SET age = ?, email = ?, firstName = ?, lastName = ? WHERE login = ?";
        await connection.query(query1, [req.informations.age, req.informations.email, req.informations.firstName , req.informations.lastName, req.info.login]);
        return true
    }
    else if(req.informations.age && !req.informations.email && !req.informations.firstName && !req.informations.lastName)
    {
        const query1 = "UPDATE users SET age = ? WHERE login = ?";
        await connection.query(query1, [req.informations.age, req.info.login]);
        return true
    }
    else if (!req.informations.age && req.informations.email && !req.informations.firstName && !req.informations.lastName)
    {
        const query1 = "UPDATE users SET email = ?  WHERE login = ?";
        await connection.query(query1, [req.informations.age, req.informations.email, req.informations.firstName , req.informations.lastName, req.info.login]);
        return true
    }
    else if (!req.informations.age && !req.informations.email && req.informations.firstName && !req.informations.lastName)
    {
        const query1 = "UPDATE users SET firstName = ? WHERE login = ?";
        await connection.query(query1, [req.informations.firstName , req.info.login]);
        return true
    }
    else if(!req.informations.age && !req.informations.email && !req.informations.firstName && req.informations.lastName)
    {
        const query1 = "UPDATE users SET lastName = ? WHERE login = ?";
        await connection.query(query1, [req.informations.lastName, req.info.login]);
        return true
    }
    // console.log(check)
}

module.exports = {updateinformations};