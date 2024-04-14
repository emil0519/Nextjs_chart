"use client";

import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { finmindToken, finmindtradeDomain } from "../constant";
import { useDebouncedCallback } from "use-debounce";
import React, { useState } from "react";
import { ApiResponseType, DropDownApiDataType } from "../type";

export const Header = (): React.ReactElement => {
  const theme = useTheme();
  const [dropDownData, setDropDownData] = useState<string[]>([]);
  const getDropDownData = useDebouncedCallback(async (input: string) => {
    try {
      const res = await fetch(
        `${finmindtradeDomain}&data_id=${input}&token=${finmindToken}`,
        {
          method: "GET",
        }
      );
      const data: ApiResponseType<DropDownApiDataType[]> = await res.json();
      setDropDownData(processDropDownData(data.data));
    } catch (err) {
      console.log(err);
    }
  }, 500);

  const processDropDownData = (data: DropDownApiDataType[]) =>
    data.map((item) => `${item.stock_id} ${item.stock_name}`);

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
        options={dropDownData}
        sx={{
          width: 400,
          marginTop: 2,
          marginBottom: 2,
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "white",
          },
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
