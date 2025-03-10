import User from "../model/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      message: "Users retrieved successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
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

export const updateUser = async (req, res, next) => {
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
