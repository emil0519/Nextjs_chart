"use client";

import { defaultErrorToastData } from "@/app/constant";
import { fetchService } from "@/app/service/fetchService";
import { DropDownApiDataType, ErrorToastDataType } from "@/app/type";
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
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface PropsType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function CreateEditDialog({ isOpen, setIsOpen }: PropsType) {
  const { register, handleSubmit, reset } = useForm<DropDownApiDataType>();
  const fetchServices = new fetchService();
  const [toastData, setToastData] = useState<ErrorToastDataType>(
    defaultErrorToastData
  );
  const delayCloseDialog = () => {
    setTimeout(() => {
      setIsOpen(false);
      reset();
    }, 2000);
  };

  const onSubmit = async (data: DropDownApiDataType) => {
    data.type = "twse";
    data.date = dayjs().format("YYYY-MM-DD");
    try {
      const result = await fetchServices.MockCreateStockInfo(data);
      console.log(result, "result");
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
    } catch (errors) {
      console.log(errors);
      openErrorToast(setToastData, errors);
    } finally {
      setTimeout(() => {
        setToastData(defaultErrorToastData);
      }, 2000);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>新增股票</DialogTitle>
        <DialogContent>
          <DialogContentText>
            以下項目為必填，儲存後即可新增股票
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
          <Button onClick={() => setIsOpen(false)}>取消</Button>
          <Button type="submit">儲存</Button>
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
