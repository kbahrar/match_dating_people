const jwt = require('jsonwebtoken');
const {authentication} = require('../config/config')
const authModel = require('../models/auth')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const id = parseInt(req.params.id) || req.body.info.id
    const decodedToken = jwt.verify(token, authentication.jwtSecret);
    const userId = decodedToken.id;
    if (id && id !== userId) {
      throw 'Invalid user ID';
    }
    else if (!await authModel.checkAccess(id)) {
      throw 'invalide access'
    }
    else {
      next();
    }
  } catch (err) {
    res.status(401).send({
      error: 'Unauthorized request!'
    });
  }
};