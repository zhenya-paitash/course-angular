// IMPORT -------------------------------------------------------------------------
const
  router = require('express').Router(),
  Post = require('../models/post-model'),
  multer = require('multer');


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
});

// createPost:
router.post('/', multer({storage}).single('image'), (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    _id:       req.body.id,
    title:     req.body.title,
    content:   req.body.content,
    imagePath: url + '/images/' + req.file.filename
  });
  post.save().then(newPost => {
    res.status(201).json({
      message: 'Post added successfully',
      post: {
        ...newPost,
        id: newPost._id,
      }
    });
  });
});

// updatePost:
router.put('/:id', multer({storage}).single('image'), (req, res) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;
  }

  const post = new Post({
    _id:       req.body.id,
    title:     req.body.title,
    content:   req.body.content,
    imagePath
  });
  Post.updateOne({_id: req.params.id}, post)
    .then(upd => {
      res.status(200).json({
        message: `Update post ${req.params.id} successful!`
      })
    })
});

// deletePost:
router.delete('/:id', (req, res) => {
  Post.deleteOne({_id: req.params.id})
    .then(del => {
      res.status(200).json({message: 'Post deleted!'});
    })
});


// EXPORT -------------------------------------------------------------------------
module.exports = router;
