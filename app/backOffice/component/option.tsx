import { Box, Typography } from "@mui/material";
import Link from "next/link";

interface PropsType {
  isSelected: boolean;
  title: string;
  href: string;
}

export default function Option({ title, href, isSelected }: PropsType) {
  return (
    <Box
      sx={{
        cursor: "pointer",
        height: "40px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "16px",
        background: isSelected ? "#E2EEFF" : "white",
      }}
    >
      <Typography
        component="h4"
        sx={{
          fontSize: 16,
          color: isSelected ? "#3A82F6" : "black",
        }}
      >
        <Link href={href}>{title}</Link>
      </Typography>
    </Box>
  );
}
