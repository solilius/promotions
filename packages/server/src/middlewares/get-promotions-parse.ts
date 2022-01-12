import { Request, Response, NextFunction } from "express";
import { GetPromotionsRequestQuery } from "../interfaces/GetPromotionsRequestQuery";

export const getPromotionsParse = (
  req: Request<{}, {}, {}, GetPromotionsRequestQuery>,
  res: Response,
  next: NextFunction
) => {
  const { bulkSize, offset } = req.query;

  req.query.bulkSize = Number(bulkSize);
  req.query.offset = Number(offset);

  next();
}