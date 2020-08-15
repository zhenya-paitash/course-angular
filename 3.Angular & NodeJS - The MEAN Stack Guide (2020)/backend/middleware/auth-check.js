const
  jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedJWT = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.userData = {
      email: decodedJWT.email,
      id:    decodedJWT.id
    };
    next();
  } catch (e) {
    res.status(401).json({
      message: 'You are not authenticated!'
    })
  }
};
