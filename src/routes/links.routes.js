import { Router } from "express";
import {
  createLink,
  deleteLink,
  getLink,
  getLinks,
  getOwnerLink,
  updateLink,
} from "../controllers/links.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const linkRouter = Router();

linkRouter.post("/", authorize, createLink);

linkRouter.get("/", authorize, getLinks);

linkRouter.get("/:id", authorize, getLink);

linkRouter.get("/owner/:id", authorize, getOwnerLink);

linkRouter.put("/:id", authorize, updateLink);

linkRouter.delete("/:id", authorize, deleteLink);

export default linkRouter;
