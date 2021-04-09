import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: String,
});

const Post = mongoose.model("Post", postSchema);

export default Post;
