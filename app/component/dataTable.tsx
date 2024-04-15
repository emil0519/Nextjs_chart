import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { GraphDataType } from "../type";

export const DataTable = ({
  graphData,
}: {
  graphData: GraphDataType[];
}): React.ReactElement => (
  <Box
    component="section"
    sx={{
      backgroundColor: "white",
      border: "1px solid #DFDFDF",
      width: "100%",
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      padding: "20px 10px",
      overflowX: "auto",
      whiteSpace: "nowrap",
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button variant="contained" sx={{ marginBottom: "20px" }}>
        詳細數據
      </Button>
    </Box>
    <Table>
      <TableBody>
        <TableRow
          sx={{ backgroundColor: "#F6F8FA", border: "1px solid #E7E8E8" }}
        >
          <TableCell variant="head">年度月份</TableCell>
          <TableCell sx={{ fontWeight: "bold" }}>Cell 1</TableCell>
        </TableRow>
        <TableRow
          sx={{ backgroundColor: "white", border: "1px solid #E7E8E8" }}
        >
          <TableCell variant="head">每月營收</TableCell>
          <TableCell>Cell 2</TableCell>
        </TableRow>
        <TableRow
          sx={{ backgroundColor: "#F6F8FA", border: "1px solid #E7E8E8" }}
        >
          <TableCell variant="head">單月營收年增率</TableCell>
          <TableCell>Cell 2</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Box>
);
