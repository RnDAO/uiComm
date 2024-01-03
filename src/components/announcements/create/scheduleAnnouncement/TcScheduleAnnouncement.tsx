import React, { useState } from 'react';
import TcIconContainer from '../TcIconContainer';
import { MdCalendarMonth } from 'react-icons/md';
import TcText from '../../../shared/TcText';
import TcButton from '../../../shared/TcButton';
import moment from 'moment';
import TcTcDateTimePopover from './TcDateTimePopover';

function TcScheduleAnnouncement() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [dateTimeDisplay, setDateTimeDisplay] = useState<string>(
    moment().format('D MMMM YYYY @ h A')
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

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
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
          variant="contained"
          startIcon={<MdCalendarMonth />}
          disableElevation={true}
          className="border border-black bg-gray-100 shadow-md"
          sx={{ color: 'black', height: '2.4rem' }}
          aria-describedby={id}
          onClick={handleOpen}
        />
        <TcTcDateTimePopover
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
