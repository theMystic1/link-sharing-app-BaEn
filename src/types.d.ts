// src/types.d.ts
import { Request } from "express";
import { IUSER } from "./model/user.model.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUSER;
  }
}
