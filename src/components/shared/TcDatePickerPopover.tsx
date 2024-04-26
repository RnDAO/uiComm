import Popover from '@mui/material/Popover';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import React from 'react';

import TcButton from './TcButton';
import moment from 'moment';

interface ITcDatePickerPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  onResetDate: () => void;
  disableDaysFrom?: number
}

function TcDatePickerPopover({
  open,
  anchorEl,
  onClose,
  selectedDate,
  onDateChange,
  onResetDate,
  disableDaysFrom,
}: ITcDatePickerPopoverProps) {

  const disableRecentDates = (date: Date) => {
    const today = moment();
    const thirtyFiveDaysAgo = moment().subtract(disableDaysFrom, 'days');
    return moment(date).isAfter(today) || moment(date).isBetween(thirtyFiveDaysAgo, today, 'day', '[]');
  };

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
          displayStaticWrapperAs='desktop'
          openTo='day'
          value={selectedDate}
          onChange={onDateChange}
          shouldDisableDate={disableDaysFrom ? disableRecentDates : undefined}
        />
      </LocalizationProvider>
      <div className='px-5 py-3'>
        <TcButton
          text='Reset'
          onClick={onResetDate}
          className='w-full'
          variant='outlined'
        />
      </div>
    </Popover>
  );
}

export default TcDatePickerPopover;
