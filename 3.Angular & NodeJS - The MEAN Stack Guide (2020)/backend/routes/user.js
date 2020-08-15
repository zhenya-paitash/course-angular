// IMPORT -------------------------------------------------------------------------
const
  router = require('express').Router(),
  User = require('../models/user-model'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken');


// SETUP --------------------------------------------------------------------------
// URL ----------------------------------------------------------------------------
// signup:
router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hashed => {
      const newUser = new User({
        email:    req.body.email,
        password: hashed
      });
      newUser.save()
        .then(user => {
          res.status(201).json({
            message: 'User created!',
            result: user
          })
        })
        .catch(err => {
          res.status(500).json({
            error: {
              message: "Invalid authentication credentials!"
            }
          })
        })
    });
});

// login:
router.post('/login', (req, res) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed!'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed!'
        })
      }

      // TOKEN_SECRET_KEY: require('crypto').randomBytes(64).toString('hex')
      const token = jwt.sign(
        {email: fetchedUser.email, id: fetchedUser._id},
        process.env.TOKEN_SECRET_KEY,
        {expiresIn: "1h"}
      );
      res.status(200).json({token, expiresIn: 3600, userId: fetchedUser._id});
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Invalid authentication credentials!'
      });
    })
});


// EXPORT -------------------------------------------------------------------------
module.exports = router;
