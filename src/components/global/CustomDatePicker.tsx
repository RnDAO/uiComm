import React, { FC, useState } from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, {
  DayRange,
} from "@hassanmojab/react-modern-calendar-datepicker";
import { FiCalendar } from "react-icons/fi";

interface IProps {
  placeholder?: string;
}

const CustomDatePicker: FC<IProps> = ({ placeholder  }): JSX.Element => {
  const [dayRange, setDayRange] = React.useState<DayRange>({
    from: null,
    to: null,
  });

  const renderCustomInput = ({ ref }) => (
    <div
      className="flex flex-row bg-gray-background text-center py-2 px-3 text-sm rounded-md cursor-pointer"
    >
      <FiCalendar size={20} className="mr-2" />
      <input
        ref={ref} // necessary
        readOnly
        placeholder={placeholder}
        className="bg-transparent  outline-none"
      />
    </div>
  );

  return (
    <DatePicker
      value={dayRange}
      onChange={(date) => setDayRange(date)}
      renderInput={renderCustomInput}
      colorPrimary="#35B9B7" // added this
      colorPrimaryLight="#D0FBF8" // and this
    />
  );
};

CustomDatePicker.defaultProps = {
  placeholder: "Specific date",
};

export default CustomDatePicker;
