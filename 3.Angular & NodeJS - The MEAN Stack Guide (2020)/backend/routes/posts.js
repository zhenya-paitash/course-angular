// IMPORT -------------------------------------------------------------------------
const
  router = require('express').Router(),
  Post = require('../models/post-model');


// URL ----------------------------------------------------------------------------
router.get('/', (req, res) => {
  Post.find().then(posts => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts
    });
  });
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({message: 'Post not found!'})
      }
    })
});

router.post('/', (req, res) => {
  const post = new Post({
    _id:      req.body.id,
    title:    req.body.title,
    content:  req.body.content
  });
  post.save().then(newPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: newPost._id
    });
  });
});

router.put('/:id', (req, res) => {
  const post = new Post({
    _id:      req.body.id,
    title:    req.body.title,
    content:  req.body.content
  });
  Post.updateOne({_id: req.params.id}, post)
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: `Update post ${req.params.id} successful!`
      })
    })
});

router.delete('/:id', (req, res) => {
  Post.deleteOne({_id: req.params.id})
    .then(deleted => {
      res.status(200).json({message: 'Post deleted!'});
    })
});


// EXPORT -------------------------------------------------------------------------
module.exports = router;
