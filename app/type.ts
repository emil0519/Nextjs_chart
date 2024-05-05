import { SxProps } from "@mui/material";

export interface ApiResponseType<T> {
  msg: string;
  status: number;
  data: T;
}

export interface DropDownApiDataType {
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
  date: string;
}

export interface CategoryPropsType {
  title?: string;
  titleColor?: string;
  desc: string;
  descStyle?: SxProps;
  isActive: boolean;
}

export type CategoryListType = Omit<CategoryPropsType, "isActive" | "sx">;

export type SubCategoryListType = Pick<CategoryListType, "desc">;

export interface BackOfficeListType{
  desc: string;
  href: string;
}



export interface KeyValueType {
  key: string;
  value: string;
}

export interface GraphDataType {
  date: string;
  stock_id: string;
  country: string;
  revenue: number;
  revenue_month: number;
  revenue_year: number;
}

export interface SelectedStockType {
  name: string;
  stockId: number | null;
}

export interface ErrorToastDataType {
  isOpen: boolean;
  errorMessage: string;
}

export interface DefaultDialogType{
  isOpen: boolean;
  message: string;
  stockId:string;
};
