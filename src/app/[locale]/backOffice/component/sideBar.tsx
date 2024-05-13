"use client";
import { Box } from "@mui/material";
import { useState } from "react";
import Option from "./option";
import { BackOfficeListType } from "@/src/app/type";
import { useTranslations } from "next-intl";
// import { useRouter } from 'next/router';

export default function SideBar() {
  const t = useTranslations("BackOffice");
  const [selectedCategory, setSelectedCategory] = useState<string>(t('searchStockInfo'));
  const backOfficeCategoryList: BackOfficeListType[] = [
    { desc: t('searchStockInfo'), href: "/backoOffice/" },
  ];
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
