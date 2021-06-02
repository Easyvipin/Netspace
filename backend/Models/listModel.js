import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    listName: {
      type: String,
      required: true,
    },
    list: [
      {
        listType: {
          type: String,
          required: true,
        },
        mediaId: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      reference: "user",
    },
  },
  { timestamps: true }
);

const List = mongoose.model("List", listSchema);

export default List;
