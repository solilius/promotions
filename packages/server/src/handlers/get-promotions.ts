import { Request, Response } from 'express';
import { Promotion } from '../db/models/promotion'
import { GetPromotionsRequestQuery } from '../interfaces/GetPromotionsRequestQuery';
import { StatusCodes } from '../utils/types';

const calculateSkip = (bulkSize: number, position: number, isNext: boolean): number => {
  const direction = isNext ? 1 : 2;
  const skip = bulkSize * (position - direction);

  // make sure we never try to skip with a negative number
  return skip > 0 ? skip : 0;
}

export const getPromotions = async (
  req: Request<{}, {}, {}, GetPromotionsRequestQuery>,
  res: Response
) => {
  try {
    const { bulkSize, position, isNext } = req.query;

    const promotions = await Promotion
      .find()
      .sort({ create_date: "asc" })
      .skip(calculateSkip(bulkSize, position, isNext))
      .limit(bulkSize);

    res.json(promotions);
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.ServerError).send({ status: " failed" });
  }
}
