import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default async function Header() {
  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        height: "10vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "white",
        padding: "0 40px",
      }}
    >
      <Typography
        component="h1"
        color="#138DF3"
        sx={{
          fontSize: "20px",
          fontWeight: 700,
        }}
      >
        股票管理後台
      </Typography>

      <Button
        variant="contained"
        sx={{ width: "fit-content", height: "fit-content", marginRight: "5%" }}
      >
        <Link href="/">前往客戶前台</Link>
      </Button>
    </Box>
  );
}
