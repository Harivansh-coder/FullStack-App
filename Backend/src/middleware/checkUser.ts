// check user type middleware

import { NextFunction, Request, Response } from "express";

const checkUserType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check if user is seller or not
  try {
    if (req.user.type !== "seller") {
      return res.status(403).json({
        error: "unauthorized",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred",
    });
  }
};

export default checkUserType;
