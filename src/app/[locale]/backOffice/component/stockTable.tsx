"use client";

import Box from "@mui/material/Box";
import { GroupItem } from "./tableComponent/type";
import TableComponennt from "./tableComponent/tableComponent";
import {
  DefaultCreateEditDialogType,
  DefaultCreateEditEnum,
  DefaultDialogType,
  DropDownApiDataType,
  ErrorToastDataType,
} from "@/src/app/[locale]/type";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {
  defaultCreateEditDialog,
  defaultDeleteDialog,
  defaultErrorToastData,
} from "@/src/app/[locale]/constant";
import CreateEditDialog from "./createEditDialog";
import DeleteDialog from "./deleteDialog";
import Snackbar from "@mui/material/Snackbar";
import { openErrorToast } from "@/src/app/[locale]/utils";
import { useTranslations } from "next-intl";

interface PropsType {
  rawData: DropDownApiDataType[];
  fetchStock: (stock: string) => Promise<DropDownApiDataType[] | undefined>;
}
export default function StockTalbe({
  rawData,
  fetchStock,
}: PropsType): React.ReactElement {
  const t = useTranslations("BackOffice");
  const tCommon = useTranslations("Common");
  const [tableData, setTableData] = useState<GroupItem[] | null>(null);
  const [isOpenCreateEdit, setIsOpenCreateEdit] =
    useState<DefaultCreateEditDialogType>(defaultCreateEditDialog);
  const [deleteDialogData, setDeleteDialogData] =
    useState<DefaultDialogType>(defaultDeleteDialog);
  const [errorToastData, setErrorToastData] = useState<ErrorToastDataType>(
    defaultErrorToastData
  );

  const openEditDialog = (
    stockId: string,
    stockName: string,
    industryCategory: string
  ) => {
    setIsOpenCreateEdit({
      isOpen: true,
      variant: DefaultCreateEditEnum.edit,
      defaultValues: {
        stockId,
        stockName,
        industryCategory,
      },
    });
  };
  const openDeleteDialog = (stockId: string, stockName: string) => {
    setDeleteDialogData({
      isOpen: true,
      message: `${t("confirmDeleteStock")} ${stockId} ${stockName} ?`,
      stockId,
    });
  };

  useEffect(() => {
    if (rawData.length) {
      setTableData(generateTableBody(rawData));
    } else {
      openErrorToast(setErrorToastData, {
        isOpen: true,
        errorMesssage: t("noData"),
      });
    }
  }, [rawData]);

  const generateTableBody = (body: DropDownApiDataType[]): GroupItem[] =>
    body.map((item, index) => ({
      rowId: `row-${index}`,
      columns: [
        {
          // 股票編號
          id: `column-${item.stock_id}-1`,
          cell: (
            <Typography
              component="p"
              sx={{
                color: "#40425A",
                fontSize: "14px",
                fontFamily: "Noto Sans TC",
              }}
            >
              {item.stock_id}
            </Typography>
          ),
        },
        {
          // 產業
          id: `column-${item.industry_category}-2`,
          cell: (
            <Typography
              component="p"
              sx={{
                color: "#40425A",
                fontSize: "14px",
                fontFamily: "Noto Sans TC",
              }}
            >
              {item.industry_category}
            </Typography>
          ),
        },
        {
          // 股票名稱
          id: `column-${item.stock_name}-3`,
          cell: (
            <Typography
              component="p"
              sx={{
                color: "#40425A",
                fontSize: "14px",
                fontFamily: "Noto Sans TC",
              }}
            >
              {item.stock_name}
            </Typography>
          ),
        },
        {
          // 建立時間
          id: `column-${item.date}-4`,
          cell: (
            <Typography
              component="p"
              sx={{
                color: "#40425A",
                fontSize: "14px",
                fontFamily: "Noto Sans TC",
              }}
            >
              {dayjs(item.date).format("YYYY/MM/DD HH:mm")}
            </Typography>
          ),
        },
        {
          // 動作
          id: `column-${index}-5`,
          cell: (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <Button
                variant="outlined"
                sx={{ width: "fit-content" }}
                onClick={() =>
                  openEditDialog(
                    item.stock_id,
                    item.stock_name,
                    item.industry_category
                  )
                }
              >
                {tCommon("edit")}
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ width: "fit-content" }}
                onClick={() => openDeleteDialog(item.stock_id, item.stock_name)}
              >
                {tCommon("delete")}
              </Button>
            </Box>
          ),
        },
      ],
    }));
  return (
    <>
      <Box sx={{ margin: "24px" }}>
        {tableData && (
          <TableComponennt
            headers={[
              {
                id: 0,
                content: <Box maxWidth="150px">{t("stockSymbol")}</Box>,
              },
              {
                id: 1,
                content: <Box maxWidth="150px">{t("industry")}</Box>,
              },
              {
                id: 2,
                content: <Box maxWidth="150px">{t("stockName")}</Box>,
              },
              {
                id: 3,
                content: <Box maxWidth="150px">{t("createTime")}</Box>,
              },
              {
                id: 4,
                content: <Box maxWidth="50px">{tCommon("action")}</Box>,
              },
            ]}
            bodys={tableData}
          />
        )}
      </Box>
      <CreateEditDialog
        dialogData={isOpenCreateEdit}
        setDialogData={setIsOpenCreateEdit}
        fetchStock={fetchStock}
      />
      <DeleteDialog
        deleteDialogData={deleteDialogData}
        setDeleteDialogData={setDeleteDialogData}
        fetchStock={fetchStock}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorToastData.isOpen}
        onClose={() => setErrorToastData(defaultErrorToastData)}
        message={errorToastData.errorMessage}
      />
    </>
  );
}
