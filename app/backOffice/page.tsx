"use client";

import { Box, Button, Input, Snackbar, Typography } from "@mui/material";
import Information from "./component/information";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";
import { fetchService } from "../service/fetchService";
import { DropDownApiDataType, ErrorToastDataType } from "../type";
import { defaultErrorToastData } from "../constant";
import { openErrorToast } from "../utils";
import TableComponennt from "./component/tableComponent/tableComponent";
import dayjs from "dayjs";
import { GroupItem } from "./component/tableComponent/type";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Page() {
  const fetchServices = new fetchService();
  const [inputStock, setInputStock] = useState<string>("");
  const [errorToastData, setErrorToastData] = useState<ErrorToastDataType>(
    defaultErrorToastData
  );
  const [tableData, setTableData] = useState<GroupItem[] | null>(null);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

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
      ],
    }));

  const fetchStock = async (stock: string) => {
    try {
      const result = await fetchServices.MockGetStockInfo(stock);
      console.log('result',result)
      setTableData(generateTableBody(result));
    } catch (errors) {
      openErrorToast(setErrorToastData, errors);
    } finally {
      setTimeout(() => setErrorToastData(defaultErrorToastData), 2000);
    }
  };

  const handleInputChange = useDebouncedCallback((input: string) => {
    setInputStock(input)
    const params = new URLSearchParams(searchParams);
    if (input) {
      params.set("query", input);
    } else {
      params.delete("query");
    }
    replace(`${pathName}?${params.toString()}`);
  }, 300);

  const handleSearch = () => fetchStock(inputStock);

  useEffect(() => {
    fetchStock(inputStock);
  }, []);

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
        <Button
          variant="outlined"
          sx={{
            width: "fit-content",
            height: "fit-content",
            marginRight: "5%",
          }}
        >
          <Typography component="h4">新增股票</Typography>
        </Button>
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
          股票編號/名稱
        </Typography>
        <Box sx={{ display: "flex", gap: "12px" }}>
          <Input
            placeholder="輸入股票編號/名稱，留空即搜尋所有股票"
            sx={{ width: "300px" }}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <Button variant="outlined" sx={{ display: "flex", gap: "4px" }} 
              onClick={handleSearch}
              >
            <SearchOutlinedIcon />
            <Typography
              component="p"
              sx={{ fontSize: "12px" }}
            >
              查詢
            </Typography>
          </Button>
        </Box>
      </Box>
      {tableData && (
        <Box sx={{ margin: "24px" }}>
          <TableComponennt
            headers={[
              {
                id: 0,
                content: <Box maxWidth="150px">股票編號</Box>,
              },
              {
                id: 1,
                content: <Box maxWidth="150px">產業</Box>,
              },
              {
                id: 2,
                content: <Box maxWidth="150px">股票名稱</Box>,
              },
              {
                id: 3,
                content: <Box maxWidth="150px">建立時間</Box>,
              },
            ]}
            bodys={tableData}
          />
        </Box>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorToastData.isOpen}
        onClose={() => setErrorToastData(defaultErrorToastData)}
        message={errorToastData.errorMessage}
      />
    </Box>
  );
}
