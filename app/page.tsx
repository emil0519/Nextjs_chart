import { Box } from "@mui/material";
import { Header } from "./component/header";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
        <Header />
    </Box>
  );
}
