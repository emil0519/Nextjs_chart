"use client";

import { Box, Snackbar } from "@mui/material";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { defaultErrorToastData } from "./constant";
import { fetchService } from "./service/fetchService";
import { SelectedStockType, GraphDataType, ErrorToastDataType } from "./type";
import {
  formatDate,
  getSepcificStockWithDate,
  getYearBeofore,
  formatTitle,
  stripFirstYear,
  processYoy,
  openErrorToast,
} from "./utils";
import { DataTable } from "./component/dataTable";
import { Graph } from "./component/graph";
import { Header } from "./component/header";
import { SideBar } from "./component/sideBar";
import { Title } from "./component/title";

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
  const fetchServices = new fetchService();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  // Prefetch under 2 condition
  // 1. No query string: prefetch 2330 (TSMC) as default stock
  // 2. With query string: fetch data in query string
  useEffect(() => {
    const stock = searchParams.get("stock");
    const defaultStock = "2330";

    const fetchData = async () => {
      try {
        const [stockInfo, specificStockData] = await Promise.all([
          stock ? fetchServices.GetStockInfo(stock) : Promise.resolve(null),
          getSepcificStockWithDate(
            stock || defaultStock,
            getYearBeofore(startDate)
          ),
        ]);
        if (stockInfo?.length === 0 || specificStockData?.length === 0) {
          throw new Error("您輸入的股票編號不存在，請重新查詢");
        }
        if (stock && stockInfo) {
          setSelectedStock({
            name: formatTitle(stockInfo[0]),
            stockId: Number(stock),
          });
        } else {
          setSelectedStock({
            name: "台積電(2330)",
            stockId: 2330,
          });
          replace(`${pathName}?stock=2330`);
        }
        if (specificStockData) {
          setGraphData(stripFirstYear(specificStockData));
          setYoy(processYoy(specificStockData));
        }
      } catch (errors) {
        openErrorToast(setErrorToastData, errors);
      } finally {
        setTimeout(() => setErrorToastData(defaultErrorToastData), 2000);
      }
    };

    fetchData();
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
        sx={{
          display: "flex",
          margin: { xs: "0", lg: "50px auto" },
          gap: 5,
        }}
      >
        <SideBar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 1, lg: 2 },
            width: { xs: "100vw", lg: "100%" },
            maxWidth: { xs: "100%", lg: "800px" },
          }}
        >
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
