import { Tooltip } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { RxArrowTopRight, RxArrowBottomRight } from 'react-icons/rx';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { StatisticsProps } from '../../../utils/interfaces';

type StatisticalDataProps = {
  statistics: StatisticsProps[];
};

const StatisticalData: React.FC<StatisticalDataProps> = ({ statistics }) => {
  return (
    <div
      className={clsx(
        'flex flex-row my-3 space-x-1',
        statistics.length > 3 ? 'justify-between' : 'justify-start'
      )}
    >
      {statistics.map((stat) => (
        <div
          className={clsx(
            'flex flex-col text-center justify-center relative rounded-2xl hover:bg-gray-hover',
            stat.description
              ? 'min-w-full h-[200px] md:min-w-[220px] md:max-w-[280px] md:h-[200px]'
              : 'min-w-full h-[170px] md:min-w-[280px] md:max-w-[280px] md:h-[180px]'
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
          <span className="text-4xl font-bold pb-1">{stat.value ?? 0}</span>
          <div className="flex items-center justify-center">
            <div
              className={clsx('rounded-full w-3.5 h-3.5 mr-2', stat.colorBadge)}
            />
            <span className="text-base">{stat.label}</span>
          </div>
          {stat.description && (
            <span className="text-sm text-center text-gray-custom px-5 pt-2">
              {stat.description}
              <div className="text-center mx-auto">
                {stat.hasTooltip && (
                  <Tooltip title={stat.tooltipText} arrow placement="bottom">
                    <span>
                      <AiOutlineExclamationCircle
                        size={'18px'}
                        className="mx-auto"
                      />
                    </span>
                  </Tooltip>
                )}
              </div>
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

StatisticalData.defaultProps = {
  statistics: [
    {
      label: '',
      value: 0,
      description: '',
      percentageChange: 0,
      colorBadge: '',
      hasTooltip: false,
      tooltipText: '',
    },
  ],
};

export default StatisticalData;
