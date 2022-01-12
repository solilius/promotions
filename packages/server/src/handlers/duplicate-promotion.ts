import { Request, Response } from "express"

import { Promotion } from "../db/models/promotion";
import { StatusCodes } from "../utils/types";

export const duplicatePromotion = async (req: Request, res: Response) => {
  try {
    const promotion = req.body?.promotion;
    await Promotion.create(promotion);

    res.json({ status: " success" });
  } catch (error) {
    console.error(error);
    
    res.status(StatusCodes.ServerError).send({ status: " failed" });
  }
}