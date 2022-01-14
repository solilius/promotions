import { Request, Response, NextFunction } from "express";

import { schema } from "./schemas/promotion.schema";
import { StatusCodes } from "../utils/types";

export const promotionValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = schema.validate(req.body);
  if (validate.error) {
    const errorMsg = validate.error.details?.shift()?.message || 'Bad Promotion';

    return res.status(StatusCodes.BadRequest).send(errorMsg);
  }

  next();
}