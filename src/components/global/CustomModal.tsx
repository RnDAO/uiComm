import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { IoClose } from "react-icons/io5";

type IModalProps = {
  isOpen: boolean;
  toggleModal: (arg0: boolean) => void;
  children: any;
  hasClose: boolean;
};
export default function ConfirmModal({
  isOpen,
  toggleModal,
  children,
  hasClose,
  ...rest
}: IModalProps) {
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
            alignItems: "flex-start",
            verticalAlign: "top",
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "650px",
              borderRadius: "10px",
              overflow:'visible'
            },
            "& .MuiDialogContent-root": {
              overflow: 'visible'
            }
          },
        }}
        {...rest}
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
