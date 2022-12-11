import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { IoClose } from "react-icons/io5";

export default function ConfirmModal({
  isOpen,
  toggleModal,
  children,
  hasClose,
}) {
  const handleClose = () => {
    toggleModal(false);
  };
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "650px",
              borderRadius: "10px",
            },
          },
        }}
      >
        {hasClose ? (
          <DialogTitle
            id="alert-dialog-title"
            className="flex flex-row justify-end"
          >
            <IoClose
              size={30}
              onClick={handleClose}
              className="cursor-pointer"
            />
          </DialogTitle>
        ) : (
          ""
        )}
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
}
