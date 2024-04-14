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
  title: string,
  titleColor: string,
  desc: string,
  isActive: boolean
}

export type CategoryListType = Omit<CategoryPropsType, 'isActive'>;
