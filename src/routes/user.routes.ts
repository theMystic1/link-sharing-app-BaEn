import { Router } from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller.ts";
import { authorize } from "../middlewares/auth.middleware.ts";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUser);

userRouter.put("/update/:id", updateUser);

export default userRouter;
