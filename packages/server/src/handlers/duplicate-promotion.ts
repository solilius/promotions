import { Request, Response } from "express"
import { Types } from 'mongoose';

import { Promotion } from "../db/models/promotion";
import { StatusCodes } from "../utils/types";

export const duplicatePromotion = async (req: Request, res: Response) => {
  try {
    const [promotion] = await Promotion.find({ _id: req.params.id })
    const { name, type, startDate, endDate, userGroup } = promotion;
    const {_id} = await Promotion.create({ name, type, startDate, endDate, userGroup });

    res.send({...promotion, _id});
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.ServerError).send({ status: " failed" });
  }
}
