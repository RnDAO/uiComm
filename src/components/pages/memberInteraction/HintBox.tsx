import React from 'react';

export default function HintBox() {
  return (
    <div className="bg-gray-hover py-7 md:px-5 lg:px-7 rounded-xl space-y-6 overflow-hidden">
      <p className="font-semibold whitespace-nowrap">Number of interactions</p>
      <div className="flex flex-row justify-around items-baseline">
        <div className="text-center text-sm">
          <div className="rounded-full w-3.5 h-3.5 bg-secondary mx-auto" />
          <span>+10</span>
        </div>
        <div className="text-center text-sm">
          <div className="rounded-full w-5 h-5 bg-secondary mx-auto" />
          <span>+50</span>
        </div>
        <div className="text-center text-sm">
          <div className="rounded-full w-8 h-8 bg-secondary mx-auto" />
          <span>+100</span>
        </div>
      </div>
      <div className="mx-auto text-center space-y-2">
        <p className="font-semibold">Member Behaviour</p>
        <div className="flex flex-row justify-start text-center text-sm items-center ml-5">
          <div className="rounded-full w-5 h-5 bg-yellow-400" />
          <span className="pl-4 whitespace-nowrap">Frequent receiver</span>
        </div>
        <div className="flex flex-row justify-start text-center text-sm items-center ml-5">
          <div className="rounded-full w-5 h-5 bg-green" />
          <span className="pl-4 whitespace-nowrap">Frequent sender</span>
        </div>
        <div className="flex flex-row justify-start text-center text-sm items-center ml-5">
          <div className="rounded-full w-5 h-5 bg-secondary" />
          <span className="pl-4 whitespace-nowrap">Balanced</span>
        </div>
      </div>
    </div>
  );
}
