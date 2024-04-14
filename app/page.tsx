"use client";

import { Box } from "@mui/material";
import { Header } from "./component/header";
import { SideBar } from "./component/sideBar";
import { Title } from "./component/title";
import { useState } from "react";
import { Graph } from "./component/graph";
import { formatDate } from "./utils";

export default function Home() {
  const [selectedStock, setSelectedStock] = useState<string>("請選擇股票");
  const [startDate, setStartDate]=useState<string>(formatDate(5))
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Header startDate={startDate} setSelectedStock={setSelectedStock} />
      <Box
        component="main"
        sx={{ display: "flex", margin: "50px auto", gap: 5 }}
      >
        <SideBar />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Title title={selectedStock} />
          <Graph startDate={startDate} setStartDate={setStartDate}/>
        </Box>
      </Box>
    </Box>
  );
}
