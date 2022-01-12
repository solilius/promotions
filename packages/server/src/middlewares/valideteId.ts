import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../utils/types";

export const valideteId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    if (!req.params?.id) {
      
      return res.status(StatusCodes.BadRequest).send('No id provided');
    }

  next();
}
