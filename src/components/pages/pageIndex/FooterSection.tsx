import React from "react";
import Card from "../../global/Card";
import Image from "next/image";

import graph from "../../../assets/svg/graph.svg";
import members from "../../../assets/svg/members.svg";
import metrics from "../../../assets/svg/metrics.svg";
import arrowBottom from "../../../assets/svg/arrowBottom.svg";
import benchmark from "../../../assets/svg/benchmark.svg";

import { BsClockHistory } from "react-icons/bs";
import { HiOutlineArrowRight } from "react-icons/hi";
import Link from "next/link";

export const FooterSection = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-col space-y-5">
        <div>
          <p className="text-xl mb-2 font-bold text-center">COMING SOON...</p>
          <BsClockHistory
            size={70}
            className="mx-auto bg-gray-100 rounded-full p-3"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 md:space-x-3">
          <div className="w-full md:w-1/2 shadow-xl rounded-xl p-4 md:p-8">
            <p className="text-xl md:text-2xl font-bold">
              Spot value-adding members in your community
            </p>
            <div
              style={{
                position: "relative",
                width: "70%",
                top: "2rem",
                float: "right",
                paddingBottom: "50%",
              }}
            >
              <Image
                alt="Image Alt"
                src={members}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 shadow-xl bg-primary rounded-xl p-4 md:p-8">
            <p className="text-xl text-white md:text-2xl font-bold">
              Use data to improve onboarding
            </p>
            <div
              style={{
                position: "relative",
                width: "70%",
                float: "left",
                paddingBottom: "50%",
              }}
            >
              <Image
                alt="Image Alt"
                src={graph}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
        <div className="w-full bg-secondary  shadow-lg rounded-xl p-4 md:p-8 text-white">
          <p className="text-xl md:text-2xl font-bold">
            Explore all the metrics that determine <br /> the health of your
            community
          </p>
          <div
            style={{
              width: "30%",
              top: "3rem",
              position: "relative",
              left: "70%",
              transform: "translateX(-60%)",
              paddingBottom: "3rem",
            }}
          >
            <Image src={metrics} alt="Picture of the author" width={400} />
          </div>
          <span>Read our research on </span>
          <button className="bg-white mt-2 md:mt-0 bg-opacity-20 py-1 px-3 rounded-full hover:bg-white ease-in delay-75font-bold hover:text-black">
            <Link
              href={
                "https://rndao.mirror.xyz/F-SMj6p_jdYvrMMkR1d9Hd6YbEg39qItTKfjo-zkgqM"
              }
            >
              <span className="flex flex-row items-center">
                Community Health <HiOutlineArrowRight size={25} />
              </span>
            </Link>
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 md:space-x-3">
          <div className="w-full md:w-1/2 shadow-box bg-yellow-400 rounded-xl p-4 md:p-8 overflow-hidden">
            <p className="text-xl md:text-2xl font-bold">
              Monitor members who disengage and take action to bring them
              back
            </p>
            <div
              style={{
                position: "relative",
                width: "45%",
                top: "3rem",
                left: "50%",
                transform: "translate(-50%,0)",
                float: "left",
                paddingBottom: "50%",
              }}
            >
              <Image
                alt="Image Alt"
                src={arrowBottom}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 shadow-xl rounded-xl p-4 md:p-8">
            <p className="text-xl md:text-2xl font-bold">
              Benchmark your metrics and learn from others
            </p>
            <div
              style={{
                position: "relative",
                width: "70%",
                float: "right",
                paddingBottom: "50%",
              }}
            >
              <Image
                alt="Image Alt"
                src={benchmark}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
