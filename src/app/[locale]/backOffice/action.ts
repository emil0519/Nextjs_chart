"use server";

import { fetchService } from "../../service/fetchService";

export async function fetchStock(stockId: string) {
  const fetchServices = new fetchService();
  try {
    const result = await fetchServices.MockGetStockInfo(stockId);
    return result;
  } catch (errors) {
    console.log("error", errors);
  }
}
