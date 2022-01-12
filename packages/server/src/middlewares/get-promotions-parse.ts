import { Request, Response, NextFunction } from "express";
import { GetPromotionsRequestQuery } from "../interfaces/GetPromotionsRequestQuery";

export const getPromotionsParse = (
  req: Request<{}, {}, {}, GetPromotionsRequestQuery>,
  res: Response,
  next: NextFunction
) => {
  const { bulkSize, position, isNext } = req.query;

  req.query.bulkSize = Number(bulkSize);
  req.query.position = Number(position);
  req.query.isNext = String(isNext) === 'true';

  next();
}