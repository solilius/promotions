import { Request, Response } from 'express';
import { Promotion } from '../db/models/promotion'
import { GetPromotionsRequestQuery } from '../interfaces/GetPromotionsRequestQuery';
import { StatusCodes } from '../utils/types';

export const getPromotions = async (
  req: Request<{}, {}, {}, GetPromotionsRequestQuery>,
  res: Response
) => {
  try {
    const { bulkSize, offset } = req.query;

    const promotions = await Promotion
      .find()
      .sort({ startDate: "asc" })
      .skip(offset)
      .limit(bulkSize);

    res.json(promotions);
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.ServerError).send({ status: " failed" });
  }
}
