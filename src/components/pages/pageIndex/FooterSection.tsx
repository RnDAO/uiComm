import React from "react";
import Card from "../../global/Card";
import Image from "next/image";

import graph from "../../../assets/svg/graph.svg";
import members from "../../../assets/svg/members.svg";
import metrics from "../../../assets/svg/metrics.svg";
import arrowBottom from "../../../assets/svg/arrowBottom.svg";
import benchmark from "../../../assets/svg/benchmark.svg";

import { BsClockHistory } from "react-icons/bs";

export const FooterSection = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-col space-y-5">
        <div>
          <p className="text-xl mb-2 font-bold text-center">COMING SOON...</p>
          <BsClockHistory size={70} className="mx-auto bg-gray-100 rounded-full p-3" />
        </div>
        <div className="flex flex-row justify-between space-x-3">
          <Card
            title={"Spot value-adding members in your community"}
            srcImage={members}
          />
          <Card
            title={"Use data to improve onboarding"}
            className={"bg-primary text-white"}
            srcImage={graph}
            srcWidth={650}
          />
        </div>
        <div className="w-full bg-secondary  shadow-lg rounded-xl p-6 text-white">
          <p className="text-2xl font-bold">
            Explore all the metrics that determine the health of your community
          </p>
          <div className="mx-auto w-1/3">
            <Image src={metrics} alt="Picture of the author" width={400} />
          </div>
          <span>Read our research on </span>
          <button className="bg-white bg-opacity-20 px-3 rounded-full">
            Community Health <span className="text-error">arrow-right</span>
          </button>
        </div>
        <div className="flex flex-row justify-between space-x-3">
          <Card
            title={
              "Monitor members who disengage and take action to bring them back"
            }
            className={"bg-yellow-400"}
            srcImage={arrowBottom}
          />
          <Card
            title={"Benchmark your metrics and learn from others"}
            className={"bg-white text-black"}
            srcImage={benchmark}
            srcWidth={650}
          />
        </div>
      </div>
    </>
  );
};
