import Popover from '@mui/material/Popover';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import moment from 'moment';
import React from 'react';

import TcButton from './TcButton';

interface ITcDatePickerPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  onResetDate: () => void;
  disableDaysFrom?: number;
  disableDaysBefore?: number;
}

function TcDatePickerPopover({
  open,
  anchorEl,
  onClose,
  selectedDate,
  onDateChange,
  onResetDate,
  disableDaysFrom,
  disableDaysBefore,
}: ITcDatePickerPopoverProps) {
  const disableDates = (date: Date) => {
    const today = moment();
    const xDaysAgo = disableDaysFrom ? moment().subtract(disableDaysFrom, 'days') : null;
    const yDaysAgo = disableDaysBefore ? moment().subtract(disableDaysBefore, 'days') : null;

    if (disableDaysFrom && xDaysAgo && moment(date).isBetween(xDaysAgo, today, 'day', '[]')) {
      return true;
    }

    if (disableDaysBefore && yDaysAgo && moment(date).isBefore(yDaysAgo, 'day')) {
      return true;
    }

    return moment(date).isAfter(today);
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
          shouldDisableDate={disableDaysFrom || disableDaysBefore ? disableDates : undefined}
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
