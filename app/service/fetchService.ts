import {
  FirmmindDataTypeEnum,
  finmindToken,
  finmindtradeDomain,
} from "../constant";
import { ApiResponseType, DropDownApiDataType } from "../type";
export interface FetchServiceType {
  GetStockInfo(
    stockId: string
  ): Promise<ApiResponseType<DropDownApiDataType[]>["data"]>;
}

export class fetchService implements FetchServiceType {
  public async GetStockInfo(
    stockId: string
  ): Promise<ApiResponseType<DropDownApiDataType[]>["data"]> {
    const res = await fetch(
      `${finmindtradeDomain}?${FirmmindDataTypeEnum.TaiwanStockInfo}&data_id=${stockId}&token=${finmindToken}`,
      {
        method: "GET",
      }
    );
    const data: ApiResponseType<DropDownApiDataType[]> = await res.json();
    return data.data;
  }
}
