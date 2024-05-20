"use client";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Link } from "../navigation";
import { usePathname, useSearchParams } from "next/navigation";

enum LangEnum {
  en = "en",
  zh = "zh",
  jp = "jp"
}

export default function LanguageSwitch() {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const firstLoadLocale = parts[1];

  const [lang, setLang] = useState<string>(firstLoadLocale || LangEnum.en);

  const handleChange = (event: SelectChangeEvent) => {
    const nextLocale = event.target.value;
    setLang(nextLocale);
  };

  return (
    <>
      <Select id="demo-simple-select" value={lang} onChange={handleChange}>
        <MenuItem value={LangEnum.en}>
          <Link href="/backOffice" locale={LangEnum.en}>
            English
          </Link>
        </MenuItem>
        <MenuItem value={LangEnum.zh}>
          <Link href="/backOffice" locale={LangEnum.zh}>
            Chinese
          </Link>
        </MenuItem>
        <MenuItem value={LangEnum.jp}>
          <Link href="/backOffice" locale={LangEnum.jp}>
            Japanese
          </Link>
        </MenuItem>
      </Select>
    </>
  );
}
