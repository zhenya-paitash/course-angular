// ===================== imports ===========================
const
  express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Post = require('./models/post-model'),
  env = require('dotenv'),
  app = express();


// ===================== config ===========================
env.config();
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connection success!'))
  .catch(() => console.log('Connection failed!'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATH, PUT, DELETE, OPTIONS');
  next();
});


// ===================== URL ===========================
app.get('/api/posts', (req, res) => {
  Post.find().then(posts => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts
    });
  });
});

app.post('/api/posts', (req, res) => {
  const post = new Post({
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

app.delete('/api/posts/:id', (req, res) => {
  Post.deleteOne({_id: req.params.id})
    .then(deleted => {
      console.log(deleted);
      res.status(200).json({message: 'Post deleted!'});
    })
});


// ===================== export ===========================
module.exports = app;
