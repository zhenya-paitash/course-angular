// IMPORT -------------------------------------------------------------------------
const
  express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  postRoutes = require('./routes/posts'),
  env = require('dotenv'),
  app = express();


// SETUP --------------------------------------------------------------------------
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


// ROUTE --------------------------------------------------------------------------
app.use('/api/posts', postRoutes);


// EXPORT -------------------------------------------------------------------------
module.exports = app;
