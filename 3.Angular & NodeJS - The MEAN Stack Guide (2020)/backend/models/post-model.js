// --------------------
// IMPORT
// --------------------
const
  mongoose = require('mongoose');



// --------------------
// SETUP
// --------------------
const postSchema = mongoose.Schema({
  title:     { type: String, required: true },
  content:   { type: String, required: true },
  imagePath: { type: String, required: true },
  creator:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});



// --------------------
// EXPORT
// --------------------
module.exports = mongoose.model('Post', postSchema);
