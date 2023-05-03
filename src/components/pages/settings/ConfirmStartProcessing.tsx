import { Dialog, DialogTitle } from '@mui/material';
import React from 'react';
import { BsClockHistory } from 'react-icons/bs';
import CustomButton from '../../global/CustomButton';
import { IoClose } from 'react-icons/io5';

function ConfirmStartProcessing(props: any) {
  const { open, onClose, onSubmitProcess } = props;
  return (
    <Dialog
      open={open}
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'center',
          justifyContent: 'center',
        },
        '& .MuiPaper-root': {
          width: '750px',
          borderRadius: '10px',
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        className="flex flex-row justify-end"
      >
        <IoClose
          size={40}
          onClick={onClose}
          test-id="close-modal-icon"
          className="cursor-pointer"
        />
      </DialogTitle>
      <div className="mx-auto text-center w-11/12 space-y-6 pb-10">
        <BsClockHistory
          size={60}
          className="mx-auto bg-gray-100 rounded-full px-3"
        />
        <h3 className="text-xl font-bold px-16">
          Data from selected channels may take some time to process
        </h3>
        <p className="text-sm">
          Please confirm you want to start data processing. It might take up to
          6 hours to complete. Once it is done we will send you a message on
          Discord.
        </p>
        <p className="text-sm pb-5">
          During this period, it will not be possible to change your imported
          channels.
        </p>
        <div className="flex flex-col-reverse md:flex-row justify-between md:px-3">
          <CustomButton
            classes="text-black rounded-md"
            label={'Cancel'}
            variant="outlined"
            onClick={onClose}
          />
          <CustomButton
            classes="bg-secondary text-white rounded-md mb-3 md:mb-0"
            label={'Start data processing'}
            onClick={onSubmitProcess}
          />
        </div>
      </div>
    </Dialog>
  );
}

export default ConfirmStartProcessing;
