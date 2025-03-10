import { Router } from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authorize, getAllUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.put("/update/:id", authorize, updateUser);

export default userRouter;
