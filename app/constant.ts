import { CategoryListType, KeyValueType, SubCategoryListType } from "./type";
import { formatDate } from "./utils";

export enum FirmmindDataTypeEnum {
  TaiwanStockInfo = "dataset=TaiwanStockInfo",
  TaiwanStockMonthRevenue = "dataset=TaiwanStockMonthRevenue",
}
export const mainCateoryList: CategoryListType[] = [
  { title: "B", desc: "最新動態", titleColor: "#434343" },
  { title: "F", desc: "股票健診", titleColor: "#434343" },
  { title: "C", desc: "財務報表", titleColor: "#434343" },
  { title: "D", desc: "獲利能力", titleColor: "#CA0913" },
  { title: "E", desc: "安全性分析", titleColor: "#33913A" },
  { title: "q", desc: "成長力分析", titleColor: "#33913A" },
  { title: "J", desc: "價值評估", titleColor: "#4B6DB0" },
  { title: "G", desc: "董監與籌碼", titleColor: "#434343" },
  { title: "H", desc: "關鍵指標", titleColor: "#743079" },
  { title: "I", desc: "產品組合", titleColor: "#526FD7" },
];

export const subCateoryList: SubCategoryListType[] = [
  { desc: "每月營收" },
  { desc: "每月盈餘" },
  { desc: "每月淨值" },
  { desc: "損益表" },
  { desc: "總資產" },
  { desc: "負載和股東權益" },
  { desc: "現金流量表" },
  { desc: "股利政策" },
  { desc: "電子書" },
];

export const yearsDropdownOptions: KeyValueType[] = [
  {
    key: "近3年",
    value: formatDate(3),
  },
  {
    key: "近5年",
    value: formatDate(5),
  },
  {
    key: "近10年",
    value: formatDate(10),
  },
];
