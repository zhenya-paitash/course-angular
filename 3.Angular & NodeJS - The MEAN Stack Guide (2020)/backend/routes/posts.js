// --------------------
// IMPORT
// --------------------
const
  router          = require('express').Router(),
  PostController  = require('../controllers/posts'),
  authCheck       = require('../middleware/auth-check'),
  extractFile     = require('../middleware/file');


// --------------------
// ROUTE
// --------------------
router.get('/',                               PostController.getAll);
router.get('/:id',                            PostController.getById);
router.post('/',      authCheck, extractFile, PostController.createPost);
router.put('/:id',    authCheck, extractFile, PostController.updatePost);
router.delete('/:id', authCheck,              PostController.deletePost);



// --------------------
// EXPORT
// --------------------
module.exports = router;
