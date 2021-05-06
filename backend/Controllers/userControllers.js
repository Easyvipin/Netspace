import List from "../Models/listModel.js";
import asyncHandler from "express-async-handler";

/* @desc create a Default list */
/* @route /api/v1/user/list/default */
/* @access private*/

export const defaultList = asyncHandler(async (req, res) => {
  const { type, id } = req.body;
  const { userId } = req;
  try {
    const existUser = await List.findOne({ listName: "Default", user: userId });
    if (existUser) {
      const { list } = existUser;
      existUser.list = [
        {
          listType: type,
          mediaId: id,
        },
        ...list,
      ];
      await existUser.save();
      res.send({
        success: true,
        Message: "Successfully Added",
      });
    } else {
      const newUser = await List.create({
        listName: "Default",
        list: [
          {
            listType: type,
            mediaId: id,
          },
        ],
        user: userId,
      });
      res.send({
        success: true,
        Message: "Successfully Added",
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

/* @desc create a custom list with list */
/* @route /api/v1/user/list/custom */
/* @access private */

export const customList = asyncHandler(async (req, res) => {
  const { listName, type, id } = req.body;

  const { userId } = req;
  try {
    const existUser = await List.findOne({ listName: listName, user: userId });
    if (existUser) {
      console.log("called exist");
      const { list } = existUser;
      existUser.list = [
        {
          listType: type,
          mediaId: id,
        },
        ...list,
      ];
      await existUser.save();
      res.send({
        success: true,
        Message: "Successfully Added",
      });
    } else {
      console.log("called new");
      const newUser = await List.create({
        listName: listName,
        list: [
          {
            listType: type,
            mediaId: id,
          },
        ],
        user: userId,
      });
      res.send({
        success: true,
        Message: "Successfully Added",
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

/* @desc create a list */
/* @route /api/v1/user/list/create */
/* @access private */

export const createList = asyncHandler(async (req, res) => {
  const { listName } = req.body;
  const { userId } = req;
  try {
    const existUser = await List.findOne({ listName: listName, user: userId });
    if (existUser) {
      res.send({
        success: false,
        Message: "List Already Added",
      });
    } else {
      const newUser = await List.create({
        listName: listName,
        user: userId,
      });
      res.send({
        success: true,
        Message: `${listName} Created`,
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});
