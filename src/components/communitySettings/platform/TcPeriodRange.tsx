import React, { useEffect, useState } from 'react';
import TcButtonGroup from '../../shared/TcButtonGroup';
import TcButton from '../../shared/TcButton';

type PeriodValue = 'Last 35 days' | '1M' | '3M' | '6M' | '1Y';

interface ITcPeriodRange {
  handleSelectedDate: (date: string) => void;
}

function TcPeriodRange({ handleSelectedDate }: ITcPeriodRange) {
  const periods: PeriodValue[] = ['Last 35 days', '1M', '3M', '6M', '1Y'];
  const [selected, setSelected] = useState<PeriodValue>(periods[0]);

  useEffect(() => {
    const calculatedDateUTC = calculateDate(selected);
    if (handleSelectedDate) {
      handleSelectedDate(calculatedDateUTC);
    }
  }, []);

  const calculateDate = (value: PeriodValue): string => {
    const currentDate = new Date();
    switch (value) {
      case 'Last 35 days':
        currentDate.setDate(currentDate.getDate() - 35);
        break;
      case '1M':
        currentDate.setMonth(currentDate.getMonth() - 1);
        break;
      case '3M':
        currentDate.setMonth(currentDate.getMonth() - 3);
        break;
      case '6M':
        currentDate.setMonth(currentDate.getMonth() - 6);
        break;
      case '1Y':
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        break;
    }
    return currentDate.toISOString();
  };

  const handleButtonClick = (value: PeriodValue) => {
    setSelected(value);
    const calculatedDateUTC = calculateDate(value);
    if (handleSelectedDate) {
      handleSelectedDate(calculatedDateUTC);
    }
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
