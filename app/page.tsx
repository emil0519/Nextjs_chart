import { Box } from "@mui/material";
import { Header } from "./component/header";
import { SideBar } from "./component/sideBar";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Box sx={{ display: "flex", margin: "50px auto" }}>
        <SideBar />
      </Box>
    </Box>
  );
}
