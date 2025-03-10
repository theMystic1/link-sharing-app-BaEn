import Links from "../model/links.model.js";
import User from "../model/user.model.js";

export const createLink = async (req, res, next) => {
  try {
    const createdLinks = await Links.create({
      ...req.body,
      owner_id: req?.user?._id, // Only use if req.user is confirmed to exist
    });

    res.status(201).json({
      success: true,
      message: "Link created successfully",
      data: createdLinks,
    });
  } catch (error) {
    console.error("Error creating link:", error.message);
    next(error); // Pass error to global error handler
  }
};

export const getLinks = async (req, res, next) => {
  try {
    const links = await Links.find({});

    res.status(200).json({
      success: true,
      message: "Links retrieved successfully",
      data: links,
    });
  } catch (error) {
    next(error); // Pass error to global
  }
};

export const getLink = async (req, res, next) => {
  try {
    const { id } = req.params;

    const link = await Links.findById(id);
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json({
      success: true,
      message: "Link retrieved successfully",
      data: link,
    });
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

export const getOwnerLink = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Link owner does not exist" });
    }

    const links = await Links.find({ owner_id: id });
    if (!links) {
      return res.status(404).json({ message: "No links found for this owner" });
    }

    res.status(200).json({
      success: true,
      message: "Links retrieved successfully",
      data: links,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLink = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedLink = await Links.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedLink) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json({
      success: true,
      message: "Link updated successfully",
      data: updatedLink,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLink = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedLink = await Links.findByIdAndDelete(id);
    if (!deletedLink) {
      return res.status(404).json({ message: "Link not found" });
    }
    res.status(200).json({
      success: true,
      message: "Link deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
