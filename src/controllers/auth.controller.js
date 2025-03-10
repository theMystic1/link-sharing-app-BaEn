import mongoose from "mongoose";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const createUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create([{ email, password: hashedPassword }], {
      session,
    });

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET);

    res.status(201).json({
      message: "User created successfully",
      data: { token: token, user: newUsers[0] },
    });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.status(200).json({
      message: "User logged in successfully",
      data: { token: token, user },
    });
  } catch (error) {
    next(error);
  }
};
