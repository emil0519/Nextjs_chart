"use client";

import { Box, Snackbar } from "@mui/material";
import { Header } from "./component/header";
import { SideBar } from "./component/sideBar";
import { Title } from "./component/title";
import { useEffect, useState } from "react";
import { Graph } from "./component/graph";
import {
  formatDate,
  getSepcificStockWithDate,
  getYearBeofore,
  processYoy,
  stripFirstYear,
  openErrorToast,
} from "./utils";
import { ErrorToastDataType, GraphDataType, SelectedStockType } from "./type";
import { DataTable } from "./component/dataTable";
import { defaultErrorToastData } from "./constant";

export default function Home() {
  const [selectedStock, setSelectedStock] = useState<SelectedStockType>({
    name: "請選擇股票",
    stockId: null,
  });
  const [startDate, setStartDate] = useState<string>(formatDate(5));
  const [graphData, setGraphData] = useState<GraphDataType[]>([]);
  const [yoy, setYoy] = useState<number[]>([]);
  const [errorToastData, setErrorToastData] = useState<ErrorToastDataType>(
    defaultErrorToastData
  );
  // Set default search result upon entering the page
  useEffect(() => {
    setSelectedStock({
      name: "台積電(2330)",
      stockId: 2330,
    });
    try {
      getSepcificStockWithDate("2330", getYearBeofore(startDate))
        .then((data) => {
          if (data) {
            setGraphData(stripFirstYear(data));
            setYoy(processYoy(data));
          }
        })
        .catch((errors: any) => {
          openErrorToast(setErrorToastData, errors);
        });
    } finally {
      setTimeout(() => setErrorToastData(defaultErrorToastData), 2000);
    }
  }, []);

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
        setYoy={setYoy}
        setErrorToastData={setErrorToastData}
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
            yoy={yoy}
            setYoy={setYoy}
            setErrorToastData={setErrorToastData}
          />
          <DataTable graphData={graphData} yoy={yoy} />
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorToastData.isOpen}
        onClose={() => setErrorToastData(defaultErrorToastData)}
        message={errorToastData.errorMessage}
      />
    </Box>
  );
}
