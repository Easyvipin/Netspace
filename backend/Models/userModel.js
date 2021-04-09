import mongoose from "mongoose";
import Friend from "./friendsModel.js";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
