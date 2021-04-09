import mongoose from "mongoose";
import connectDb from "./Config/connectDb.js";
import dotenv from "dotenv";
import User from "./Models/userModel.js";
import Friend from "./Models/friendsModel.js";
import Post from "./Models/postModel.js";
import Users from "./data/userData.js";
import Friendsdata from "./data/friendsData.js";
import posts from "./data/post.js";

dotenv.config();

connectDb();

const importData = async () => {
  try {
    await Post.deleteMany();
    const allPost = await Post.insertMany(posts);
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
