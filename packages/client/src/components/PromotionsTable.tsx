import { useContext, useRef } from "react";
import { TableHead, CircularProgress } from "@mui/material";

import { useRefCallback } from "../hooks/usePositionRef";
import { PromotionCell } from "./PromotionCell";
import {
  StyledTable,
  TableContainer,
  Row,
  ScrollableBody,
  HeaderCell,
  Cell,
} from "./styles/Styled";
import { PromotionsContext } from "../contexts/promotiosContext";

export const PromotionsTable = () => {
  const { isLoading, promotions, offset, setOffset } =
    useContext(PromotionsContext);

  const observerFirst = useRef();
  const observerLast = useRef();

  const { observerCallback: firstPromotion } = useRefCallback({
    observer: observerFirst,
    isNext: false,
    isLoading,
    offset,
    setOffset,
  });
  const { observerCallback: lastPromotion } = useRefCallback({
    observer: observerLast,
    isNext: true,
    isLoading,
    offset,
    setOffset,
  });

  const isFirst = (index: number): boolean => index === 0;
  const isLast = (index: number): boolean => promotions.length === index + 1;

  return (
    <TableContainer>
      <StyledTable stickyHeader>
        <TableHead>
          <Row>
            <HeaderCell>Name</HeaderCell>
            <HeaderCell>Type</HeaderCell>
            <HeaderCell>Start Date</HeaderCell>
            <HeaderCell>End Date</HeaderCell>
            <HeaderCell>User Group</HeaderCell>
            <HeaderCell>
              <CircularProgress
                color="inherit"
                variant={isLoading ? "indeterminate" : "determinate"}
              />
            </HeaderCell>
          </Row>
        </TableHead>
        <ScrollableBody>
          {promotions.map((promotion, index) => (
            <PromotionCell
              promotion={promotion}
              firstItemCallback={isFirst(index) ? firstPromotion : undefined}
              lastItemCallback={isLast(index) ? lastPromotion : undefined}
            />
          ))}
        </ScrollableBody>
      </StyledTable>
    </TableContainer>
  );
};
