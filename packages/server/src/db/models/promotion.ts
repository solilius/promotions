import { Schema, model } from 'mongoose';
import { Promotion } from '@promotions/common';

const schema = new Schema<Promotion>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  userGroup: { type: String, required: true },
});

export const Promotions = model('Promotion', schema);