import React from 'react';
import Popover from '@mui/material/Popover';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface ITcDatePickerPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

function TcDatePickerPopover({
  open,
  anchorEl,
  onClose,
  selectedDate,
  onDateChange,
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
    </Popover>
  );
}

export default TcDatePickerPopover;
