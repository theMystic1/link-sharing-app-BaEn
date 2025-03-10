import { Router } from "express";
import { createLink } from "../controllers/links.controller.ts";
import { authorize } from "../middlewares/auth.middleware.ts";

const linkRouter = Router();

linkRouter.post("/", authorize, createLink);

linkRouter.get("/", (req, res) => {
  res.send({ title: "All links" });
});

linkRouter.get("/:id", (req, res) => {
  res.send({ message: "Link retrieved successfully" });
});

linkRouter.get("/owner/:id", (req, res) => {
  res.send({ message: " owner Links retrieved successfully successfully" });
});

linkRouter.put("/:id", (req, res) => {
  res.send({ message: "Link updated successfully" });
});

linkRouter.delete("/:id", (req, res) => {
  res.send({ message: "Link deleted successfully" });
});

export default linkRouter;
