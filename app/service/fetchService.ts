import { FirmmindDataTypeEnum } from "../constant";
import { ApiResponseType, DropDownApiDataType } from "../type";
export interface FetchServiceType {
  GetStockInfo(
    stockId: string
  ): Promise<ApiResponseType<DropDownApiDataType[]>["data"]>;
  GetSpecificStock(stockId: string): Promise<any>;
}

export class fetchService implements FetchServiceType {
  public finmindtradeDomain = "https://api.finmindtrade.com/api/v4/data";
  public finmindToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wNC0xNCAxOToyNDowMCIsInVzZXJfaWQiOiJlbWlsMDUxOSIsImlwIjoiMTE4LjE2MC42NC4xNDgifQ.m_impJ5F1lGizvX8Unhas_cWZ4z19J2nwu3E4mxdO2w";

  public async GetStockInfo(
    stockId: string
  ): Promise<ApiResponseType<DropDownApiDataType[]>["data"]> {
    const res = await fetch(
      `${this.finmindtradeDomain}?${FirmmindDataTypeEnum.TaiwanStockInfo}&data_id=${stockId}&token=${this.finmindToken}`,
      {
        method: "GET",
      }
    );
    const data: ApiResponseType<DropDownApiDataType[]> = await res.json();
    return data.data;
  }

  public async GetSpecificStock(stockId: string): Promise<any> {
    const currentDate = new Date();
    const fiveYearsAgo = new Date(currentDate);
    fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5);
    const res = await fetch(
      `${this.finmindtradeDomain}?${
        FirmmindDataTypeEnum.TaiwanStockMonthRevenue
      }&data_id=${2330}&start_date=2019-01-01&end_date=2020-01-01&token=${
        this.finmindToken
      }`,
      {
        method: "GET",
      }
    );
    const data: ApiResponseType<DropDownApiDataType[]> = await res.json();
  }
}
