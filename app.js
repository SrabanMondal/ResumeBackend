import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import cors from "cors"
import UserRouter from "./routes/student.routes.js"
import connectDb from "./config/database.js"
dotenv.config();
connectDb();
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
  }));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/user",UserRouter);
export default app;