const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  first_name: {type: String, default: null},
  last_name: {type: String, default: null},
  email: {type: String, default: null, unique: true},
  password: {type: String, default: null},
  token: {type: String, default: null}
})

exports = mongoose.Model("user", userSchema);

