import mongoose, { Document } from "mongoose";

// export interface IUSER extends Document {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   role: string;
//   imageUrl?: string | null;
//   createdAt: Date;
//   updatedAt: Date;
// }

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, default: "John" },
    lastName: { type: String, trim: true, default: "Doe" },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      minLength: 4,
      maxLength: 300,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
      minLength: 6,
    },
    imageUrl: { type: String },
    role: { type: String, default: "authenticated" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
