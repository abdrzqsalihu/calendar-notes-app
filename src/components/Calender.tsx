import React from "react";
import Month from "./Month";
import "../styles/Calender.scss";

const Calendar: React.FC = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11

  // Create Date objects for previous, current, and next months
  const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const currentMonthDate = new Date(currentYear, currentMonth, 1);
  const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);

  return (
    <div className="calendar">
      <Month date={prevMonthDate} highlightToday={false} />
      <Month date={currentMonthDate} highlightToday={true} />
      <Month date={nextMonthDate} highlightToday={false} />
    </div>
  );
};

export default Calendar;
