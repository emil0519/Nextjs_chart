"use client";

import { Box, Button, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDebouncedCallback } from "use-debounce";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  DropDownApiDataType,
  GraphDataType,
  ErrorToastDataType,
  SelectedStockType,
} from "../type";
import {
  formatTitle,
  getSepcificStockWithDate,
  getYearBeofore,
  openErrorToast,
  processYoy,
  stripFirstYear,
} from "../utils";
import { defaultErrorToastData, mainCateoryList } from "../constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { v4 as uuid } from "uuid";
import Link from "next/link";

import { fetchService } from "../service/fetchService";
import Hamburger from "./hamburger";
import useMediaQuery from "@mui/material/useMediaQuery";

interface PropsType {
  startDate: string;
  setSelectedStock: Dispatch<SetStateAction<SelectedStockType>>;
  setGraphData: (graphData: GraphDataType[]) => void;
  setYoy: (yoy: number[]) => void;
  setErrorToastData: (errorToastData: ErrorToastDataType) => void;
}

export const Header = ({
  startDate,
  setSelectedStock,
  setGraphData,
  setYoy,
  setErrorToastData,
}: PropsType): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchServices = new fetchService();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [dropDownData, setDropDownData] = useState<DropDownApiDataType[]>([]);
  const [isSideBarOpen, setIsSetBarOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const getDropDownData = useDebouncedCallback(async (input: string) => {
    try {
      setIsLoading(true);
      const data = await fetchServices.GetStockInfo(input);
      setIsLoading(false);
      setDropDownData(data);
    } catch (errors) {
      setIsLoading(false);
      openErrorToast(setErrorToastData, errors);
    }
  }, 500);
  const changeParams = (input: string | undefined): void => {
    const params = new URLSearchParams(searchParams);
    if (input) {
      params.set("stock", input);
    } else {
      params.delete("stock");
    }
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: theme.color.white,
        maxHeight: isSideBarOpen ? "1000px" : "88px",
        overflow: "hidden",
        transition: "max-height 500ms ease-in-out",
      }}
    >
      <Box
        sx={{
          width:"100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: { xs: "24px", lg: "0" },
        }}
      >
        <Box
          sx={{ display: { xs: "block", lg: "none" }, marginLeft: "5%" }}
          onClick={() => setIsSetBarOpen((prevState) => !prevState)}
        >
          <Hamburger isOpen={isSideBarOpen} />
        </Box>
        <Box sx={{ display: { xs: "none", lg: "block" } }}></Box>
        {/* Search bar */}
        <Autocomplete
          sx={{
            width: 400,
            marginTop: 2,
            marginBottom: 2,
            marginLeft: { xs: "0", lg: "5%" },
          }}
          aria-haspopup
          options={dropDownData}
          getOptionLabel={(option) => formatTitle(option)}
          isOptionEqualToValue={(option, value) =>
            option.stock_id === value.stock_id
          }
          renderOption={(props, option) => (
            <li {...props} key={uuid()}>
              {formatTitle(option)}
            </li>
          )}
          onChange={(_, value) => {
            changeParams(value?.stock_id);
            if (value) {
              setSelectedStock({
                name: formatTitle(value),
                stockId: Number(value.stock_id),
              });
              try {
                getSepcificStockWithDate(
                  value.stock_id,
                  getYearBeofore(startDate)
                )
                  .then((data) => {
                    if (data?.length) {
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
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : (
                      <Search />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Button
          variant="contained"
          sx={{
            width: "fit-content",
            height: "fit-content",
            marginRight: "5%",
          }}
          size={isSmallScreen ? "small" : "medium"}
        >
          <Link href="/backOffice">To backoffice (multiple language)</Link>
        </Button>
      </Box>
      <Box
        sx={{
          display: { xs: "flex", lg: "none" },
          flexDirection: { xs: "column", lg: "" },
          marginY: 4,
          gap: 3,
          opacity: { xs: isSideBarOpen ? 1 : 0, lg: 1 },
          pointerEvents: { xs: isSideBarOpen ? "auto" : "none", lg: "auto" },
          marginTop: { lg: "145px" },
          position: isSideBarOpen ? "static" : "absolute",
          overflow: "hidden",
        }}
      >
        {mainCateoryList.map((nav) => (
          <Box
            key={nav.title}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              typography: "body1",
              "&:hover": {
                color: theme.color.darkBlue,
              },
              gap: { xs: 2, xl: 5 },
              fontSize: { xs: "inherit", xl: "22px" },
            }}
          >
            {nav.desc}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
