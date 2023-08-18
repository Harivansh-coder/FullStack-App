// contains all the user related controller functions

import { Request, Response } from "express";

// register user controller
export const registerUser = async (req: Request, res: Response) => {
  res.send("register user");
};

// login user controller
export const loginUser = async (req: Request, res: Response) => {
  res.send("login user");
};
