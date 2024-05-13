import Information from "./component/information";
import SearchSection from "./component/searchSection";
import CreateButton from "./component/createButton";
import StockTalbe from "./component/stockTable";
import { fetchStock } from "./action";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {getTranslations} from 'next-intl/server';

export default async function Page({ searchParams }: { searchParams: any }) {
  const rawData =  await fetchStock(searchParams?.query || "");
  const t = await getTranslations('Index');

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Box
        sx={{
          margin: "24px",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <p>{t("title")}</p>
        <Typography component="h2" sx={{ fontSize: "24px", fontWeight: 600 }}>
          查詢股票資料
        </Typography>
        <CreateButton fetchStock={fetchStock} />
      </Box>
      <Box sx={{ margin: "0 24px" }}>
        <Information
          title="功能說明"
          contentList={[
            "可直接在本頁查詢股票基本資訊，搜尋列留空即查詢所有股票",
            "按新增股票資訊可新增一檔股票",
            "在列表中可編輯或刪除對應股票",
          ]}
        />
      </Box>
      <Box
        sx={{
          background: "white",
          margin: "0 24px",
          border: "1px solid Gainsboro",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Typography component="h5" sx={{ fontSize: "14px" }}>
          股票編號
        </Typography>
        <SearchSection />
      </Box>
      {rawData && <StockTalbe rawData={rawData} fetchStock={fetchStock} />} 
    </Box>
  );
}
