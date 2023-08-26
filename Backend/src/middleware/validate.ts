// validation middleware for register and login

import { Request, Response, NextFunction } from "express";

const validateRequestBody =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
      });
      next();
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  };

export default validateRequestBody;
