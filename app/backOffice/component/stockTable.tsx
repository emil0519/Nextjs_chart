"use client";

import Box from "@mui/material/Box";
import { GroupItem } from "./tableComponent/type";
import TableComponennt from "./tableComponent/tableComponent";
import { DropDownApiDataType } from "@/app/type";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

interface PropsType {
  rawData: DropDownApiDataType[];
}
export default function StockTalbe({ rawData }: PropsType): React.ReactElement {
  const [tableData, setTableData] = useState<GroupItem[] | null>(null);

  useEffect(() => {
    setTableData(generateTableBody(rawData));
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
                // onClick={() =>
                //   openEditDialog(
                //     item.stock_id,
                //     item.stock_name,
                //     item.industry_category
                //   )
                // }
              >
                編輯
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ width: "fit-content" }}
                // onClick={() => openDeleteDialog(item.stock_id, item.stock_name)}
              >
                刪除
              </Button>
            </Box>
          ),
        },
      ],
    }));
  return (
    <Box sx={{ margin: "24px" }}>
      {tableData && (
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
            {
              id: 4,
              content: <Box maxWidth="50px">動作</Box>,
            },
          ]}
          bodys={tableData}
        />
      )}
    </Box>
  );
}
