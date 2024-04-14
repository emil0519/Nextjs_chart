import { FirmmindDataTypeEnum } from "../constant";
import { ApiResponseType, DropDownApiDataType } from "../type";
export interface FetchServiceType {
  GetStockInfo(
    stockId: string
  ): Promise<ApiResponseType<DropDownApiDataType[]>["data"]>;
}

export class fetchService implements FetchServiceType {
  public finmindtradeDomain = "https://api.finmindtrade.com/api/v4/data";
  public finmindToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wNC0xNCAxMjo0NTozMSIsInVzZXJfaWQiOiJlbWlsMDUxOSIsImlwIjoiMjE5LjkxLjg4LjEyMiJ9.c_IucjXGhNR96HsuzQm1fky8YfQUx9npqbTSLN7FwQ8";

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
}
