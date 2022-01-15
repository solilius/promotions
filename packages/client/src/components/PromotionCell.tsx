import moment from "moment";
import { Promotion } from "@promotions/common";
import { Cell, Row } from "./styles/Styled";
import { MenuButton } from "./MenuButton";

const DATE_FORMAT = "DD-MM-YYYY";

interface Props {
  promotion: Promotion;
  firstItemCallback?: (node: any) => void;
  lastItemCallback?: (node: any) => void;
}

export const PromotionCell = ({
  promotion,
  firstItemCallback,
  lastItemCallback,
}: Props) => {
  return (
    <Row ref={firstItemCallback || lastItemCallback}>
      <Cell>{promotion.name}</Cell>
      <Cell>{promotion.type}</Cell>
      <Cell>{moment(promotion.startDate).format(DATE_FORMAT)}</Cell>
      <Cell>{moment(promotion.endDate).format(DATE_FORMAT)}</Cell>
      <Cell>{promotion.userGroup}</Cell>
      <Cell>
        <MenuButton promotion={promotion!} />
      </Cell>
    </Row>
  );
};
