import { Promotion } from "@promotions/common";
import { BULK_SIZE, FIRST_BULK_SIZE } from "./consts";

export const adjustPromotions = (
  oldPromotions: Promotion[],
  newPromotions: Promotion[],
  toEnd: boolean
) =>
  toEnd
    ? oldPromotions.slice(BULK_SIZE).concat(newPromotions)
    : newPromotions.concat(oldPromotions.slice(-BULK_SIZE));

export const calculateTotalOffset = (offset: number, isNext: boolean) => {
  const tempOffset = BULK_SIZE * (offset - 1);

  return isNext ? tempOffset + FIRST_BULK_SIZE : tempOffset - BULK_SIZE;
};



