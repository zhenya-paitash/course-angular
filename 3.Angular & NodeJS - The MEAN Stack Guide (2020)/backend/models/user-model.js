// --------------------
// IMPORT
// --------------------
const
  mongoose        = require('mongoose'),
  uniqueValidator = require('mongoose-unique-validator');



// --------------------
// SETUP
// --------------------
const userSchema = mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);



// --------------------
// EXPORT
// --------------------
module.exports = mongoose.model('User', userSchema);
