import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("BackOffice");
  return <div><p>{t("searchStockInfo")}</p></div>;
}
