// contains all the user related controller functions

import { Request, Response } from "express";
import User, { IUser } from "../model/user";
import bcrypt from "bcrypt";
import generateToken from "../utility/token";

// register user controller
export const registerUser = async (req: Request, res: Response) => {
  // register user to database
  try {
    const { name, email, password, type } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // save user to database
    const user = new User({
      name,
      email,
      password: hashedPassword,
      type,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({
        error: "Email already exists",
      });
    } else {
      res.status(500).json({
        error: "An error occurred",
      });
    }
  }
};

// login user controller
export const loginUser = async (req: Request, res: Response) => {
  // login user
  try {
    const { email, password } = req.body;

    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "Invalid login credentials email",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Invalid login credentials password",
      });
    }

    const token = generateToken(user._id, user.type);

    return res.status(200).json({
      "access-token": token,
      "token-type": "Bearer",
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred",
    });
  }
};
