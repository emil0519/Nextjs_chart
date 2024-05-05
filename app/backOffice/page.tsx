import { Box, Button, Input, Typography } from "@mui/material";
import Information from "./component/information";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default async function Page() {
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
          <Input placeholder="輸入股票編號/名稱，留空即搜尋所有股票" sx={{width:"300px"}}/>
          <Button variant='outlined' sx={{display:'flex', gap:'4px'}}><SearchOutlinedIcon /><Typography component='p' sx={{fontSize:'12px'}}>查詢</Typography></Button>
        </Box>
      </Box>
    </Box>
  );
}
