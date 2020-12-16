const connection = require('../config/database');


const changeage = async function (req, res) {
    if(req.age)
    {
        const query1 = "UPDATE users SET age = ? WHERE login = ?";
        await connection.query(query1, [req.informations.age]);
        return true
    }
    
    // console.log(check)
}

module.exports = {changeage};