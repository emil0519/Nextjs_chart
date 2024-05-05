import { FirmmindDataTypeEnum } from "../constant";
import { ApiResponseType, DropDownApiDataType, EditPayloadType, GraphDataType } from "../type";
import { formatDate } from "../utils";
export interface FetchServiceType {
  MockCreateStockInfo(
    createData: DropDownApiDataType
  ): Promise<number>;
  MockEditStockInfo(
    editData: EditPayloadType
  ): Promise<number>;
  MockGetStockInfo(
    stockInfo: string
  ): Promise<ApiResponseType<DropDownApiDataType[]>["data"]>;
  MockDeleteStockInfo(
    stockId: string
  ): Promise<number>;
  GetStockInfo(
    stockId: string
  ): Promise<ApiResponseType<DropDownApiDataType[]>["data"]>;
  GetSpecificStockWithDate(
    stockId: string,
    startDate: string
  ): Promise<GraphDataType[]>;
}

enum MockApiTypeEnum {
  basicInfo = "basicInfo",
}
export class fetchService implements FetchServiceType {
  public finmindtradeDomain = "https://api.finmindtrade.com/api/v4/data";
  public mockFinmindDomain = "http://15.152.187.152/api";
  public localhost = "http://localhost:3002/api";
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

  public async GetSpecificStockWithDate(
    stockId: string,
    startDate: string
  ): Promise<GraphDataType[]> {
    const res = await fetch(
      `${this.finmindtradeDomain}?${
        FirmmindDataTypeEnum.TaiwanStockMonthRevenue
      }&data_id=${stockId}&start_date=${startDate}&end_date=${formatDate(
        0
      )}&token=${this.finmindToken}`,
      {
        method: "GET",
      }
    );
    const data: ApiResponseType<GraphDataType[]> = await res.json();
    return data.data;
  }

  public async MockGetStockInfo(
    stockInfo: string
  ): Promise<ApiResponseType<DropDownApiDataType[]>["data"]> {
    const res = await fetch(
      `${this.mockFinmindDomain}/${MockApiTypeEnum.basicInfo}?${
        FirmmindDataTypeEnum.TaiwanStockInfo
      }${!!stockInfo.length ? `&dataId=${stockInfo}` : ""}`,
      {
        method: "GET",
      }
    );
    if (res.status === 204) return [];
    const data: ApiResponseType<DropDownApiDataType[]> = await res.json();
    return data.data;
  }

  public async MockCreateStockInfo(
    createData: DropDownApiDataType
  ): Promise<number> {
    const res = await fetch(`${this.localhost}/${MockApiTypeEnum.basicInfo}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createData),
    });
    return res.status;
  }

  public async MockEditStockInfo(
    editData: EditPayloadType
  ): Promise<number> {
    const res = await fetch(`${this.localhost}/${MockApiTypeEnum.basicInfo}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    });
    return res.status;
  }

  public async MockDeleteStockInfo(
    stockId: string
  ): Promise<number> {
    const res = await fetch(`${this.localhost}/${MockApiTypeEnum.basicInfo}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({stock_id: stockId}),
    });
    return res.status;
  }
}
