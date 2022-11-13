import React from "react";
import { GoGlobe } from "react-icons/go";

type Props = {};

const ZonePicker = (props: Props) => {
  return (
    <div className="flex flex-row items-center bg-gray-background px-3 items-center rounded-md">
      <GoGlobe size={20} className="mr-3" />
      ZonePicker
    </div>
  );
};

export default ZonePicker;
