import React from "react";
import Chart from "../../global/Chart";
type Props = {};

const MainSection = (props: Props) => {
  return (
    <div>
      <h3 className="pb-4 text-lg font-medium text-lite-black">Community Insights</h3>
      <Chart />
    </div>
  );
};

export default MainSection;
