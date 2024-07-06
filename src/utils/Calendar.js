import "./utils.css";
import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const CalendarCustom = forwardRef(({ value, onClick }, ref) => (
    <button className="calendar-custom" onClick={onClick} ref={ref}>
      {value}
      <ArrowDropDownIcon style={{ color: "white" }} />
    </button>
  ));
  return (
    <DatePicker
      dateFormat="yyyy.MM.dd" // 날짜 형태
      shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
      minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
      maxDate={new Date("2099-12-31")} // maxDate 이후 날짜 선택 불가
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      customInput={<CalendarCustom />}
    />
  );
};

export default Calendar;
