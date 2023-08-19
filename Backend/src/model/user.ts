// contains all the user related models

import mongoose, { Document, Schema } from "mongoose";

// interface for the user model
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  type: string;
}

// user schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["buyer", "seller"],
      default: "buyer",
    },
  },
  {
    timestamps: true,
  }
);

// export user model
const User = mongoose.model<IUser>("User", userSchema);

export default User;
