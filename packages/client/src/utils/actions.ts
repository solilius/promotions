import { Promotion } from "@promotions/common";
import moment from "moment";
import { BULK_SIZE, FULL_BULK_SIZE } from "./consts";

export const adjustPromotions = (
  oldPromotions: Promotion[],
  newPromotions: Promotion[],
  toEnd: boolean
): Promotion[] =>
  toEnd
    ? oldPromotions.slice(BULK_SIZE).concat(newPromotions)
    : newPromotions.concat(oldPromotions.slice(-BULK_SIZE));

export const calculateTotalOffset = (
  offset: number,
  isNext: boolean
): number => {
  let tempOffset = isNext
    ? BULK_SIZE * (offset - 1) + FULL_BULK_SIZE
    : offset * BULK_SIZE;

  return tempOffset <= 0 ? 1 : tempOffset;
};

export const getPremissionsAfterEdit = (
  promotions: Promotion[],
  edited: Promotion,
  id: string
): Promotion[] => {
  const tempPromotions = [...promotions];
  const index = tempPromotions.findIndex((promotion) => promotion._id === id);
  tempPromotions[index] = edited;

  return tempPromotions;
};

export const getPromotionsAfterDuplicate = (
  promotions: Promotion[],
  duplicate: Promotion
): Promotion[] => {
  const tempPromotions = [...promotions];
  tempPromotions.pop(); // to keep FULL_BULK_SIZE

  return [...tempPromotions, duplicate].sort(
    (a, b) =>
      Number(moment(a.startDate).unix()) - Number(moment(b.startDate).unix())
  );
};
