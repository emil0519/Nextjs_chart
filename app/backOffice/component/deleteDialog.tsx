"use client";
import { defaultDeleteDialog, defaultErrorToastData } from "@/app/constant";
import { fetchService } from "@/app/service/fetchService";
import { DefaultDialogType, ErrorToastDataType } from "@/app/type";
import { openErrorToast } from "@/app/utils";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  Snackbar,
} from "@mui/material";
import { useState } from "react";

interface PropsType {
  deleteDialogData: DefaultDialogType;
  setDeleteDialogData: (deleteDialogData: DefaultDialogType) => void;
  fetchStock: (stock: string) => Promise<void>
}

export default function DeleteDialog({
  deleteDialogData,
  setDeleteDialogData,
  fetchStock
}: PropsType) {
  const fetchServices = new fetchService();
  const [errorToastData, setErrorToastData] = useState<ErrorToastDataType>(
    defaultErrorToastData
  );
  const deleteStock = async () => {
    try {
      const result = await fetchServices.MockDeleteStockInfo(
        deleteDialogData.stockId
      );
      if (result === 200) {
        openErrorToast(setErrorToastData, {
          isOpen: true,
          errorMesssage: "刪除成功",
        });
        setTimeout(() => {
          setDeleteDialogData(defaultDeleteDialog);
          fetchStock("")
        }, 2000);
      }
    } catch (errors) {
      openErrorToast(setErrorToastData, errors);
    } finally {
      setTimeout(() => setErrorToastData(defaultErrorToastData), 2000);
    }
  };

  return (
    <>
      <Dialog
        open={deleteDialogData.isOpen}
        onClose={() => setDeleteDialogData(defaultDeleteDialog)}
      >
        <DialogTitle>確認刪除</DialogTitle>
        <DialogContent>
          <DialogContentText>{deleteDialogData.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogData(defaultDeleteDialog)}>
            取消
          </Button>
          <Button color="error" onClick={deleteStock}>
            確認
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorToastData.isOpen}
        onClose={() => setErrorToastData(defaultErrorToastData)}
        message={errorToastData.errorMessage}
      />
    </>
  );
}
