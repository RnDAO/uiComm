import React from 'react';
import TcText from '../../../shared/TcText';
import TcEngagementAccountContentItems from './TcEngagementAccountContentItems';

interface IContentItem {
  bgColor: string;
  value: string;
  description: string;
  tooltipText: string;
  label?: string;
}

const CONTENT_ITEMS: IContentItem[] = [
  {
    bgColor: 'bg-[#D2F4CF]',
    value: '0',
    description: 'Only engaged a bit but deeper interactions',
    tooltipText:
      'Number of users with low engagement (less than 3 interactions) but of high quality  ( replying, mentioning, or quoting you)',
    label: 'Low',
  },
  {
    bgColor: 'bg-[#3A9E2B]',
    value: '0',
    description: 'Frequently engaged and deep interactions',
    tooltipText:
      'Number of users with high engagement (at least 3) and high quality (replies, quotes, or mentions you)',
  },
  {
    bgColor: 'bg-[#FBE8DA]',
    value: '0',
    description: 'Only engaged a bit and shallow interactions',
    tooltipText:
      'Number of users with low engagement (less than 3 interactions) but of high quality  ( replying, mentioning, or quoting you)',
    label: 'Low',
  },
  {
    bgColor: 'bg-[#D2F4CF]',
    value: '0',
    description: 'Frequently engaged but shallow interactions',
    tooltipText:
      'Number of users with high engagement (at least 3) but low quality (likes and retweets)',
    label: 'High',
  },
];

function TcEngagementAccountsContent() {
  const renderContentItems = (item: IContentItem, index: number) => (
    <div key={index} className="w-1/2 text-center">
      <TcEngagementAccountContentItems
        bgColor={item.bgColor}
        value={item.value}
        description={item.description}
        tooltipText={item.tooltipText}
      />
      {item.label && (
        <TcText text={item.label} variant={'subtitle1'} color={'#767676'} />
      )}
    </div>
  );

  return (
    <div className="border-l border-b h-[26rem] w-[30rem] mx-auto">
      <div className="relative -rotate-90 -left-[16rem] top-[3rem]">
        <TcText
          text="Quality of engagement"
          fontWeight="bold"
          variant={'subtitle1'}
        />
      </div>
      <div className="relative -bottom-[24.7rem] left-[10rem]">
        <TcText
          text="Amount of engagement"
          fontWeight="bold"
          variant={'subtitle1'}
        />
      </div>
      <div className="w-full md:w-11/12 mx-auto pl-2 md:pl-8">
        {['High', 'Low'].map((label, index) => (
          <div
            key={label}
            className="flex min-h-[8rem] flex-row items-center space-x-3 flex-1  overflow-scroll md:overflow-auto"
          >
            <TcText text={label} variant={'subtitle1'} color={'#767676'} />
            <div className="flex flex-row w-full space-x-6">
              {renderContentItems(CONTENT_ITEMS[index * 2], index * 2)}
              {renderContentItems(CONTENT_ITEMS[index * 2 + 1], index * 2 + 1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TcEngagementAccountsContent;
