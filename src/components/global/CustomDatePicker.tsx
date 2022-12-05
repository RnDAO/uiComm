import React, { FC, RefObject, useState } from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, {
  DayRange,
} from "@hassanmojab/react-modern-calendar-datepicker";
import { FiCalendar } from "react-icons/fi";
import clsx from "clsx";
import moment from "moment";

interface IProps {
  placeholder?: string;
  className: string;
  onClick: any;
}

const CustomDatePicker: FC<IProps> = ({
  placeholder,
  className,
  onClick,
}): JSX.Element => {
  const [dayRange, setDayRange] = useState<DayRange>({
    from: null,
    to: null,
  });

  const renderCustomInput = ({ ref }: { ref: RefObject<HTMLInputElement> | any }) => (
    <div
      onClick={onClick}
      className={clsx(
        "flex flex-row bg-gray-background text-center py-2.5 md:py-2 px-3 text-sm rounded-md cursor-pointer",
        className
      )}
    >
      <FiCalendar size={20} className="mr-2" />
      <input
        ref={ref}
        readOnly
        value={
          dayRange.from
            ? ` ${moment(dayRange.from?.month).format("MMM")} ${moment(
              dayRange.from?.day
            ).format("DD")} - ${dayRange.to?.month ? moment(dayRange.to?.month).format("MMM") : ''} ${dayRange.to?.day ? dayRange.to?.day : ''}  ${dayRange.to?.year ? dayRange.to?.year : ''}`
            : ""
        }
        placeholder={placeholder}
        className="bg-transparent outline-none"
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
