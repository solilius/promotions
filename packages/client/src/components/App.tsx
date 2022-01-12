import styled from "styled-components";
import { PromotionsTable } from "./PromotionsTable";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  color: red;
  font-family: cursive;
  font-size: 40px;

`;

const App = () => {
  return (
    <Container>
      <Header> Promotions </Header>
      <PromotionsTable/>
    </Container>
  );
};

export default App;
