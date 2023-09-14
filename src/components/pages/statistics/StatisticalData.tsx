import { Tooltip } from '@mui/material';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { RxArrowTopRight, RxArrowBottomRight } from 'react-icons/rx';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { StatisticsProps } from '../../../utils/interfaces';
import router from 'next/router';

type StatisticalDataProps = {
  statistics: StatisticsProps[];
  overviewType?:
    | 'activeMemberComposition'
    | 'onboardingMemberComposition'
    | 'disengagedMemberComposition';
  hideInformationText?: boolean;
  handleSelectedOption?: (label: string) => void;
};

const StatisticalData: React.FC<StatisticalDataProps> = ({
  statistics,
  overviewType,
  hideInformationText,
  handleSelectedOption,
}) => {
  const [activeState, setActiveState] = useState<string | string[]>();

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

  return (
    <>
      <div
        className={clsx(
          'flex flex-row my-1 space-x-1',
          statistics.length > 3 ? 'justify-between' : 'justify-start'
        )}
      >
        {statistics.map((stat, index) => (
          <div
            className={clsx(
              'flex flex-col flex-1 text-center justify-center relative rounded-2xl hover:bg-gray-background ease-in delay-75 cursor-pointer',
              stat.description
                ? 'min-w-full h-[200px] md:min-w-[100px] xl:min-w-[220px] md:max-w-[280px] md:h-[200px]'
                : 'min-w-full h-[170px] md:min-w-[100px] xl:min-w-[280px] md:max-w-[280px] md:h-[180px]',
              stat.customBackground || stat.label === activeState
                ? 'bg-gray-hover'
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
                {typeof stat?.percentageChange === 'number'
                  ? stat?.percentageChange.toFixed(0) + '%'
                  : stat?.percentageChange}
              </span>
            </span>
            <span className="text-4xl font-bold pb-1">{stat.value ?? 0}</span>
            <div className="flex items-center justify-center">
              <div
                className={clsx(
                  'rounded-full w-3.5 h-3.5 mr-2',
                  stat.colorBadge
                )}
              />
              <span className="text-base flex items-center">
                {stat.label}
                {stat.hasTooltip && (
                  <Tooltip title={stat.tooltipText} arrow placement="bottom">
                    <span>
                      <AiOutlineExclamationCircle
                        size={'18px'}
                        className="mx-auto ml-1"
                      />
                    </span>
                  </Tooltip>
                )}
              </span>
            </div>
            {stat.description && (
              <span className="text-sm text-center text-gray-custom px-5 pt-2">
                {stat.description}
              </span>
            )}
          </div>
        ))}
      </div>
      {hideInformationText ? (
        ''
      ) : (
        <div className="flex flex-row space-x-3 items-center mt-3 mb-12">
          <div className=" flex flex-row justify-center  items-center bg-purple-light text-white rounded w-12">
            <RxArrowTopRight size={'18px'} /> %
          </div>
          <div className=" flex flex-row justify-center  items-center bg-gray-custom text-white rounded w-12">
            <RxArrowBottomRight size={'18px'} /> %
          </div>
          <p className="text-sm">% compared to the last week</p>
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
  hideInformationText: false,
};

export default StatisticalData;
