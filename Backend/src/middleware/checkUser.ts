// check user type middleware

import { NextFunction, Request, Response } from "express";

const checkUserType =
  (userType: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    // check if user is of type userType
    try {
      if (req.user.type !== userType) {
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
