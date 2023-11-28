import React, { useEffect, useState } from 'react';
import TcButtonGroup from '../../shared/TcButtonGroup';
import TcButton from '../../shared/TcButton';

type PeriodValue = 'Last 35 days' | '1M' | '3M' | '6M' | '1Y';

interface ITcPeriodRange {
  activePeriod?: string;
  handleSelectedDate: (date: string) => void;
}

function TcPeriodRange({ handleSelectedDate, activePeriod }: ITcPeriodRange) {
  const periods: PeriodValue[] = ['Last 35 days', '1M', '3M', '6M', '1Y'];

  const calculateDaysDifference = (dateString: string): number => {
    const date = new Date(dateString);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const diff = today.getTime() - date.getTime();

    return Math.round(diff / (1000 * 3600 * 24));
  };

  const findDefaultPeriod = (): PeriodValue => {
    const fallbackDate = new Date();
    fallbackDate.setUTCHours(0, 0, 0, 0);
    fallbackDate.setUTCDate(fallbackDate.getUTCDate() - 35);

    const daysDifference = calculateDaysDifference(
      activePeriod ? activePeriod : fallbackDate.toISOString()
    );

    if (daysDifference > 30 && daysDifference <= 35) {
      return 'Last 35 days';
    } else if (daysDifference <= 30) {
      return '1M';
    } else if (daysDifference <= 90) {
      return '3M';
    } else if (daysDifference <= 180) {
      return '6M';
    } else {
      return '1Y';
    }
  };

  const [selected, setSelected] = useState<PeriodValue>(findDefaultPeriod());

  useEffect(() => {
    const calculatedDateUTC = calculateDate(selected);
    handleSelectedDate(calculatedDateUTC);
  }, [selected, handleSelectedDate]);

  const calculateDate = (value: PeriodValue): string => {
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    switch (value) {
      case 'Last 35 days':
        currentDate.setUTCDate(currentDate.getUTCDate() - 35);
        break;
      case '1M':
        currentDate.setUTCDate(currentDate.getUTCDate() - 30);
        break;
      case '3M':
        currentDate.setUTCDate(currentDate.getUTCDate() - 90);
        break;
      case '6M':
        currentDate.setUTCDate(currentDate.getUTCDate() - 180);
        break;
      case '1Y':
        currentDate.setUTCDate(currentDate.getUTCDate() - 365);
        break;
    }
    return currentDate.toISOString();
  };

  const handleButtonClick = (value: PeriodValue) => {
    setSelected(value);
    const calculatedDateUTC = calculateDate(value);
    handleSelectedDate(calculatedDateUTC);
  };

  return (
    <TcButtonGroup>
      {periods.map((el) => (
        <TcButton
          key={el}
          disableElevation={true}
          text={el}
          className={
            el === selected ? 'bg-black text-white' : 'bg-[#EEEEEE] text-black'
          }
          variant="contained"
          sx={{ width: 'auto', padding: '0.4rem 1rem' }}
          onClick={() => handleButtonClick(el)}
        />
      ))}
    </TcButtonGroup>
  );
}

export default TcPeriodRange;
