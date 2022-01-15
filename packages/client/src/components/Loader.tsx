import { CircularProgress } from "@mui/material";
import { LoaderContainer, Row } from "./styles/Styled";

interface Props {
  isLoading: boolean;
}

export const Loader = ({ isLoading }: Props) => {
  return (
    <Row>
      <LoaderContainer colSpan={6} align="center" key={Date.now().toString()} >
        <CircularProgress
          color="inherit"
          variant={isLoading ? "indeterminate" : "determinate"}
        />
      </LoaderContainer>
    </Row>
  );
};
