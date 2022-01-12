import express from 'express';

import { deletePromotion } from '../handlers/delete-promotion';
import { duplicatePromotion } from '../handlers/duplicate-promotion';
import { getPromotions } from '../handlers/get-promotions';
import { updatePromotion } from '../handlers/update-promotion';
import { getPromotionsParse } from '../middlewares/get-promotions-parse';
import { getPromotionsValidate } from '../middlewares/get-promotions-validate';
import { promotionValidate } from '../middlewares/promotion-validate';
import { valideteId } from '../middlewares/valideteId';

export const router = express.Router();

router.route("/").get(getPromotionsParse, getPromotionsValidate, getPromotions);
router.route("/:id").put(valideteId, promotionValidate, updatePromotion);
router.route("/:id").delete(valideteId, deletePromotion);
router.route("/duplicate").post(valideteId, duplicatePromotion);

