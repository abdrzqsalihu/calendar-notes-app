import React from "react";
import { useNoteContext } from "../context/NoteContext";

interface MonthProps {
  date: Date;
  highlightToday: boolean;
}

const Weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Month: React.FC<MonthProps> = ({ date, highlightToday }) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();
  const { notes } = useNoteContext();

  // First day of the month
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();

  // Number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Fill in blank cells for the start of the month
  const blanks = Array(startWeekday).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const allCells = [...blanks, ...days];

  return (
    <div className="month">
      <h2>
        {date.toLocaleString("default", { month: "long", year: "numeric" })}
      </h2>
      <table>
        <thead>
          <tr>
            {Weekdays.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(allCells.length / 7) }).map(
            (_, weekIndex) => (
              <tr key={weekIndex}>
                {allCells
                  .slice(weekIndex * 7, weekIndex * 7 + 7)
                  .map((day, idx) => {
                    if (day === null) {
                      return <td key={idx} />;
                    }

                    const isToday =
                      highlightToday &&
                      today.getDate() === day &&
                      today.getMonth() === month &&
                      today.getFullYear() === year;

                    return (
                      <td key={idx}>
                        <button
                          type="button"
                          className={`day${isToday ? " today" : ""}`}
                          data-date={`${year}-${String(month + 1).padStart(
                            2,
                            "0"
                          )}-${String(day).padStart(2, "0")}`}
                        >
                          {day}
                          {notes[
                            `${year}-${String(month + 1).padStart(
                              2,
                              "0"
                            )}-${String(day).padStart(2, "0")}`
                          ] && <span className="note-dot" />}
                        </button>
                      </td>
                    );
                  })}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Month;
