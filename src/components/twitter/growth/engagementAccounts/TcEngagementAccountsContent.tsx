import React from 'react';

import TcEngagementAccountContentItems from './TcEngagementAccountContentItems';
import TcText from '../../../shared/TcText';

interface IContentItem {
  bgColor: string;
  value: number;
  description: string;
  tooltipText: string;
  label?: string;
}

interface ITcEngagementAccountsContentProps {
  contentItems: IContentItem[];
}

function TcEngagementAccountsContent({
  contentItems,
}: ITcEngagementAccountsContentProps) {
  const renderContentItems = (item: IContentItem, index: number) => (
    <div key={index} className='w-1/2 text-center'>
      <TcEngagementAccountContentItems
        bgColor={item.bgColor}
        value={item.value}
        description={item.description}
        tooltipText={item.tooltipText}
      />
      {item.label && (
        <TcText text={item.label} variant="subtitle1" color="#767676" />
      )}
    </div>
  );

  return (
    <div className='mx-auto h-[26rem] w-[30rem] border-l border-b'>
      <div className='relative -left-[16rem] top-[3rem] -rotate-90'>
        <TcText
          text='Quality of engagement'
          fontWeight='bold'
          variant="subtitle1"
        />
      </div>
      <div className='relative -bottom-[24.7rem] left-[10rem]'>
        <TcText
          text='Amount of engagement'
          fontWeight='bold'
          variant="subtitle1"
        />
      </div>
      <div className='mx-auto w-full pl-2 md:w-11/12 md:pl-8'>
        {['High', 'Low'].map((label, index) => (
          <div
            key={label}
            className='flex min-h-[8rem] flex-1 flex-row items-center space-x-3  overflow-scroll md:overflow-auto'
          >
            <TcText text={label} variant="subtitle1" color="#767676" />
            <div className='flex w-full flex-row space-x-6'>
              {renderContentItems(contentItems[index * 2], index * 2)}
              {renderContentItems(contentItems[index * 2 + 1], index * 2 + 1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TcEngagementAccountsContent;
