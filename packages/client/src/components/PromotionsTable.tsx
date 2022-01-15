import { useContext, useRef } from "react";
import { TableHead, TableBody, CircularProgress } from "@mui/material";

import { useRefCallback } from "../hooks/usePositionRef";
import { PromotionCell } from "./PromotionCell";
import { StyledTable, TableContainer, Row, HeaderCell } from "./styles/Styled";
import { PromotionsContext } from "../contexts/promotiosContext";

export const PromotionsTable = () => {
  const { isLoading, promotions } = useContext(PromotionsContext);

  const observerFirst = useRef();
  const observerLast = useRef();

  const { observerCallback: firstPromotion } = useRefCallback({
    observer: observerFirst,
    isNext: false,
  });
  const { observerCallback: lastPromotion } = useRefCallback({
    observer: observerLast,
    isNext: true,
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
            <HeaderCell align="center">
              <CircularProgress
                color="inherit"
                variant={isLoading ? "indeterminate" : "determinate"}
              />
            </HeaderCell>
          </Row>
        </TableHead>
        <TableBody>
          {promotions.map((promotion, index) => (
            <PromotionCell
              key={promotion._id}
              promotion={promotion}
              firstItemCallback={isFirst(index) ? firstPromotion : undefined}
              lastItemCallback={isLast(index) ? lastPromotion : undefined}
            />
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};
