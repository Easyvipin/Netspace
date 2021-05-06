import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  try {
    const decode = await jwt.verify(
      req.cookies.userToken,
      process.env.TOKEN_SECRET
    );
    const existUser = await User.findById(decode.id).select("-password").exec();
    if (existUser) {
      req.userId = decode.id;
      next();
    }
  } catch (err) {
    res.status(403);
    throw new Error("Token not valid");
  }
});
