import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Index");
  return <div><p>{t("title")}</p></div>;
}
