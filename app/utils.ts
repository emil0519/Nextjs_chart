import { fetchService } from "./service/fetchService";
import { GraphDataType, ErrorToastDataType, DropDownApiDataType } from "./type";

export const formatDate = (yearsBefore: number): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear() - yearsBefore;
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Get label for chart.js format;
 * References: https://github.com/chartjs/Chart.js/issues/12
 * @param startDate e.g. 2021-01-12, must in the format of YYYY-MM-DD
 * @returns label fill with spaces to for chart.js to map data points correctly e.g. ["2021","","","2022",...]
 */
export const getYearLabels = (startDate: string): string[] => {
  const currentYear = new Date().getFullYear();
  const startYear = parseInt(startDate.substring(0, 4));
  const yearLabels: string[] = generateYearLabels(currentYear - startYear);
  return generateLabelsWithSpace(yearLabels);
};

const generateYearLabels = (yearDifference: number): string[] => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - yearDifference;
  const labels: string[] = [];
  for (let year = startYear; year <= currentYear - 1; year++) {
    labels.push(year.toString());
  }
  return labels;
};
/**
 * Fill labels with space, chart.js mechanism use labels to map each datapoint
 * So it's necessary to fill labels with space like ["2021","","","2022"//...] in order to map all data
 * References: https://github.com/chartjs/Chart.js/issues/12
 * @param labels e.g. ["2021","2022","2023"]
 * @returns ["2021","","","2022"//...]
 */
const generateLabelsWithSpace = (labels: string[]): string[] => {
  return labels.flatMap((label) => {
    const emptyStrings = Array.from({ length: 11 }, () => "");
    return [label, ...emptyStrings];
  });
};

export const getSepcificStockWithDate = async (
  stockId: string,
  startDate: string
): Promise<GraphDataType[]> => {
  const fetchServices = new fetchService();
  const data = await fetchServices.GetSpecificStockWithDate(stockId, startDate);
  return data;
};

export const getYearBeofore = (startDate: string): string => {
  const date = new Date(startDate);
  date.setFullYear(date.getFullYear() - 1);
  return date.toISOString().slice(0, 10);
};

export const stripFirstYear = (data: GraphDataType[]): GraphDataType[] =>
  data.slice(12);

export const getDisplayGraphData = (data: GraphDataType[]): number[] =>
  data.map((monthlyData) => monthlyData.revenue);

export const processYoy = (data: GraphDataType[]): number[] => {
  let currentMonth = 12;
  let yoy = [];
  for (let i = 0; i < data.length - 12; i++) {
    if (data[i].revenue_month === data[currentMonth].revenue_month) {
      yoy.push(
        calculateYoyForEachMonth(data[i].revenue, data[currentMonth].revenue)
      );
    } else {
      yoy.push(0);
    }
    currentMonth++;
  }
  return yoy;
};

const calculateYoyForEachMonth = (lastYear: number, thisYear: number): number =>
  Number(((thisYear / lastYear - 1) * 100).toFixed(2));

export const addZero = (num: number): string =>
  num < 10 ? num.toString().padStart(2, "0") : num.toString();

export const openErrorToast = (
  setter: (openErrorToast: ErrorToastDataType) => void,
  errors?: any,
): void => {
  setter({
    isOpen: true,
    errorMessage:
      errors?.errorMesssage || errors?.message || "系統忙碌中，請稍候再試",
  });
};

export const formatTitle = (option: DropDownApiDataType): string =>
`${option.stock_name}(${option.stock_id})`;