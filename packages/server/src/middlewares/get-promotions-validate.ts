import { Request, Response, NextFunction } from "express";

import { GetPromotionsRequestQuery } from "../interfaces/GetPromotionsRequestQuery";
import { schema } from "./schemas/get-promotions.schema";
import { StatusCodes } from "../utils/types";

export const getPromotionsValidate = (
  req: Request<{}, {}, {}, GetPromotionsRequestQuery>,
  res: Response,
  next: NextFunction
) => {
  const validate = schema.validate(req.query);
  if (validate.error) {
    const errorMsg = validate.error.details?.shift()?.message || 'Missing query params';

    return res.status(StatusCodes.BadRequest).send(errorMsg);
  }

  next();
}