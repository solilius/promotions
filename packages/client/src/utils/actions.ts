import { Promotion } from "@promotions/common";
import { BULK_SIZE, FULL_BULK_SIZE } from "./consts";

export const adjustPromotions = (
  oldPromotions: Promotion[],
  newPromotions: Promotion[],
  toEnd: boolean
) =>
  toEnd
    ? oldPromotions.slice(BULK_SIZE).concat(newPromotions)
    : newPromotions.concat(oldPromotions.slice(-BULK_SIZE));

export const calculateTotalOffset = (offset: number, isNext: boolean) => {
  let tempOffset = isNext
    ? BULK_SIZE * (offset - 1) + FULL_BULK_SIZE
    : offset * BULK_SIZE;

  return tempOffset <= 0 ? 1 : tempOffset;
};
