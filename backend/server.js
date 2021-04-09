import express from "express";
import dotenv from "dotenv";
import connectDb from "./Config/connectDb.js";
import User from "./Models/userModel.js";
import Friend from "./Models/friendsModel.js";
import Post from "./Models/postModel.js";
const app = express();

const port = 5000;

dotenv.config();

connectDb();

app.get("/", async () => {
  const posts = await Post.find();

  const allPost = posts.map((post) => {
    return post._id;
  });

  console.log(allPost);
});

app.get("/post", async () => {
  try {
    const userPost = await User.findOne({
      username: "vipin",
    }).populate("posts");

    console.log(userPost);
  } catch (error) {}
});

app.listen(port, () => {
  console.log("Connected");
});
