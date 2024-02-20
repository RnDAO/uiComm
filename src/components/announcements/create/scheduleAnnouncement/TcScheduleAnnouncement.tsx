import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { MdCalendarMonth } from 'react-icons/md';

import TcDateTimePopover from './TcDateTimePopover';
import TcIconContainer from '../TcIconContainer';
import { validateDateTime } from '../../../../helpers/helper';
import TcButton from '../../../shared/TcButton';
import TcText from '../../../shared/TcText';

export interface ITcScheduleAnnouncementProps {
  isEdit?: boolean;
  preSelectedTime?: string;
  handleSchaduledDate: ({ selectedTime }: { selectedTime: string }) => void;
  isDateValid: boolean;
  setIsDateValid: (isValid: boolean) => void;
}

function TcScheduleAnnouncement({
  isEdit = false,
  preSelectedTime,
  handleSchaduledDate,
  isDateValid,
  setIsDateValid,
}: ITcScheduleAnnouncementProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const [dateTimeDisplay, setDateTimeDisplay] = useState<string>(
    'Select Date for Announcement'
  );

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-time-popover' : undefined;

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setActiveTab(1);
      const isValid = validateDateTime(date, selectedTime);
      setIsDateValid(isValid);
    }
  };

  const handleTimeChange = (time: Date | null) => {
    if (time) {
      setSelectedTime(time);

      if (selectedDate) {
        const fullDateTime = moment(selectedDate).set({
          hour: time.getHours(),
          minute: time.getMinutes(),
        });
        setDateTimeDisplay(fullDateTime.format('D MMMM YYYY @ hh:mm A'));
      }
      const isValid = validateDateTime(selectedDate, time);
      setIsDateValid(isValid);
    }
  };

  useEffect(() => {
    if (!selectedDate || !selectedTime) return;

    const fullDateTime = moment(selectedDate).set({
      hour: selectedTime.getHours(),
      minute: selectedTime.getMinutes(),
    });

    const fullDateTimeUTC = fullDateTime.utc();

    const formattedUTCDate = fullDateTimeUTC.format();

    handleSchaduledDate({ selectedTime: formattedUTCDate });
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    if (isEdit && preSelectedTime) {
      const dateTime = moment(preSelectedTime);
      const date = dateTime.toDate();
      setSelectedDate(date);
      setSelectedTime(date);
      setDateTimeDisplay(dateTime.format('D MMMM YYYY @ hh:mm A'));
      setIsDateValid(validateDateTime(date, date));
    }
  }, [isEdit, preSelectedTime]);

  return (
    <div className='space-y-3'>
      <div className='flex flex-col space-y-3 md:flex-row md:items-center md:justify-start md:space-x-3 md:space-y-0'>
        <div className='flex items-center space-x-3'>
          <TcIconContainer>
            <MdCalendarMonth size={20} data-testid='MdCalendarMonth' />
          </TcIconContainer>
          <TcText text='Select Date' variant='body1' fontWeight='bold' />
        </div>
        <TcButton
          text={dateTimeDisplay}
          startIcon={<MdCalendarMonth />}
          disableElevation={true}
          className='border border-black bg-gray-100 shadow-md'
          sx={{ color: 'black', height: '2.4rem', paddingX: '1rem' }}
          aria-describedby={id}
          onClick={handleOpen}
        />
        {!isDateValid && (
          <TcText
            text='Selected Date should be greater that now.'
            variant='caption'
            className='text-red-500'
          />
        )}
        <TcDateTimePopover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
          selectedTime={selectedTime}
          handleTimeChange={handleTimeChange}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
}

export default TcScheduleAnnouncement;
