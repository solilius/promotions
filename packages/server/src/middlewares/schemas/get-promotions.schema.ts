import Joi from 'joi';

export const schema = Joi.object({
  bulkSize: Joi.number()
    .min(1)
    .required(),
  position: Joi.number()
    .min(1)
    .required(),
  isNext: Joi.boolean().required(),
});