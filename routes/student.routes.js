import express from "express";
import {makepdf,registeruser,loginuser} from "../controllers/student.controllers.js"
const UserRouter = express.Router();

UserRouter.post("/pdf",makepdf);
UserRouter.post("/register",registeruser);
UserRouter.post("/login",loginuser);
export default UserRouter;
