import React from 'react';
import networkGraph from '../../../assets/svg/networkGraph.svg';
import Image from 'next/image';
import router from 'next/router';
import TcButton from '../../shared/TcButton';

export default function MemberInteractionGraph() {
  return (
    <div className="bg-white shadow-box rounded-lg p-5">
      <div className="flex flex-col md:flex-row justify-start pt-4 space-x-6">
        <div className="px-3 space-y-6 md:w-1/2">
          <h3 className="font-bold text-xl md:text-2xl">
            Member interactions graph
          </h3>
          <p>
            Spot value-adding members in your community in member interaction{' '}
            <br className="hidden md:flex" />
            network graph.
          </p>
        </div>
        <div className="md:pl-12">
          <Image alt="Network graph" src={networkGraph} />
        </div>
      </div>
      <div className="text-center pt-6 md:pt-0 mb-3">
        <TcButton
          text={'Show more'}
          variant="contained"
          onClick={() => {
            router.push('/membersInteraction');
          }}
          className="py-2 px-[5rem]"
        />
      </div>
    </div>
  );
}
