import React, { useState } from "react";

type Props = {
  className?: string;
  options: optionItem[];
  icon: JSX.Element;
};

type optionItem = {
  title: string;
  value: number;
};

const RangeSelect = ({ options, icon }: Props) => {
  const [active, setActive] = useState(1);

  return (
    <>
      <div className="bg-gray-background px-3 rounded-md">
        <ul className="flex flex-row py-1 items-center text-light-gray">
          <div className="mr-3">{icon}</div>
          {options.length > 0
            ? options.map((el) => (
                <li
                  onClick={(e) => setActive(el.value)}
                  key={el.value}
                  className={
                    active === el.value
                      ? "py-1 px-1.5 text-sm rounded-md bg-white text-light-gray cursor-pointer hover:bg-lite"
                      : "py-1 px-1.5 text-sm rounded-md cursor-pointer text-light-gray hover:bg-lite"
                  }
                >
                  <div className="">{el.title}</div>
                </li>
              ))
            : ""}
        </ul>
      </div>
    </>
  );
};

export default RangeSelect;
