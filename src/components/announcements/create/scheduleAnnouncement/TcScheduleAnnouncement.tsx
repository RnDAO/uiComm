import React, { useEffect, useState } from 'react';
import TcIconContainer from '../TcIconContainer';
import { MdCalendarMonth } from 'react-icons/md';
import TcText from '../../../shared/TcText';
import TcButton from '../../../shared/TcButton';
import moment from 'moment';
import TcDateTimePopover from './TcDateTimePopover';

export interface ITcScheduleAnnouncementProps {
  isEdit?: boolean;
  preSelectedTime?: string;
  handleSchaduledDate: ({ selectedTime }: { selectedTime: string }) => void;
}

function TcScheduleAnnouncement({
  isEdit = false,
  preSelectedTime,
  handleSchaduledDate,
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
    }
  };

  const handleTimeChange = (time: Date | null) => {
    if (time) {
      setSelectedTime(time);
      handleClose();

      if (selectedDate) {
        const fullDateTime = moment(selectedDate).set({
          hour: time.getHours(),
          minute: time.getMinutes(),
        });
        setDateTimeDisplay(fullDateTime.format('D MMMM YYYY @ h A'));
      }
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
      const date = moment(preSelectedTime);

      setSelectedDate(date.toDate());
      setSelectedTime(date.toDate());
      setDateTimeDisplay(date.format('D MMMM YYYY @ h A'));
    }
  }, [isEdit, preSelectedTime]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
        <div className="flex items-center space-x-3">
          <TcIconContainer>
            <MdCalendarMonth size={20} />
          </TcIconContainer>
          <TcText
            text="Schedule Announcement"
            variant="body1"
            fontWeight="bold"
          />
        </div>
        <TcButton
          text={dateTimeDisplay}
          startIcon={<MdCalendarMonth />}
          disableElevation={true}
          className="border border-black bg-gray-100 shadow-md"
          sx={{ color: 'black', height: '2.4rem' }}
          aria-describedby={id}
          onClick={handleOpen}
        />
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
