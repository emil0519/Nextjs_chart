"use client";
import { backOfficeCategoryList } from "@/app/constant";
import { Box } from "@mui/material";
import { useState } from "react";
import Option from "./option";

export default function SideBar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("查詢股票資料");
  return (
    <Box
      sx={{
        background: "white",
        width:"20vw",
        maxWidth:"200px",
        border:"1px solid Gainsboro",
        paddingTop: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minHeight:"95vh"
      }}
    >
      {backOfficeCategoryList.map((category) => (
        <Box
          key={category.desc}
          onClick={() => setSelectedCategory(category.desc)}
        >
          <Option
            title={category.desc}
            href={category.href}
            isSelected={selectedCategory === category.desc}
          />
        </Box>
      ))}
    </Box>
  );
}
