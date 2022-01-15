import React, { useEffect, useState } from "react";
import axios from "axios";
import { Promotion } from "@promotions/common";

import {
  adjustPromotions,
  calculateTotalOffset,
  getPremissionsAfterEdit,
  getPromotionsAfterDuplicate,
} from "../utils/actions";
import { BASE_URL, BULK_SIZE, FULL_BULK_SIZE } from "../utils/consts";

type ServerResponse = { data: { status: string } };
type ServerResponseWithPromotion = { data: Promotion };

interface ContextData {
  isLoading: boolean;
  isBeginning: boolean;
  isEnd: boolean;
  promotions: Promotion[];
  offset: number;
  setOffset: (offset: number) => void;
  deletePromotion: (promotionId: string) => Promise<void>;
  duplicatePromotion: (promotionId: string) => Promise<void>;
  editPromotion: (promotionId: string, Promotion: Promotion) => Promise<void>;
  setIsEnd: (flag: boolean) => void;
  setIsBeginning: (flag: boolean) => void;
}

export const PromotionsContext = React.createContext<ContextData>(
  {} as ContextData
);

export const PromotionsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true); // there is a pending request
  const [promotions, setPromotions] = useState<Promotion[]>([]); // all the promotions
  const [offset, setOffset] = useState(0); // the offest in the db
  const [tempOffset, setTempOffset] = useState(offset - 1); // deduct if we are loading next or back
  const [isBeginning, setIsBeginning] = useState(false); // are we at the beginning of the list on the db
  const [isEnd, setIsEnd] = useState(false); // are we at the end of the list on the db

  const deletePromotion = async (id: string) => {
    await axios.delete<undefined, ServerResponse>(`${BASE_URL}/${id}`);
    setPromotions((prev) => prev.filter((p) => p._id !== id));
  };

  const duplicatePromotion = async (id: string) => {
    const { data } = await axios.post<undefined, ServerResponseWithPromotion>(
      `${BASE_URL}/duplicate/${id}`
    );

    const newPromotions = getPromotionsAfterDuplicate(promotions, data);
    setPromotions(newPromotions);
  };

  const editPromotion = async (id: string, promotion: Promotion) => {
    await axios.put<undefined, ServerResponse>(`${BASE_URL}/${id}`, promotion);
    const editedPromotions = getPremissionsAfterEdit(promotions, promotion, id);

    setPromotions(editedPromotions);
  };

  const reqestPromotions = async () => {
    if (tempOffset === offset || isBeginning || isEnd) {
      return;
    }
    try {
      setIsLoading(true);
      const isNext = tempOffset < offset;
      const { data } = await axios.get(BASE_URL, {
        params: {
          offset:
            promotions.length === 0 ? 0 : calculateTotalOffset(offset, isNext),
          bulkSize: promotions.length === 0 ? FULL_BULK_SIZE : BULK_SIZE,
        },
      });
      if (!data) {
        new Error("No data");
      }
      if (data.length < BULK_SIZE) {
        isNext ? setIsEnd(true) : setIsBeginning(true);
      }
      setPromotions((prev) => adjustPromotions(prev, data, isNext));
    } catch (error) {
      console.error(error);
    } finally {
      setTempOffset(offset);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reqestPromotions();
  }, [offset]);

  const value: ContextData = {
    isLoading,
    isBeginning,
    isEnd,
    promotions,
    offset,
    setOffset,
    deletePromotion,
    duplicatePromotion,
    editPromotion,
    setIsEnd,
    setIsBeginning,
  };

  return (
    <PromotionsContext.Provider value={value}>
      {children}
    </PromotionsContext.Provider>
  );
};
