import React from 'react';
import Popover from '@mui/material/Popover';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TcButton from './TcButton';

interface ITcDatePickerPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  onResetDate: () => void;
}

function TcDatePickerPopover({
  open,
  anchorEl,
  onClose,
  selectedDate,
  onDateChange,
  onResetDate,
}: ITcDatePickerPopoverProps) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={selectedDate}
          onChange={onDateChange}
        />
      </LocalizationProvider>
      <div className="px-5 py-3">
        <TcButton
          text="Reset"
          onClick={onResetDate}
          className="w-full"
          variant="outlined"
        />
      </div>
    </Popover>
  );
}

export default TcDatePickerPopover;
