import { fetchService } from "./service/fetchService";

export const formatDate = (yearsBefore: number): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear() - yearsBefore;
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


/**
 * Get label for chart.js
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
) => {
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
