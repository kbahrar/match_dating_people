// const connection = require('../config/database');



// const fillProfile = async function (req, res) {
//   try {
    // const query1 = "INSERT INTO users WHERE login = ? AND password = ?(gender, lookingfor, city, age, bio) Values(?, ?, ?, ?, ?)";
//     await connection.query(query1, [req.mygender, req.mylookingfor, req.city, req.age,req.biography], function (err, rows, fields) {
//       if (err)
//         return console.error(err.message);
//     });
//   }
//   catch (err) {
//     res.status(400).send({
//       error: err
//     });
//   }
// }

// module.exports = {fillProfile};