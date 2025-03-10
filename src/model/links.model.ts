import mongoose from "mongoose";

const linksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Link name is required"],
      trim: true,
      minLength: [3, "Name cannot be less than 3 characters"],
      maxLength: [50, "Name cannot be more than 50 characters"],
    },
    link: {
      type: String,
      required: [true, "Link Url is required"],
      trim: true,
      minLength: [8, "Link cannot be less than 8 characters"],
      maxLength: [150, "Link cannot be more than 150 characters"],
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner id is required"],
      index: true,
    },
    icon: {
      type: String,
      trim: true,
      required: [true, "Link icon url is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Links = mongoose.model("Links", linksSchema);

export default Links;
