import { Box } from "@mui/material";
import Header from "./component/header";
import SideBar from "./component/sideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Box sx={{ display: "flex" }}>
        <SideBar /> {children}
      </Box>
    </Box>
  );
}
