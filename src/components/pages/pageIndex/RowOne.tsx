import React from "react";

import { ImArrowDown } from "react-icons/im";

export const RowOne = (): JSX.Element => {
  return (
    <>
      <div className="bg-gradient-mantle w-full h-80 rounded-lg overflow-hidden shadow-box">
        <div className="h-80 bg-[url('../assets/svg/commiunity.svg')] bg-no-repeat bg-right-bottom px-12 py-8">
          <div className="w-1/3 leading-10	">
            <h3 className="text-3xl font-bold">
              The new way to manage your community
            </h3>
          </div>
          <div className="w-3/5 leading-6 py-8">
            <p>
              We believe communities are the beating heart of DAOs. But there
              was no way to assess and improve. We assembled a team of
              scientists to empower you with deep, actionable insights.
            </p>
            <p className="py-6">
              And while the team is busy building a suite of tools, below is a
              <span className="flex flex-row items-center">
                <b> small appetizer to get you started</b>
                <ImArrowDown size={25} />
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
