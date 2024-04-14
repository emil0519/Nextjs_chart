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
