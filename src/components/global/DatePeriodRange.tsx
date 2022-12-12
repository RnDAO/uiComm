import clsx from "clsx";
import React, { useState } from "react";
import CustomDatePicker from "./CustomDatePicker";

type dateItems = {
  title: string;
  icon?: JSX.Element;
  value: any;
};

const datePeriod: dateItems[] = [
  {
    title: "Last 7 days",
    value: 0,
  },
  {
    title: "1M",
    value: 1,
  },
  {
    title: "3M",
    value: 2,
  },
  {
    title: "1Y",
    value: 3,
  },
];

type datePeriodRangeProps = {
  activePeriod: string | number;
  onChangeActivePeriod: (e:number) => void
}

export default function DatePeriodRange({ activePeriod, onChangeActivePeriod }: datePeriodRangeProps) {
  return (
    <div className="flex flex-row md:space-x-3 flex-wrap">
      <ul className="flex flex-row flex-wrap space-x-1.5 md:space-x-3">
        {datePeriod.length > 0
          ? datePeriod.map((el) => (
            <li
              className={`
                           flex flex-row items-center px-3 md:px-2.5 py-2 md:py-1.5 rounded-md cursor-pointer
                           ${activePeriod == el.value
                  ? "bg-black text-white"
                  : "bg-gray-background"
                }`}
              key={el.value}
              onClick={() => onChangeActivePeriod(el.value)}
            >
              {el.icon ? el.icon : ""}
              <div>{el.title}</div>
            </li>
          ))
          : ""}
      </ul>
      <CustomDatePicker
        className={clsx(
          "mt-2 md:mt-0",
          activePeriod === 4 ? "bg-black text-white" : ""
        )}
        onClick={() => {
          onChangeActivePeriod(4);
        }}
      />
    </div>
  );
}
