import React, { useCallback, useContext } from "react";
import { PromotionsContext } from "../contexts/promotiosContext";

interface Optios {
  observer: React.MutableRefObject<any>;
  isNext: boolean;
}

export const useRefCallback = ({ observer, isNext }: Optios) => {
  const {
    isBeginning,
    isEnd,
    isLoading,
    offset,
    setIsBeginning,
    setIsEnd,
    setOffset,
  } = useContext(PromotionsContext);

  const setListAdges = () => {
    // if we are loading page forward
    // we are no longer at the beggining of the list
    if (isNext && isBeginning) {
      setIsBeginning(false);
    }

    // if we are loading page pack
    // we are no longer at the end of the list
    if (!isNext && isEnd) {
      setIsEnd(false);
    }
  };

  const calcNewOffset = (): number => {
    const newOffset = isNext ? offset + 1 : offset - 1;

    return Math.max(newOffset, 0);
  };

  const observerCallback = useCallback(
    (node) => {
      // we dont want to trigger it while we are loading
      if (isLoading) {
        return;
      }

      // remove observer from old component if connected
      observer.current?.disconnect();

      // setting a new observer and when our elememt is visible run the callback
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setListAdges();
          setOffset(calcNewOffset());
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading]
  );

  return { observerCallback };
};
