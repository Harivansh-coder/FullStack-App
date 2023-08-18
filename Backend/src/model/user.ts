// contains all the user related models

import mongoose from "mongoose";

// interface for the user model
export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  type: string;
}

// interface for the user schema
export interface IUserSchema extends mongoose.Schema {
  comparePassword(password: string): boolean;
}

// user schema
const userSchema = new mongoose.Schema(
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
      enum: ["customer", "seller"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);
