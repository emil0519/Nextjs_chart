"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchSection(): React.ReactElement {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [inputStock, setInputStock] = useState<string>("");
  const handleInputChange = (input: string) => {
    setInputStock(input);
  }
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (inputStock) {
      params.set("query", inputStock);
    } else {
      params.delete("query");
    }
    replace(`${pathName}?${params.toString()}`);
  };

  useEffect(()=>{
    const queryValue = searchParams.get('query');
    if (!queryValue) {
      setInputStock('');
    }
  },[searchParams])

  return (
    <Box sx={{ display: "flex", gap: "12px" }}>
      <Input
        placeholder="輸入股票編號，留空即搜尋所有股票"
        sx={{ width: "300px" }}
        onChange={(e) => handleInputChange(e.target.value)}
        value={inputStock}
        name="stock_id_input"
      />
      <Button
        variant="outlined"
        sx={{ display: "flex", gap: "4px" }}
        onClick={handleSearch}
      >
        <SearchOutlinedIcon />
        <Typography component="p" sx={{ fontSize: "12px" }}>
          查詢
        </Typography>
      </Button>
    </Box>
  );
}
