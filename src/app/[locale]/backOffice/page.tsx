import Information from "./component/information";
import SearchSection from "./component/searchSection";
import CreateButton from "./component/createButton";
import StockTalbe from "./component/stockTable";
import { fetchStock } from "./action";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getTranslations } from "next-intl/server";

export default async function Page({ searchParams }: { searchParams: any }) {
  const rawData = await fetchStock(searchParams?.query || "");
  const t = await getTranslations("BackOffice");

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
        <Typography component="h2" sx={{ fontSize: "24px", fontWeight: 600 }}>
        </Typography>
        <CreateButton fetchStock={fetchStock} />
      </Box>
      <Box sx={{ margin: "0 24px" }}>
        <Information
          title={t("instructions")}
          contentList={[
            t("instructionOne"),
            t("instructionTwo"),
            t("instructionThree"),
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
          {t("stockSymbol")}
        </Typography>
        <SearchSection />
      </Box>
      {rawData && <StockTalbe rawData={rawData} fetchStock={fetchStock} />}
    </Box>
  );
}
