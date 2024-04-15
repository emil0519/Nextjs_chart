"use client";

import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDebouncedCallback } from "use-debounce";
import React, { Dispatch, SetStateAction, useState } from "react";
import { DropDownApiDataType, SelectedStockType } from "../type";
import { fetchService } from "../service/fetchService";
import { getSepcificStockWithDate } from "../utils";

interface PropsType {
  startDate: string;
  setSelectedStock: Dispatch<SetStateAction<SelectedStockType>>;
  setGraphData: (graphData: number[]) => void;
}

export const Header = ({
  startDate,
  setSelectedStock,
  setGraphData,
}: PropsType): React.ReactElement => {
  const fetchServices = new fetchService();
  const theme = useTheme();
  const [dropDownData, setDropDownData] = useState<DropDownApiDataType[]>([]);
  const getDropDownData = useDebouncedCallback(async (input: string) => {
    try {
      const data = await fetchServices.GetStockInfo(input);
      setDropDownData(data);
    } catch (err) {
      console.log(err);
    }
  }, 500);

  const formatTitle = (option: DropDownApiDataType): string =>
    `${option.stock_name}(${option.stock_id})`;

  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: theme.background.white,
      }}
    >
      <Autocomplete
        sx={{
          width: 400,
          marginTop: 2,
          marginBottom: 2,
        }}
        aria-haspopup
        options={dropDownData}
        getOptionLabel={(option) => formatTitle(option)}
        onChange={(_, value) => {
          if (value) {
            setSelectedStock({
              name: formatTitle(value),
              stockId: Number(value.stock_id),
            });
            getSepcificStockWithDate(value.stock_id, startDate).then((data) => {
              if (data)
                setGraphData(data.map((monthlyData) => monthlyData.revenue));
            });
          }
        }}
        clearOnBlur={false}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="輸入台 / 美股代號，查看公司價值"
            onChange={(e) => getDropDownData(e.target.value)}
            onFocus={(e) => getDropDownData(e.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};
