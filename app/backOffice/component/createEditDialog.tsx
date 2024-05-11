"use client";

import { defaultCreateEditDialog, defaultErrorToastData } from "@/app/constant";
import { fetchService } from "@/app/service/fetchService";
import {
  DefaultCreateEditDefaultValueType,
  DefaultCreateEditDialogType,
  DefaultCreateEditEnum,
  DropDownApiDataType,
  ErrorToastDataType,
} from "@/app/type";
import { openErrorToast } from "@/app/utils";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Snackbar,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface PropsType {
  fetchStock: (stock: string) => Promise<void>;
}

export default function CreateEditDialog({ fetchStock }: PropsType) {
  const { register, handleSubmit, reset } = useForm<DropDownApiDataType>({
    defaultValues: {
      stock_id: "",
      industry_category: "",
      stock_name: "",
    },
  });
  const [dialogData, setDialogData] = useState<DefaultCreateEditDialogType>(
    defaultCreateEditDialog
  );

  useEffect(() => {
    if (dialogData.defaultValues) {
      reset({
        stock_id: dialogData.defaultValues.stockId,
        industry_category: dialogData.defaultValues.industryCategory,
        stock_name: dialogData.defaultValues.stockName,
      });
    } else {
      reset({
        stock_id: "",
        industry_category: "",
        stock_name: "",
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
      fetchStock("");
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
            errorMesssage: "建立成功",
          });
          delayCloseDialog();
        }
        if (result === 409) {
          openErrorToast(setToastData, {
            isOpen: true,
            errorMesssage: "這筆股票已建立，請重新檢查",
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
            errorMesssage: "編輯成功",
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
    dialogData.variant === DefaultCreateEditEnum.create ? "新增" : "編輯";

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
          setDialogData({
            isOpen: true,
            variant: DefaultCreateEditEnum.create,
          })
        }
      >
        <Typography component="h4">新增股票</Typography>
      </Button>
      <Dialog
        open={dialogData.isOpen}
        onClose={() => setDialogData(defaultCreateEditDialog)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>{getCreateEditText()}股票</DialogTitle>
          <DialogContent>
            <DialogContentText>
              以下項目為必填，儲存後即可{getCreateEditText()}股票
            </DialogContentText>
            <TextField
              {...register("stock_id", { required: true })}
              required
              margin="dense"
              id="stock_id"
              name="stock_id"
              label="股票編號"
              fullWidth
              variant="standard"
            />
            <TextField
              {...register("industry_category", { required: true })}
              required
              margin="dense"
              id="industry_category"
              name="industry_category"
              label="產業"
              fullWidth
              variant="standard"
            />
            <TextField
              {...register("stock_name", { required: true })}
              required
              margin="dense"
              id="stock_name"
              name="stock_name"
              label="股票名稱"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogData(defaultCreateEditDialog)}>
              取消
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
    </>
  );
}
