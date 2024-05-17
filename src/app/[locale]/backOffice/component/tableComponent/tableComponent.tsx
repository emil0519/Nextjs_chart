import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { ReactElement } from "react";
import { TableComponentEntity } from "./type";



export default function TableComponennt({
  headers,
  bodys,
}: TableComponentEntity): ReactElement {
  return (
    <TableContainer
      sx={{
        border: "1px solid #D3D3D3",
        borderRadius: "4px",
        height: "auto",
        maxHeight: "600px",
      }}
    >
      <Table>
        <TableHead sx={{background:'#edf0ee'}}>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header.id}>{header.content}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{background:"white"}}>
          {bodys.map((body) => (
            <TableRow key={body.rowId}>
              {body.columns.map((column) => (
                <TableCell key={column.id}>{column.cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
