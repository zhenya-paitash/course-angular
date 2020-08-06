// ===================== imports ===========================
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express();


// ===================== config ===========================
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
app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'asdzxc123',
      title: 'First post',
      content: 'this is my first post from backend'
    },
    {
      id: 'qwejkl678',
      title: 'Second post',
      content: 'this is my second post from backend'
    }
  ];

  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts
  });
});

app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});


// ===================== export ===========================
module.exports = app;
