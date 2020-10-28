const jwt = require('jsonwebtoken');
const {authentication} = require('../config/config')

module.exports = (req, res, next) => {
  console.log('op')
  try {
    console.log('hi')
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    const decodedToken = jwt.verify(token, authentication.jwtSecret);
    console.log(decodedToken)
    const userId = decodedToken.id;
    if (req.body.info.id && req.body.info.id !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};