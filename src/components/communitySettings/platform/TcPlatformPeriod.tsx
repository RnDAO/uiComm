import React from 'react';
import TcAvatar from '../../shared/TcAvatar';
import { MdOutlineCalendarToday } from 'react-icons/md';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import TcText from '../../shared/TcText';
import TcPeriodRange from './TcPeriodRange';

interface ITcPlatformPeriodProps {
  onDateChange: (date: string) => void;
}

function TcPlatformPeriod({ onDateChange }: ITcPlatformPeriodProps) {
  const handleSelectedDate = (date: string) => {
    onDateChange(date);
  };

  return (
    <div>
      <div className="flex items-stretch space-x-4">
        <TcAvatar>
          <MdOutlineCalendarToday color="black" />
        </TcAvatar>
        <div className="space-y-4 pt-2">
          <TcText
            text={'Change date period for data analysis'}
            variant="body1"
            fontWeight="bold"
          />
          <TcText
            text={
              'It might take up to 12 hours to finish new data import. Once it is done we will send you a message on Discord.'
            }
            variant="body2"
          />
          <div className="flex items-center space-x-2">
            <HiOutlineExclamationCircle size={20} />
            <TcText
              text={'Data analysis runs from: 12 Jan 2022'}
              variant="body2"
              fontWeight="bold"
            />
          </div>
          <TcPeriodRange handleSelectedDate={handleSelectedDate} />
        </div>
      </div>
    </div>
  );
}

export default TcPlatformPeriod;
