"use client";
import { Box, Button, Menu, MenuItem, useTheme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMemo, useState } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  TooltipItem,
  ChartType,
} from "chart.js";
import {
  getDisplayGraphData,
  getSepcificStockWithDate,
  getYearBeofore,
  getYearLabels,
  openErrorToast,
  processYoy,
  stripFirstYear,
} from "../utils";
import { ErrorToastDataType, GraphDataType, SelectedStockType } from "../type";
import { defaultErrorToastData, yearsDropdownOptions } from "../constant";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

interface PropsType {
  startDate: string;
  setStartDate: (startDate: string) => void;
  graphData: GraphDataType[];
  setGraphData: (graphData: GraphDataType[]) => void;
  selectedStockId: SelectedStockType["stockId"];
  yoy: number[];
  setYoy: (yoy: number[]) => void;
  setErrorToastData: (errorToastData: ErrorToastDataType) => void;
}

export const Graph = ({
  startDate,
  setStartDate,
  graphData,
  setGraphData,
  selectedStockId,
  yoy,
  setYoy,
  setErrorToastData,
}: PropsType): React.ReactElement => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [buttonText, setButtonText] = useState<string>("近5年");
  const open = Boolean(anchorEl);
  const labels = useMemo(() => getYearLabels(startDate), [startDate]);
  const theme = useTheme();
  const formattedLabel = useMemo(
    () =>
      graphData.map(
        (monthData) => `${monthData.revenue_year}年${monthData.revenue_month}月`
      ),
    [graphData]
  );
  const openMenu: (event: React.MouseEvent<HTMLButtonElement>) => void = (
    event
  ) => setAnchorEl(event.currentTarget);

  const closeMenu = (): void => setAnchorEl(null);
  const footer = (tooltipItems: TooltipItem<ChartType>[]) => {
    const datasetIndex = tooltipItems[0].datasetIndex;
    const dataIndex = tooltipItems[0].dataIndex;
    // referring to first dataset pass in data props
    if (datasetIndex === 0) {
      return `${formattedLabel[dataIndex]}的單月營收年增率 = ${tooltipItems[0].dataset.data[dataIndex]}`;
    }
    // referring to second dataset pass in data props
    if (datasetIndex === 1) {
      return `${
        formattedLabel[dataIndex]
      }的營收 = ${tooltipItems[0].dataset.data[dataIndex]?.toLocaleString()}`;
    }
  };

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: theme.color.white,
        border: "1px solid #DFDFDF",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "20px 10px",
      }}
    >
      {/* Button above graphs */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained">每月營收</Button>
        {/* Years select options */}
        <Button
          variant="contained"
          id="year-dropdown-button"
          aria-controls="dropdown-menu"
          aria-haspopup
          endIcon={<ExpandMoreIcon />}
          onClick={openMenu}
        >
          {buttonText}
        </Button>
        <Menu
          id="year-dropdown-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={closeMenu}
        >
          {yearsDropdownOptions.map((option) => (
            <MenuItem
              key={option.key}
              value={option.value}
              onClick={() => {
                closeMenu();
                setButtonText(option.key);
                setStartDate(option.value);
                if (selectedStockId) {
                  try {
                    getSepcificStockWithDate(
                      selectedStockId.toString(),
                      // get both data for graph & data for yoy analysis at one api call
                      // e.g. get data from 2020-04-15 to 2024-04-15 for yoy analysis
                      // so comparasion could start for data of 2020-04-15 and 2021-04-15
                      getYearBeofore(option.value)
                    )
                      .then((data) => {
                        if (data) {
                          setGraphData(stripFirstYear(data));
                          setYoy(processYoy(data));
                        } else {
                          openErrorToast(setErrorToastData);
                          setGraphData([]);
                          setYoy([]);
                        }
                      })
                      .catch((errors: any) => {
                        openErrorToast(setErrorToastData, errors);
                      });
                  } finally {
                    setTimeout(
                      () => setErrorToastData(defaultErrorToastData),
                      2000
                    );
                  }
                }
              }}
            >
              {option.key}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Chart
        type="bar"
        options={{
          plugins: {
            tooltip: {
              callbacks: {
                footer: footer,
              },
            },
          },
          scales: {
            x: {
              ticks: {
                maxRotation: 0,
                minRotation: 0,
                autoSkip: false,
              },
            },
            y: {
              position: "right",
              title: {
                text: "%",
                display: true,
                align: "end",
              },
            },
            y1: {
              position: "left",
              title: {
                text: "元",
                display: true,
                align: "end",
              },
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              type: "line" as const,
              label: "單月營收年增率",
              yAxisID: "y",
              backgroundColor: "#CB4B4B",
              borderColor: "#CB4B4B",
              data: yoy,
            },
            {
              type: "bar" as const,
              label: "每月營收",
              yAxisID: "y1",
              backgroundColor: theme.color.yellow,
              data: getDisplayGraphData(graphData),
              borderColor: theme.color.darkYellow,
              borderWidth: 2,
            },
          ],
        }}
      />
    </Box>
  );
};
