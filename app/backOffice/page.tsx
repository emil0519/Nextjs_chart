import { Box, Button, Input, Snackbar, Typography } from "@mui/material";
import Information from "./component/information";
import { useEffect, useState } from "react";
import { fetchService } from "../service/fetchService";
import {
  DefaultCreateEditDialogType,
  DefaultCreateEditEnum,
  DefaultDialogType,
  DropDownApiDataType,
  ErrorToastDataType,
} from "../type";
import {
  defaultCreateEditDialog,
  defaultDeleteDialog,
  defaultErrorToastData,
} from "../constant";
import { openErrorToast } from "../utils";
import TableComponennt from "./component/tableComponent/tableComponent";
import dayjs from "dayjs";
import { GroupItem } from "./component/tableComponent/type";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, useRouter } from "next/navigation";
import CreateEditDialog from "./component/createEditDialog";
import DeleteDialog from "./component/deleteDialog";
import SearchSection from "./component/searchSection";
import CreateButton from "./component/createButton";
import StockTalbe from "./component/stockTable";
import { fetchStock } from "./action";

export default async function Page({ searchParams }: { searchParams: any }) {
  const fetchServices = new fetchService();
  // const [inputStock, setInputStock] = useState<string>("");
  // const [errorToastData, setErrorToastData] = useState<ErrorToastDataType>(
  //   defaultErrorToastData
  // );
  // const [tableData, setTableData] = useState<GroupItem[] | null>(null);

  // const [deleteDialogData, setDeleteDialogData] =
  //   useState<DefaultDialogType>(defaultDeleteDialog);

  // const searchParams = useSearchParams();
  // const pathName = usePathname();
  // const { replace } = useRouter();
  // const fetchStock = async (stock: string) => {
  //   try {
  //     const result = await fetchServices.MockGetStockInfo(stock);
  //     // if (!result.length) {
  //     //   openErrorToast(setErrorToastData, {
  //     //     isOpen: true,
  //     //     errorMesssage: "查無資訊，請更改搜尋條件",
  //     //   });
  //     // }
  //     return result;
  //   } catch (errors) {
  //     // openErrorToast(setErrorToastData, errors);
  //     console.log('error', errors)
  //   }
  //   // finally {
  //   //   setTimeout(() => setErrorToastData(defaultErrorToastData), 2000);
  //   // }
  // };
  const rawData = await fetchStock(searchParams?.query || "");

  // const openDeleteDialog = (stockId: string, stockName: string) => {
  //   setDeleteDialogData({
  //     isOpen: true,
  //     message: `是否確認刪除股票 ${stockId} ${stockName} ?`,
  //     stockId,
  //   });
  // };

  // const openEditDialog = (
  //   stockId: string,
  //   stockName: string,
  //   industryCategory: string
  // ) => {
  //   setIsOpenCreateEdit({
  //     isOpen: true,
  //     variant: DefaultCreateEditEnum.edit,
  //     defaultValues: {
  //       stockId,
  //       stockName,
  //       industryCategory,
  //     },
  //   });
  // };

  // useEffect(() => {
  //   fetchStock(inputStock);
  // }, []);

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
      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorToastData.isOpen}
        onClose={() => setErrorToastData(defaultErrorToastData)}
        message={errorToastData.errorMessage}
      />
      <CreateEditDialog
        dialogData={isOpenCreateEdit}
        setDialogData={setIsOpenCreateEdit}
        fetchStock={fetchStock}
      />
      <DeleteDialog
        deleteDialogData={deleteDialogData}
        setDeleteDialogData={setDeleteDialogData}
        fetchStock={fetchStock}
      /> */}
    </Box>
  );
}
