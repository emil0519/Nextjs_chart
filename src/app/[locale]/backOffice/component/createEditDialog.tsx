"use client";

import { defaultCreateEditDialog, defaultErrorToastData } from "@/src/app/constant";
import { fetchService } from "@/src/app/service/fetchService";
import {
  DefaultCreateEditDialogType,
  DefaultCreateEditEnum,
  DropDownApiDataType,
  ErrorToastDataType,
} from "@/src/app/type";
import { openErrorToast } from "@/src/app/utils";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Snackbar,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";


interface PropsType {
  dialogData: DefaultCreateEditDialogType;
  setDialogData: (dialogData: DefaultCreateEditDialogType) => void;
  fetchStock: (stock: string) => Promise<DropDownApiDataType[] | undefined>;
}

export default function CreateEditDialog({
  dialogData,
  setDialogData,
  fetchStock
}: PropsType) {
  const { replace } = useRouter();
  const pathName = usePathname();
  const { register, handleSubmit, reset } = useForm<DropDownApiDataType>({
    defaultValues: {
      stock_id: "",
      industry_category: "",
      stock_name: "",
    },
  });
  const t = useTranslations("BackOffice");
  const tCommon= useTranslations("Common");

  useEffect(() => {
    if (dialogData.defaultValues) {
      reset({
        stock_id: dialogData.defaultValues.stockId,
        industry_category: dialogData.defaultValues.industryCategory,
        stock_name: dialogData.defaultValues.stockName,
      });
    } 
  }, [reset, dialogData.defaultValues]);

  const fetchServices = new fetchService();
  const [toastData, setToastData] = useState<ErrorToastDataType>(
    defaultErrorToastData
  );
  const delayCloseDialog = () => {
    setTimeout(() => {
      setDialogData(defaultCreateEditDialog);
      reset();
      replace(pathName);
      // TOFIX, fetch stock 沒有觸法stockTable重新set raw data，原因未知，先reload
      fetchStock('')
      window.location.reload();
    }, 2000);
  };

  const onSubmit = async (data: DropDownApiDataType) => {
    data.type = "twse";
    data.date = dayjs().format("YYYY-MM-DD");
    try {
      if (dialogData.variant === DefaultCreateEditEnum.create) {
        const result = await fetchServices.MockCreateStockInfo(data);
        if (result === 200) {
          openErrorToast(setToastData, {
            isOpen: true,
            errorMesssage: t('createSuccess'),
          });
          delayCloseDialog();
        }
        if (result === 409) {
          openErrorToast(setToastData, {
            isOpen: true,
            errorMesssage: t('stockAlreadyExist'),
          });
        }
      }

      if (dialogData.variant === DefaultCreateEditEnum.edit) {
        const result = await fetchServices.MockEditStockInfo({
          ...data,
          stock_id: dialogData.defaultValues?.stockId || "",
          new_stock_id: data.stock_id,
        });
        if (result === 200) {
          openErrorToast(setToastData, {
            isOpen: true,
            errorMesssage: t('editSuccess'),
          });
          delayCloseDialog();
        }
      }
    } catch (errors) {
      openErrorToast(setToastData, errors);
    } finally {
      setTimeout(() => {
        setToastData(defaultErrorToastData);
      }, 2000);
    }
  };

  const getCreateEditText = () =>
    dialogData.variant === DefaultCreateEditEnum.create ? tCommon('create') : tCommon('edit');

  const hintKey = dialogData.variant === DefaultCreateEditEnum.create
    ? 'createHint'
    : 'editHint';

  return (
    <Dialog
      open={dialogData.isOpen}
      onClose={() => setDialogData(defaultCreateEditDialog)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{getCreateEditText()}&nbsp;{t('stock')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
              {t(hintKey)}
          </DialogContentText>
          <TextField
            {...register("stock_id", { required: true })}
            required
            margin="dense"
            id="stock_id"
            name="stock_id"
            label={t('stockSymbol')}
            fullWidth
            variant="standard"
          />
          <TextField
            {...register("industry_category", { required: true })}
            required
            margin="dense"
            id="industry_category"
            name="industry_category"
            label={t('industry')}
            fullWidth
            variant="standard"
          />
          <TextField
            {...register("stock_name", { required: true })}
            required
            margin="dense"
            id="stock_name"
            name="stock_name"
            label={t('stockName')}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogData(defaultCreateEditDialog)}>
            {tCommon('cancel')}
          </Button>
          <Button type="submit">{getCreateEditText()}</Button>
        </DialogActions>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toastData.isOpen}
        onClose={() => setToastData(defaultErrorToastData)}
        message={toastData.errorMessage}
      />
    </Dialog>
  );
}
