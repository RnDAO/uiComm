import React from 'react';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticTimePicker } from '@mui/x-date-pickers';
import { FiCalendar } from 'react-icons/fi';
import { MdAccessTime } from 'react-icons/md';
import TcPopover from '../../../shared/TcPopover';
import TcTabs from '../../../shared/TcTabs';
import TcTab from '../../../shared/TcTabs/TcTab';

interface IDateTimePopoverProps {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  selectedDate: Date | null;
  handleDateChange: (date: Date | null) => void;
  selectedTime: Date | null;
  handleTimeChange: (time: Date | null) => void;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

function TcDateTimePopover({
  open,
  anchorEl,
  onClose,
  selectedDate,
  handleDateChange,
  selectedTime,
  handleTimeChange,
  activeTab,
  setActiveTab,
}: IDateTimePopoverProps) {
  const disablePastDates = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const tabContent = [
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs='desktop'
        openTo='day'
        value={selectedDate}
        onChange={handleDateChange}
        shouldDisableDate={disablePastDates}
      />
    </LocalizationProvider>,
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticTimePicker
        displayStaticWrapperAs='desktop'
        value={selectedTime}
        ampm={false}
        onChange={handleTimeChange}
      />
    </LocalizationProvider>,
  ];

  return (
    <TcPopover
      id={open ? 'date-time-popover' : undefined}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      content={
        <div className='flex flex-col space-y-2'>
          {tabContent[activeTab]}

          <TcTabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            indicatorColor='secondary'
            className='w-full border-t border-gray-200'
          >
            <TcTab
              icon={<FiCalendar size={20} />}
              className='w-1/2'
              data-testid='calendar-icon'
            />
            <TcTab
              icon={<MdAccessTime size={20} />}
              className='w-1/2'
              data-testid='time-icon'
            />
          </TcTabs>
        </div>
      }
    />
  );
}

export default TcDateTimePopover;
