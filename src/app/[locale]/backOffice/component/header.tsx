import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitch from "./languageSwitch";

export default function Header() {
  const t = useTranslations("BackOffice");

  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        height: "10vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "white",
        padding: "0 40px",
      }}
    >
      <Typography
        component="h1"
        color="#138DF3"
        sx={{
          fontSize: "20px",
          fontWeight: 700,
        }}
      >
        {t("stockManageOffice")}
      </Typography>
      <Box sx={{display:"flex", gap:"12px"}}>
        <Button
          variant="contained"
          sx={{
            width: "fit-content",
            height: "fit-content",
            marginRight: "5%",
          }}
        >
          <Link href="/">{t("goToCustomerPanel")}</Link>
        </Button>
        <LanguageSwitch />
      </Box>
    </Box>
  );
}
