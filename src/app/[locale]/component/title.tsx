import { Box, Typography } from "@mui/material";
import { SelectedStockType } from "../type";

export const Title = ({
  title,
}: {
  title: SelectedStockType["name"];
}): React.ReactElement => (
  <Box
    sx={{
      backgroundColor: "#FAFAFA",
      width: { xs: "100%", lg: "800px" },
      padding: "8px 16px",
      height: { xs: "75px", lg: "50px" },
      display: { xs: "flex", lg: "block" },
      alignItems: { xs: "center", lg: "" },
      border: "1px solid #DFDFDF",
    }}
  >
    <Typography
      component="h2"
      sx={{ fontWeight: "bold", color: "#434343", fontSize: "20px" }}
    >
      {title}
    </Typography>
  </Box>
);
