"use client";
import { Box } from "@mui/material";

import React, { useState } from "react";
import { Category } from "./category";
import { mainCateoryList, subCateoryList } from "../constant";

export const SideBar = (): React.ReactElement => {
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>("B");
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<string>("每月營收");
  return (
    <Box component="aside" sx={{ display: { xs: "none", lg: "flex" }, gap: 1 }}>
      <Box
        component="nav"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Main category on left side */}
        {mainCateoryList.map((category) => (
          <Box
            key={category.title}
            onClick={() => setSelectedMainCategory(category.title || "")}
          >
            <Category
              title={category.title}
              titleColor={category.titleColor}
              desc={category.desc}
              isActive={selectedMainCategory === category.title}
            />
          </Box>
        ))}
      </Box>
      {/* Vertical Divider */}
      <Box sx={{ height: "100%", backgroundColor: "#DFDFDF", width: "2px" }} />
      {/* Subcategory on the right */}
      <Box
        component="nav"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {subCateoryList.map((category) => (
          <Box
            key={category.desc}
            onClick={() => setSelectedSubCategory(category.desc || "")}
          >
            <Category
              desc={category.desc}
              descStyle={{ fontWeight: "bold" }}
              isActive={selectedSubCategory === category.desc}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
