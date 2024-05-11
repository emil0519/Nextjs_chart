'use server'

import { fetchService } from "../service/fetchService";

export async function fetchStock (stockId:string){
  const fetchServices = new fetchService();
  try {
    const result = await fetchServices.MockGetStockInfo(stockId);
    // if (!result.length) {
    //   openErrorToast(setErrorToastData, {
    //     isOpen: true,
    //     errorMesssage: "查無資訊，請更改搜尋條件",
    //   });
    // }
    return result;
  } catch (errors) {
    // openErrorToast(setErrorToastData, errors);
    console.log('error', errors)
  } 
  // finally {
  //   setTimeout(() => setErrorToastData(defaultErrorToastData), 2000);
  // }
};
