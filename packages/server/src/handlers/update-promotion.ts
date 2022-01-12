import { Request, Response } from "express"

import { Promotion } from "../db/models/promotion";
import { StatusCodes } from "../utils/types";

export const updatePromotion = async (req: Request, res: Response) => {
  try {
    await Promotion.updateOne(
      { _id: req.params.id },
      { $set: req.body.promotion }
    );

    res.json({ status: " success" });
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.ServerError).send({ status: " failed" });
  }
}