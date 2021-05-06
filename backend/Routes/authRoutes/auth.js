import express from "express";
import {
  verifyGoogleToken,
  signup,
  emailRegister,
  login,
} from "../../Controllers/authControllers.js";
const router = express.Router();

/* google auth */

router.route("/google").post(verifyGoogleToken, signup);
router.route("/register").post(emailRegister);
router.route("/login").post(login);

export default router;
