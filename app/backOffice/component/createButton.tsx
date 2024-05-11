"use client";
import { defaultCreateEditDialog } from "@/app/constant";
import { DefaultCreateEditDialogType, DefaultCreateEditEnum } from "@/app/type";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import CreateEditDialog from "./createEditDialog";

export default function CreateButton(): React.ReactElement {
  const [isOpenCreateEdit, setIsOpenCreateEdit] =
    useState<DefaultCreateEditDialogType>(defaultCreateEditDialog);
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
        <Typography component="h4">新增股票</Typography>
      </Button>
      <CreateEditDialog
        dialogData={isOpenCreateEdit}
        setDialogData={setIsOpenCreateEdit}
      />
    </>
  );
}
