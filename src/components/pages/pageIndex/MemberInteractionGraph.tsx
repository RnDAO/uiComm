import React from 'react';
import networkGraph from '../../../assets/svg/networkGraph.svg';
import Image from 'next/image';
import router from 'next/router';
import CustomButton from '../../global/CustomButton';

export default function MemberInteractionGraph() {
  return (
    <div className="bg-white shadow-box rounded-lg p-5">
      <div className="flex flex-row justify-start pt-4 space-x-6">
        <div className="px-3 space-y-6 w-1/2">
          <h3 className="font-bold text-xl md:text-2xl">
            Member interactions graph
          </h3>
          <p>
            Spot value-adding members in your community in member interaction{' '}
            <br />
            network graph.
          </p>
        </div>
        <div className="md:pl-12">
          <Image alt="Network graph" src={networkGraph} />
        </div>
      </div>
      <div className="text-center mb-3">
        <CustomButton
          label={'Show more'}
          classes="bg-secondary text-white mx-auto"
          onClick={() => {
            router.push('/membersInteraction');
          }}
        />
      </div>
    </div>
  );
}
