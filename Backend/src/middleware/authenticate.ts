// authenticate the user middleware using jwt

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );

    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
};

export default verifyUserToken;
