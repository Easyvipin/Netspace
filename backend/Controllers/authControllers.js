import { OAuth2Client } from "google-auth-library";
import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import { genUsername } from "../util/genUsername.js";
import { createToken } from "../util/createToken.js";

const client = new OAuth2Client(process.env.CLIENT_GOOGLE_AUTH);

/* 
@desc verify the google token id
@route api/auth/google
@request Post
*/
export const verifyGoogleToken = asyncHandler(async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.get("AUTH_TOKEN"),
      audience: process.env.CLIENT_GOOGLE_AUTH,
    });

    console.log(ticket);

    const payload = ticket.getPayload();
    /* payload data */
    /* sub */
    /* picture */
    /* given_name */
    /* family_name */
    /* email */
    /* email_verified */
    const data = {
      userid: payload["sub"],
      firstname: payload["given_name"],
      fullname: `${payload["given_name"] + " " + payload["family_name"]}`,
      email: payload["email"],
    };
    /* attaching the data for signup completion */
    req.userData = data;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Token is invalid");
  }
});

/* SIGNUP */

export const signup = asyncHandler(async (req, res) => {
  const { userid, fullname, firstname, email } = req.userData;

  let existUser = await User.findOne({ oauthId: userid });

  /* if the user exists */
  if (existUser) {
    res.cookie("userToken", createToken(existUser._id), {
      httpOnly: true /* PREVENT FROM XSS  */,
      secure: true /* HTTPS */,
      sameSite: "strict" /* PREVENT CROSS SITE CSRF */,
    });

    res.send({
      username: existUser.username,
    });
  } else {
    /* insert the user */
    let user = await User.create({
      username: genUsername(firstname),
      oauthId: userid,
      fullname,
      email,
    });
    if (user) {
      res.cookie("userToken", createToken(user._id), {
        httpOnly: true /* PREVENT FROM XSS  */,
        secure: true /* HTTPS */,
        sameSite: "strict" /* PREVENT CROSS SITE CSRF */,
      });
      res.json({
        username: user.username,
      });
    }
  }
});

/* email Registration */
/* 
@desc Register user with email id
@route api/auth/register
@request Post
*/
export const emailRegister = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  /* creating a new user document */
  const newUser = await User.create({
    fullname,
    username: genUsername(fullname),
    email,
    password,
  });

  if (newUser) {
    res.cookie("userToken", createToken(newUser._id), {
      httpOnly: true /* PREVENT FROM XSS  */,
      secure: true /* HTTPS */,
      sameSite: "strict" /* PREVENT CROSS SITE CSRF */,
    });
    res.json({
      message: "Account Created",
      customMessage: `Welcome ${newUser.fullname}`,
    });
  } else {
    res.status(400);
    throw new Error("Incorrect Information");
  }
});

/* email Login */
/* 
@desc login user with email id
@route api/auth/login
@request Post
*/
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  /* creating a new user document */
  const existUser = await User.findOne({ email: email });

  if (existUser && (await existUser.matchPassword(password))) {
    res.cookie("userToken", createToken(existUser._id), {
      expire: "3600000000",
      httpOnly: true /* PREVENT FROM XSS  */,
      secure: true /* HTTPS */,
      sameSite: "strict" /* PREVENT CROSS SITE CSRF */,
    });
    res.json({
      message: "Login successfully",
      customMessage: `Welcome ${existUser.fullname}`,
    });
  } else {
    const message = existUser
      ? "Password is Incorrect"
      : "Email does not exist";
    res.status(400);
    throw new Error(`${message}`);
  }
});
