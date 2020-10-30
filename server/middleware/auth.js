const jwt = require('jsonwebtoken');
const {authentication} = require('../config/config')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    const decodedToken = jwt.verify(token, authentication.jwtSecret);
    const userId = decodedToken.id;
    if (req.body.info.id && req.body.info.id !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (err) {
    res.status(401).send({
      error: 'Unauthorized request!'
    });
  }
};