"use client";
import { Box } from "@mui/material";

import React, { useState } from "react";
import { Category } from "./category";
import { mainCateoryList } from "../constant";

export const SideBar = (): React.ReactElement => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  return (
    <Box component="aside">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {mainCateoryList.map((category) => (
          <Box
            key={category.title}
            onClick={() => setSelectedCategory(category.title)}
          >
            <Category
              title={category.title}
              titleColor={category.titleColor}
              desc={category.desc}
              isActive={selectedCategory === category.title}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
