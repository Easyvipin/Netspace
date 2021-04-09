import mongoose from "mongoose";

const friendsSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Friend = mongoose.model("Friend", friendsSchema);

export default Friend;
