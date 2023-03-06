import clsx from 'clsx';
import React from 'react';
import { RxArrowTopRight, RxArrowBottomRight } from 'react-icons/rx';

type Statistic = {
  label: string;
  value: number | string;
  description?: string;
  percentageChange: number;
  colorBadge?: string;
};

type StatisticalDataProps = {
  statistics: Statistic[];
};

const StatisticalData: React.FC<StatisticalDataProps> = ({ statistics }) => {
  return (
    <div className="flex flex-row my-3 space-x-5 overflow-x-scroll md:overflow-auto">
      {statistics.map((stat) => (
        <div
          className={clsx(
            'flex flex-col text-center justify-center relative rounded-2xl hover:bg-gray-hover',
            stat.description
              ? 'w-[220px] h-[200px] md:w-[280px] md:h-[200px]'
              : 'w-[270px] h-[170px] md:w-[280px] md:h-[180px]'
          )}
          key={stat.label}
        >
          <span
            className={clsx(
              'absolute top-0 right-0 px-2 py-1 m-2 flex items-center justify-center rounded-md text-white text-xs z-10',
              stat.percentageChange >= 0 ? ' bg-purple-light' : 'bg-black'
            )}
          >
            {stat.percentageChange > 0 ? (
              <RxArrowTopRight size={'15px'} />
            ) : stat.percentageChange < 0 ? (
              <RxArrowBottomRight size={'15px'} />
            ) : (
              ''
            )}{' '}
            <span className="pt-0.5">
              {stat?.percentageChange?.toFixed(0)} %
            </span>
          </span>
          <span className="text-4xl font-bold pb-1">{stat.value}</span>
          <div className="flex items-center justify-center">
            <div
              className={clsx('rounded-full w-3.5 h-3.5 mr-2', stat.colorBadge)}
            />
            <span className="text-base">{stat.label}</span>
          </div>
          <span className="text-sm text-gray-custom">{stat.description}</span>
        </div>
      ))}
    </div>
  );
};

export default StatisticalData;
