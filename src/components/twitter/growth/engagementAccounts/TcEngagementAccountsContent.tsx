import React from 'react';
import TcText from '../../shared/TcText';
import TcEngagementAccountContentItems from './TcEngagementAccountContentItems';

function TcEngagementAccountsContent() {
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
      <div className="w-11/12 mx-auto pl-8">
        <div className="flex min-h-[8rem] flex-row items-center space-x-3 flex-1">
          <TcText text={'High'} variant={'subtitle1'} color={'#767676'} />
          <div className="flex flex-row w-full  space-x-6">
            <div className="w-1/2">
              <TcEngagementAccountContentItems
                bgColor="bg-[#D2F4CF]"
                value={'0'}
                description={'Only engaged a bit but deeper interactions'}
                tooltipText="Number of users with low engagement (less than 3 interactions) but of high quality  ( replying, mentioning, or quoting you)"
              />
            </div>
            <div className="w-1/2">
              <TcEngagementAccountContentItems
                bgColor="bg-[#3A9E2B]"
                value={'0'}
                description={'Frequently engaged and deep interactions'}
                tooltipText="Number of users with high engagement (at least 3) and high quality (replies, quotes, or mentions you)"
              />
            </div>
          </div>
        </div>
        <div className="flex min-h-[8rem] flex-row items-center flex-1 space-x-3 mt-6">
          <TcText text={'Low'} variant={'subtitle1'} color={'#767676'} />
          <div className="flex flex-row w-full  space-x-6">
            <div className="w-1/2 text-center">
              <TcEngagementAccountContentItems
                bgColor="bg-[#FBE8DA]"
                value={'0'}
                description={'Only engaged a bit and shallow interactions'}
                tooltipText="Number of users with low engagement (less than 3 interactions) but of high quality  ( replying, mentioning, or quoting you)"
              />
              <TcText text={'Low'} variant={'subtitle1'} color={'#767676'} />
            </div>
            <div className="w-1/2 text-center">
              <TcEngagementAccountContentItems
                bgColor="bg-[#D2F4CF]"
                value={'0'}
                description={'Frequently engaged but shallow interactions'}
                tooltipText="Number of users with high engagement (at least 3) but low quality (likes and retweets)"
              />
              <TcText text={'High'} variant={'subtitle1'} color={'#767676'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TcEngagementAccountsContent;
