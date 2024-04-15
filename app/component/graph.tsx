"use client";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMemo, useState } from "react";
import { yearsDropdownOptions } from "../constant";
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
} from "chart.js";
import {
  getSepcificStockWithDate,
  getYearBeofore,
  getYearLabels,
  processYoy,
  stripFirstYearRevenue,
} from "../utils";
import { SelectedStockType } from "../type";

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
  graphData: number[];
  setGraphData: (graphData: number[]) => void;
  selectedStockId: SelectedStockType["stockId"];
  yoy: number[];
  setYoy: (yoy: number[]) => void;
}

export const Graph = ({
  startDate,
  setStartDate,
  graphData,
  setGraphData,
  selectedStockId,
  yoy,
  setYoy,
}: PropsType): React.ReactElement => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [buttonText, setButtonText] = useState<string>("近5年");
  const open = Boolean(anchorEl);
  const labels = useMemo(() => getYearLabels(startDate), [startDate]);

  const openMenu: (event: React.MouseEvent<HTMLButtonElement>) => void = (
    event
  ) => setAnchorEl(event.currentTarget);

  const closeMenu = (): void => setAnchorEl(null);

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "white",
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
                selectedStockId &&
                  getSepcificStockWithDate(
                    selectedStockId.toString(),
                    // get both data for graph & data for yoy analysis at one api call
                    // e.g. get data from 2020-04-15 to 2024-04-15 for yoy analysis
                    // so comparasion could start for data of 2020-04-15 and 2021-04-15
                    getYearBeofore(option.value)
                  ).then((data) => {
                    if (data) {
                      setGraphData(stripFirstYearRevenue(data));
                      setYoy(processYoy(data));
                    }
                  });
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
          scales: {
            x: {
              ticks: {
                maxRotation: 0,
                minRotation: 0,
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
              backgroundColor: "#FCDF9B",
              data: graphData,
              borderColor: "#F1AB02",
              borderWidth: 2,
            },
          ],
        }}
      />
    </Box>
  );
};
