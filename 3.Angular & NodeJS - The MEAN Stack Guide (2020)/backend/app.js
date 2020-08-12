// IMPORT -------------------------------------------------------------------------
const
  express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  postRoutes = require('./routes/posts'),
  env = require('dotenv'),
  app = express();


// SETUP --------------------------------------------------------------------------
env.config();
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('\x1b[32m%s\x1b[0m', 'Connection success!'))
  .catch(() => console.log('\x1b[31m%s\x1b[0m', 'Connection failed!'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATH, PUT, DELETE, OPTIONS');
  next();
});


// ROUTE --------------------------------------------------------------------------
app.use('/api/posts', postRoutes);


// EXPORT -------------------------------------------------------------------------
module.exports = app;
