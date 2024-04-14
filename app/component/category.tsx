import { Box, Typography } from "@mui/material";
import React from "react";
import { CategoryPropsType } from "../type";

export const Category = ({
  title,
  desc,
  isActive,
  titleColor,
  descStyle,
}: CategoryPropsType): React.ReactElement => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      color: titleColor,
      cursor: "pointer",
      paddingLeft: "20px",
      alignItems: "center",
      borderLeft: isActive ? "2px solid #0286F4" : "",
      whiteSpace: "nowrap",
    }}
  >
    <Typography component="h4" sx={{ fontSize: 24 }}>
      {title}
    </Typography>
    <Typography
      component="p"
      sx={{
        fontWeight: isActive ? "bold" : "regular",
        color: isActive ? "#138DF3" : "#434343",
        ...descStyle,
      }}
    >
      {desc}
    </Typography>
  </Box>
);
