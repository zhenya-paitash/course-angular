// --------------------
// EXPORT
// --------------------
const
  router          = require('express').Router(),
  UserController  = require('../controllers/user');



// --------------------
// ROUTE
// --------------------
router.post('/signup',  UserController.createUser);
router.post('/login',   UserController.userLogin);



// --------------------
// EXPORT
// --------------------
module.exports = router;
