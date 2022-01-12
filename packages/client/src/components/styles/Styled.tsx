import styled from "styled-components";
import { Table, TableCell, TableRow, TableBody } from "@mui/material";

export const TableContainer = styled.div`
  border: 2px solid #008385;
  border-radius: 8px;
  max-height: 90vh;
  overflow-y: scroll;
`;

export const StyledTable = styled(Table)`
  width: 80vw !important;
`;

export const Row = styled(TableRow)`
  border: #008385 !important;
`;

export const HeaderCell = styled(TableCell)`
  
  color: white !important;
  font-size: 22px !important;
  background: #325a82 !important;
`;

export const Cell = styled(TableCell)`
  color: #dcdcdc !important;
  font-size: 20px !important;
  font-family: monospace !important;
  background: #386491 !important;
`;

export const LoaderRow = styled(TableRow)`
  background: #386491 !important;
  display: flex;
  justify-content: center;
  padding: 30px;
`;

export const ScrollableBody = styled(TableBody)`
`;
