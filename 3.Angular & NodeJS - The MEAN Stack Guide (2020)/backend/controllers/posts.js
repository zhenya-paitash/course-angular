// --------------------
// IMPORT
// --------------------
const
  Post = require('../models/post-model');


// --------------------
// EXPORT
// --------------------
exports.getAll = (req, res) => {
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
};


exports.getById = (req, res) => {
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
};


exports.createPost = (req, res) => {
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
};


exports.updatePost = (req, res) => {
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
      if (upd.n > 0) {
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
};


exports.deletePost = (req, res) => {
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
};
