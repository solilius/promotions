import Joi from 'joi';
import { PromotionTypes, UserGroups } from '@promotions/common';

export const schema = Joi.object({
  _id: Joi.string()
    .optional(),
  name: Joi.string()
    .required(),
  type: Joi.string()
    .valid(...Object.values(PromotionTypes))
    .required(),
  startDate: Joi.date()
    .required(),
  endDate: Joi.date()
    .required(),
  userGroup: Joi.string()
    .valid(...Object.values(UserGroups))
    .required(),
});
