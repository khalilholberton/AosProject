const { model, Schema } = require("mongoose");

const us = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  sharedPosts: [String],
});

module.exports = model("User", us);
