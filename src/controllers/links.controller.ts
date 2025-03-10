import { Request, Response, NextFunction } from "express";
import Links from "../model/links.model.ts";

export const createLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    console.log("Request Body:", req.headers);

    const createdLinks = await Links.create({
      ...req.body,
      // owner_id: req?.user?._id, // Only use if req.user is confirmed to exist
    });

    res.status(201).json({
      success: true,
      message: "Link created successfully",
      data: createdLinks,
    });
  } catch (error: any) {
    console.error("Error creating link:", error.message);
    next(error); // Pass error to global error handler
  }
};

export const getLinks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {};

export const getLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {};

export const getOwnerLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {};

export const updateLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {};

export const deleteLink = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {};
