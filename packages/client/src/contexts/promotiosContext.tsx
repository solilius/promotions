import React, { useEffect, useState } from "react";
import { Promotion } from "@promotions/common";
import { adjustPromotions, calculateTotalOffset } from "../utils/actions";
import { BASE_URL, BULK_SIZE, FIRST_BULK_SIZE } from "../utils/consts";
import axios from "axios";

type ServerResponse = { data: { status: string } };
type ServerResponseWithPromotion = { data: { promotion: Promotion } };

interface ContextData {
  isLoading: boolean;
  isFirst: boolean;
  isLast: boolean;
  promotions: Promotion[];
  offset: number;
  setOffset: (offset: number) => void;
  deletePromotion: (promotionId: string) => Promise<void>;
  duplicatePromotion: (promotionId: string) => Promise<void>;
  editPromotion: (promotionId: string, Promotion: Promotion) => Promise<void>;
  setIsLast: (flag: boolean) => void,
  setIsFirst: (flag: boolean) => void,
}

export const PromotionsContext = React.createContext<ContextData>(
  {} as ContextData
);

export const PromotionsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [offset, setOffset] = useState(0);
  const [tempOffset, setTempOffset] = useState(offset - 1);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const deletePromotion = async (id: string) => {
    await axios.delete<undefined, ServerResponse>(`${BASE_URL}/${id}`);
    setPromotions((prev) => prev.filter((p) => p._id !== id));
  };

  const duplicatePromotion = async (id: string) => {
    const { data } = await axios.post<undefined, ServerResponseWithPromotion>(
      `${BASE_URL}/duplicate/${id}`
    );
    const [first, ...rest] = promotions;
    setPromotions([...rest, data.promotion]);
  };

  const editPromotion = async (id: string, promotion: Promotion) => {
    await axios.put<undefined, ServerResponse>(`${BASE_URL}/${id}`, {
      body: { promotion },
    });
    const updatedPromotion = {
      ...promotions.find((p) => p._id === id),
      ...promotion,
    };
    setPromotions((prev) => [
      ...prev.filter((p) => p._id !== id),
      updatedPromotion,
    ]);
  };

  const reqestPromotions = async () => {
    if (tempOffset === offset || isFirst || isLast) {
      return;
    }
    try {
      setIsLoading(true);
      const isNext = tempOffset < offset;
      const { data } = await axios.get(BASE_URL, {
        params: {
          offset:
            promotions.length === 0 ? 1 : calculateTotalOffset(offset, isNext),
          bulkSize: promotions.length === 0 ? FIRST_BULK_SIZE : BULK_SIZE,
        },
      });
      if (!data) {
        new Error("No data");
      }
      if(data.length < BULK_SIZE) {
        isNext ? setIsLast(true) : setIsFirst(true);
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
    isFirst,
    isLast,
    promotions,
    offset,
    setOffset,
    deletePromotion,
    duplicatePromotion,
    editPromotion,
    setIsLast,
    setIsFirst,
  };

  return (
    <PromotionsContext.Provider value={value}>
      {children}
    </PromotionsContext.Provider>
  );
};
