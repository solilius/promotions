import { Request, Response } from "express"

import { Promotion } from "../db/models/promotion";
import { StatusCodes } from "../utils/types";

export const updatePromotion = async (req: Request, res: Response) => {
  try {
    const id = req.params?.id;

    if (!id) {
      return res.status(StatusCodes.BadRequest).send('No id provided');
    }

    const promotion = req.body?.promotion;
    await Promotion.updateOne({ _id: id }, { $set: promotion });

    res.json({ status: " success" });
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.ServerError).send({ status: " failed" });
  }
}