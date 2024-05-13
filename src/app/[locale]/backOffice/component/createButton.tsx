"use client";
import { defaultCreateEditDialog } from "@/src/app/constant";
import {
  DefaultCreateEditDialogType,
  DefaultCreateEditEnum,
  DropDownApiDataType,
} from "@/src/app/type";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import CreateEditDialog from "./createEditDialog";
import { useTranslations } from "next-intl";

interface PropsType {
  fetchStock: (stock: string) => Promise<DropDownApiDataType[] | undefined>;
}

export default function CreateButton({
  fetchStock,
}: PropsType): React.ReactElement {
  const [isOpenCreateEdit, setIsOpenCreateEdit] =
    useState<DefaultCreateEditDialogType>(defaultCreateEditDialog);
  const t = useTranslations("BackOffice");
  return (
    <>
      <Button
        variant="outlined"
        sx={{
          width: "fit-content",
          height: "fit-content",
          marginRight: "5%",
        }}
        onClick={() =>
          setIsOpenCreateEdit({
            isOpen: true,
            variant: DefaultCreateEditEnum.create,
          })
        }
      >
        <Typography component="h4">{t('createStock')}</Typography>
      </Button>
      <CreateEditDialog
        dialogData={isOpenCreateEdit}
        setDialogData={setIsOpenCreateEdit}
        fetchStock={fetchStock}
      />
    </>
  );
}
