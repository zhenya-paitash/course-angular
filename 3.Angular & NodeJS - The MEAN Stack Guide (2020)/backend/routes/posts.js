// IMPORT -------------------------------------------------------------------------
const
  router = require('express').Router(),
  Post = require('../models/post-model'),
  multer = require('multer'),
  authCheck = require('../middleware/auth-check');


// SETUP --------------------------------------------------------------------------
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) error = null;
    callback(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${name}-${Date.now()}.${ext}`);
  }
});


// URL ----------------------------------------------------------------------------
// getAll:
router.get('/', (req, res) => {
  const pageSize = +req.query.pagesize;
  const curPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && curPage)
    postQuery
      .skip(pageSize * (curPage - 1))
      .limit(pageSize);
  postQuery
    .then(posts => {
      fetchedPosts = posts;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Fetching posts failed!'
      })
    })
});

// getById:
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      post
        ? res.status(200).json(post)
        : res.status(404).json({message: 'Post not found!'});
      // if (post) {
      //   res.status(200).json(post)
      // } else {
      //   res.status(404).json({message: 'Post not found!'})
      // }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Fetching post failed!'
      })
    })
});

// createPost:
router.post('/', authCheck, multer({storage}).single('image'), (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    _id:       req.body.id,
    title:     req.body.title,
    content:   req.body.content,
    imagePath: url + '/images/' + req.file.filename,
    creator:   req.userData.id
  });
  post.save().then(newPost => {
    res.status(201).json({
      message: 'Post added successfully',
      post: {
        ...newPost,
        id: newPost._id,
      }
    });
  })
    .catch(err => {
      res.status(500).json({
        message: 'Creating a post failed!'
      });
    });
});

// updatePost:
router.put('/:id', authCheck, multer({storage}).single('image'), (req, res) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }

  const post = new Post({
    _id:       req.body.id,
    title:     req.body.title,
    content:   req.body.content,
    creator:   req.userData.id,
    imagePath
  });
  Post.updateOne({_id: req.params.id, creator: req.userData.id}, post)
    .then(upd => {
      if (upd.nModified > 0) {
        res.status(200).json({message: `Update post ${req.params.id} successful!`})
      } else {
        res.status(401).json({message: `Not authorized!`})
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Couldn\'t update post!'
      })
    })
});

// deletePost:
router.delete('/:id', authCheck, (req, res) => {
  Post.deleteOne({_id: req.params.id, creator: req.userData.id})
    .then(del => {
      if (del.n > 0) {
        res.status(200).json({message: 'Post deleted!'});
      } else {
        res.status(401).json({message: `Not authorized!`})
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Delete post failed!'
      })
    })
});


// EXPORT -------------------------------------------------------------------------
module.exports = router;
