import { CircularProgress } from "@mui/material";
import { LoaderContainer } from "./styles/Styled";

interface Props {
  isLoading: boolean;
}

export const Loader = ({ isLoading }: Props) => {
  return (
    <LoaderContainer colSpan={6} align="center">
      <CircularProgress
        color="inherit"
        variant={isLoading ? "indeterminate" : "determinate"}
      />
    </LoaderContainer>
  );
};
