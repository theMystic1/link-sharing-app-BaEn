import { Router } from "express";
import { createUser, loginUser } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", createUser);

authRouter.post("/login", loginUser);

authRouter.post("logout", (req, res, next) => {
  res.send("User logged out successfully");
});

export default authRouter;
