import { Request, Response } from "express"

import { Promotion } from "../db/models/promotion";
import { StatusCodes } from "../utils/types";

export const deletePromotion = async (req: Request, res: Response) => {
  try {
    await Promotion.deleteOne({ _id: req.params.id });

    res.json({ status: " success" });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.ServerError).send({ status: " failed" });
  }
}