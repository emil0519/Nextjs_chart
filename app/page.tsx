"use client";

import { Box } from "@mui/material";
import { Header } from "./component/header";
import { SideBar } from "./component/sideBar";
import { Title } from "./component/title";
import { useState } from "react";
import { Graph } from "./component/graph";
import { formatDate } from "./utils";
import { SelectedStockType } from "./type";

export default function Home() {
  const [selectedStock, setSelectedStock] = useState<SelectedStockType>({
    name: "請選擇股票",
    stockId: null,
  });
  const [startDate, setStartDate] = useState<string>(formatDate(5));
  const [graphData, setGraphData] = useState<number[]>([]);

  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Header
        startDate={startDate}
        setSelectedStock={setSelectedStock}
        setGraphData={setGraphData}
      />
      <Box
        component="main"
        sx={{ display: "flex", margin: "50px auto", gap: 5 }}
      >
        <SideBar />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Title title={selectedStock.name} />
          <Graph
            startDate={startDate}
            setStartDate={setStartDate}
            graphData={graphData}
            setGraphData={setGraphData}
            selectedStockId={selectedStock.stockId}
          />
        </Box>
      </Box>
    </Box>
  );
}
