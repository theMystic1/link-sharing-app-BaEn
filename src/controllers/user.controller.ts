import { Request, Response, NextFunction } from "express";
import User from "../model/user.model.ts";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      message: "Users retrieved successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User retrieved successfully", data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params;
  const update = req.body;
  try {
    const currentUser = await User.findById(id);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updated = await User.findByIdAndUpdate(id, update, {
      new: true,
    });

    res.status(200).json({
      message: "User updated successfully",
      data: updated,
    });

    next();
  } catch (error) {
    next(error);
  }
};
