import moment from 'moment';
import React from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { MdOutlineCalendarToday } from 'react-icons/md';

import TcPeriodRange from './TcPeriodRange';
import TcAvatar from '../../shared/TcAvatar';
import TcText from '../../shared/TcText';
import { IPlatformProps } from '../../../utils/interfaces';

interface ITcPlatformPeriodProps {
  platform: IPlatformProps | null;
  onDateChange: (date: string) => void;
}

function TcPlatformPeriod({ onDateChange, platform }: ITcPlatformPeriodProps) {
  const handleSelectedDate = (date: string) => {
    onDateChange(date);
  };

  return (
    <div>
      <div className='flex items-stretch md:space-x-4'>
        <TcAvatar className='hidden md:flex'>
          <MdOutlineCalendarToday color='white' />
        </TcAvatar>
        <div className='space-y-4 pt-2'>
          <TcText
            text="Change date period for data analysis"
            variant='body1'
            fontWeight='bold'
          />
          <TcText
            text="It might take up to 12 hours to finish new data import. Once it is done we will send you a message on Discord."
            variant='body2'
          />
          <div className='flex space-x-2 md:items-center'>
            <HiOutlineExclamationCircle size={20} />
            <TcText
              text={`Data analysis runs from: ${moment(
                platform?.metadata.analyzerStartedAt
              ).format('D MMM YYYY')}`}
              variant='body2'
              fontWeight='bold'
            />
          </div>
          <TcPeriodRange
            handleSelectedDate={handleSelectedDate}
            activePeriod={platform?.metadata.period || ''}
          />
        </div>
      </div>
    </div>
  );
}

export default TcPlatformPeriod;
