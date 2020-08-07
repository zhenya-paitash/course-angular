// // IMPORT -------------------------------------------------------------------------
// const
//   postsRouter = require('express').Router(),
//   Post = require('../models/post-model');
//
//
// // URL ----------------------------------------------------------------------------
// postsRouter.getAll = (req, res) => {
//   Post.find().then(posts => {
//     res.status(200).json({
//       message: 'Posts fetched successfully!',
//       posts
//     });
//   });
// };
//
// postsRouter.getById = (req, res) => {
//   Post.findById(req.params.id)
//     .then(post => {
//       if (post) {
//         res.status(200).json(post)
//       } else {
//         res.status(404).json({message: 'Post not found!'})
//       }
//     })
// };
//
// postsRouter.create = (req, res) => {
//   const post = new Post({
//     _id:      req.body.id,
//     title:    req.body.title,
//     content:  req.body.content
//   });
//   post.save().then(newPost => {
//     res.status(201).json({
//       message: 'Post added successfully',
//       postId: newPost._id
//     });
//   });
// };
//
// postsRouter.update = (req, res) => {
//   const post = new Post({
//     _id:      req.body.id,
//     title:    req.body.title,
//     content:  req.body.content
//   });
//   Post.updateOne({_id: req.params.id}, post)
//     .then(result => {
//       console.log(result);
//       res.status(200).json({
//         message: `Update post ${req.params.id} successful!`
//       })
//     })
// };
//
// postsRouter.delete = (req, res) => {
//   Post.deleteOne({_id: req.params.id})
//     .then(deleted => {
//       res.status(200).json({message: 'Post deleted!'});
//     })
// };
//
//
// // EXPORT -------------------------------------------------------------------------
// module.exports = postsRouter;
