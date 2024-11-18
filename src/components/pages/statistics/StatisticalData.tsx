import React, { useEffect, useState } from 'react';
import { ClickAwayListener, Tooltip } from '@mui/material';
import clsx from 'clsx';
import router from 'next/router';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { RxArrowBottomRight, RxArrowTopRight } from 'react-icons/rx';

import { StatisticsProps } from '../../../utils/interfaces';

type StatisticalDataProps = {
  statistics: StatisticsProps[];
  ableToFilter?: boolean;
  overviewType?:
    | 'activeMemberComposition'
    | 'onboardingMemberComposition'
    | 'disengagedMemberComposition';
  hideInformationText?: boolean;
  handleSelectedOption?: (label: string) => void;
};

const StatisticalData: React.FC<StatisticalDataProps> = ({
  statistics,
  ableToFilter,
  overviewType,
  hideInformationText,
  handleSelectedOption,
}) => {
  const [activeState, setActiveState] = useState<string | string[]>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const queries = router.query;

    if (queries.filter && typeof queries.filter === 'string') {
      const filter = JSON.parse(queries?.filter);

      if (filter) {
        // Search for the first element that matches the 'filterType'
        const matchedFilter = filter.find(
          (el: any) => el.filterType === overviewType
        );

        // Check if matchedFilter exists
        if (matchedFilter) {
          // Check if matchedFilter has keys
          if (Object.keys(matchedFilter).length > 0) {
            setActiveState(matchedFilter.label);
          } else {
            setActiveState('');
          }
        } else {
          setActiveState('');
        }
      } else {
        setActiveState('');
      }
    }
  }, [router.query]);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div
        className={clsx(
          'my-1 flex flex-row space-x-1',
          statistics.length > 3 ? 'justify-between' : 'justify-start'
        )}
      >
        {statistics.map((stat, index) => (
          <div
            className={clsx(
              'relative flex flex-1 flex-col justify-center rounded-2xl text-center',
              stat.description
                ? 'h-[200px] min-w-full md:h-[200px] md:min-w-[100px] md:max-w-[280px] xl:min-w-[220px]'
                : 'h-[170px] min-w-full md:h-[180px] md:min-w-[100px] md:max-w-[280px] xl:min-w-[280px]',
              stat.customBackground || stat.label === activeState
                ? 'bg-gray-hover'
                : '',
              ableToFilter
                ? 'cursor-pointer delay-75 ease-in hover:bg-gray-background'
                : ''
            )}
            onClick={() => {
              if (handleSelectedOption) {
                handleSelectedOption(stat.label);
              }
            }}
            key={stat.label}
          >
            <span
              className={clsx(
                'absolute top-0 right-0 z-10 m-2 flex items-center justify-center rounded-md px-2 py-1 text-xs text-white',
                stat.percentageChange >= 0 ? ' bg-purple-light' : 'bg-black'
              )}
            >
              {stat.percentageChange > 0 ? (
                <RxArrowTopRight size='15px' />
              ) : stat.percentageChange < 0 ? (
                <RxArrowBottomRight size='15px' />
              ) : (
                ''
              )}{' '}
              <span className='pt-0.5'>
                {typeof stat?.percentageChange === 'number'
                  ? stat?.percentageChange.toFixed(0) + '%'
                  : stat?.percentageChange}
              </span>
            </span>
            <span className='pb-1 text-4xl font-bold'>{stat.value ?? 0}</span>
            <div className='flex items-center justify-center'>
              <div
                className={clsx(
                  'mr-2 h-3.5 w-3.5 rounded-full',
                  stat.colorBadge
                )}
              />
              <span className='flex items-center text-base'>
                {stat.label}
                {stat.hasTooltip && (
                  <ClickAwayListener onClickAway={handleTooltipClose}>
                    <Tooltip
                      title={stat.tooltipText}
                      arrow
                      placement='bottom'
                      enterTouchDelay={0}
                    >
                      <span onClick={handleTooltipOpen}>
                        <AiOutlineExclamationCircle
                          size='18px'
                          className='mx-auto ml-1'
                        />
                      </span>
                    </Tooltip>
                  </ClickAwayListener>
                )}
              </span>
            </div>
            {stat.description && (
              <span className='px-5 pt-2 text-center text-sm text-gray-custom'>
                {stat.description}
              </span>
            )}
          </div>
        ))}
      </div>
      {hideInformationText ? (
        ''
      ) : (
        <div className='mt-3 mb-12 flex flex-row items-center space-x-3'>
          <div className=' flex w-12 flex-row  items-center justify-center rounded bg-purple-light text-white'>
            <RxArrowTopRight size='18px' /> %
          </div>
          <div className=' flex w-12 flex-row  items-center justify-center rounded bg-gray-custom text-white'>
            <RxArrowBottomRight size='18px' /> %
          </div>
          <p className='text-sm'>% compared to the last week</p>
        </div>
      )}
    </>
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
  ableToFilter: false,
  hideInformationText: false,
};

export default StatisticalData;
