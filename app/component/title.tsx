import { Box, Typography } from "@mui/material";
import { SelectedStockType } from "../type";

export const Title = ({ title }: { title: SelectedStockType["name"] }): React.ReactElement => (
  <Box
    sx={{
      backgroundColor: "#FAFAFA",
      width: "800px",
      padding: "8px 16px",
      height: "50px",
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
