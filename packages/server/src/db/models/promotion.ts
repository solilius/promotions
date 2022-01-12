import { Schema, model } from 'mongoose';
import { Promotion as PromotionIterface } from '@promotions/common';

const schema = new Schema<PromotionIterface>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  userGroup: { type: String, required: true },
});

export const Promotion = model('Promotion', schema);