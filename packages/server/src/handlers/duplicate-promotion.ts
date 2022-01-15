import { Request, Response } from "express"
import { Types } from 'mongoose';

import { Promotion } from "../db/models/promotion";
import { StatusCodes } from "../utils/types";

export const duplicatePromotion = async (req: Request, res: Response) => {
  try {
    const [promotion] = await Promotion.find({ _id: req.params.id })
    const { _id: oldId, ...duplicate } = promotion._doc;
    const { _id: newId } = await Promotion.create(duplicate);

    res.send({ ...duplicate, _id: newId });
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.ServerError).send({ status: " failed" });
  }
}
