import Joi from 'joi';

export const schema = Joi.object({
  bulkSize: Joi.number()
    .min(1)
    .required(),
  offset: Joi.number()
    .min(1)
    .required(),
 
});