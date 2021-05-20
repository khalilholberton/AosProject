const { model, Schema } = require("mongoose");
/* import { model, Schema } from "mongoose" */

const postSc = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  done: {
    type: Boolean,
    default: false,
  },
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  sharedWith: [String],
});

module.exports = model("Post", postSc);
