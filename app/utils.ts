import { fetchService } from "./service/fetchService";

export const formatDate = (yearsBefore: number): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear() - yearsBefore;
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getSepcificStockWithDate = async (stockId: string, startDate: string) => {
  const fetchServices = new fetchService();
  try {
    const data = await fetchServices.GetSpecificStockWithDate(
      stockId,
      startDate
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
