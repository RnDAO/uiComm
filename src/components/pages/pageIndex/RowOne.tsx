import React from "react";

export const RowOne = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-row justify-between px-12 py-4">
        <div className="bg-gradient-mantle w-full h-80 rounded-lg overflow-hidden shadow-base">
          <div className="h-80 bg-[url('../assets/svg/commiunity.svg')] bg-no-repeat bg-right-bottom px-12 py-8">
            <div className="w-1/3 leading-10	">
              <h3 className="text-3xl font-bold">
                The new way to manage your community
              </h3>
            </div>
            <div className="w-2/4 leading-6 py-8">
              <p>
                We believe communities are the beating heart of DAOs. But there
                was no way to assess and improve. We assembled a team of
                scientists to empower you with deep, actionable insights.
              </p>
              <p className="py-6">
                And while the team is busy building a suite of tools, below is a
                <b> small appetizer to get you started</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
