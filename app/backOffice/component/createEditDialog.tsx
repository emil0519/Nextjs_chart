"use client";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

interface PropsType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function CreateEditDialog({ isOpen, setIsOpen }: PropsType) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
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
            {...register("stockId", { required: true })}
            required
            margin="dense"
            id="stockId"
            name="stockId"
            label="股票編號"
            fullWidth
            variant="standard"
          />
          <TextField
            {...register("industryCategory", { required: true })}
            required
            margin="dense"
            id="industryCategory"
            name="industryCategory"
            label="產業"
            fullWidth
            variant="standard"
          />
          <TextField
            {...register("stockName", { required: true })}
            required
            margin="dense"
            id="stockName"
            name="stockName"
            label="股票名稱"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
