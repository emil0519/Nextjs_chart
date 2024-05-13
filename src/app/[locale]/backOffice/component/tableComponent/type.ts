import { ReactElement } from "react";

export interface TableComponentEntity {
  bodys: GroupItem[];
  headers: ColumnItem[];
}
export interface ColumnItem {
  content: ReactElement;
  id: number;
}
export interface GroupItem {
  columns: { cell: React.ReactNode; id: number | string }[];
  rowId: number | string;
}
