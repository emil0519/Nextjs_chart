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
