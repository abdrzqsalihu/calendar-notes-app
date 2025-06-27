import React, { useEffect, useState } from "react";
import Month from "./Month";
import "../styles/Calender.scss";
import Overlay from "./Overlay";

const Calendar: React.FC = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11

  // Create Date objects for previous, current, and next months
  const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
  const currentMonthDate = new Date(currentYear, currentMonth, 1);
  const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);

  const [overlayDate, setOverlayDate] = useState<string | null>(null);
  const [overlayPos, setOverlayPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" && target.classList.contains("day")) {
        const date = target.getAttribute("data-date");
        if (date) {
          const rect = target.getBoundingClientRect();
          setOverlayDate(date);
          setOverlayPos({
            top: rect.bottom + window.scrollY + 4, // a little below
            left: rect.left + window.scrollX,
          });
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="calendar">
      <Month date={prevMonthDate} highlightToday={false} />
      <Month date={currentMonthDate} highlightToday={true} />
      <Month date={nextMonthDate} highlightToday={false} />
      {overlayDate && (
        <Overlay
          dateKey={overlayDate}
          position={overlayPos}
          onClose={() => setOverlayDate(null)}
        />
      )}
    </div>
  );
};

export default Calendar;
