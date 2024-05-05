import { Box, Typography } from "@mui/material";

export default async function Page() {
  return (
    <Box sx={{display:"flex", flexDirection:'column'}}>
    <Box sx={{margin:"24px", display:'flex', justifyContent:'space-between'}}><Typography component='h2' sx={{fontSize:"24px", fontWeight:600}}>查詢股票資料</Typography></Box>
  </Box>
  )
}
