import express from "express";
import dotenv from "dotenv";
/* connect db */
import connectDb from "./Config/connectDb.js";
/* auth routes */
import authRoutes from "./Routes/authRoutes/auth.js";
import userRoutes from "./Routes/userRoutes/user.js";
/* error middlewares  */
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
/* parsing cookies on req object*/
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
/* to parse incoming request of json */
app.use(express.json());

app.use(cookieParser());

/* auth api router  */
app.use("/api/v1/auth", authRoutes);
/* user api router  */
app.use("/api/v1/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

const port = 5000;

dotenv.config();

connectDb();

app.listen(port, () => {
  console.log("Connected");
});
