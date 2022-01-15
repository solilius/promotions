import React, { useCallback, useContext } from "react";
import { PromotionsContext } from "../contexts/promotiosContext";

interface Optios {
  observer: React.MutableRefObject<any>,
  isNext: boolean,
}

export const useRefCallback = ({observer, isNext}: Optios ) => {

  const { isFirst, isLast, setIsFirst, setIsLast, isLoading, offset, setOffset } = useContext(PromotionsContext);
  const observerCallback = useCallback((node) => {
    if (isLoading) {
      // we dont want to trigger it while we are loading
      return;
    }

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const newOffset = (isNext ? offset + 1 : offset - 1);

      if(isNext && isFirst ) {
        setIsFirst(false)
      }

      if(!isNext && isLast ) {
        setIsLast(false)
      }

        setOffset( newOffset < 0 ? 0 : newOffset );
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  },
    [isLoading]
  );

  return { observerCallback }
}