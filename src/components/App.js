import React, { useState } from "react";
import "../styles/App.css";

const App = () => {
  const [month, setMonth] = useState("September");
  const [year, setYear] = useState("2026");
  const [isEditingYear, setIsEditingYear] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get the numeric index of the selected month
  const monthIndex = months.indexOf(month);

  // Find the weekday on which the month starts
  const firstDay = new Date(Number(year), monthIndex, 1).getDay();

  // Find the total number of days in the selected month
  const daysInMonth = new Date(Number(year), monthIndex + 1, 0).getDate();

  // Create an array of dates
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  // Previous month
  const handlePreviousMonth = () => {
    if (monthIndex === 0) {
      setMonth("December");
      setYear(String(Number(year) - 1));
    } else {
      setMonth(months[monthIndex - 1]);
    }
  };

  // Next month
  const handleNextMonth = () => {
    if (monthIndex === 11) {
      setMonth("January");
      setYear(String(Number(year) + 1));
    } else {
      setMonth(months[monthIndex + 1]);
    }
  };

  // Previous year
  const handlePreviousYear = () => {
    setYear(String(Number(year) - 1));
  };

  // Next year
  const handleNextYear = () => {
    setYear(String(Number(year) + 1));
  };

  // Finish editing year when Enter is pressed
  const handleYearKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditingYear(false);
    }
  };

  return (
    <div id="main">
      <h1 id="heading">Calendar</h1>

      {/* Month dropdown */}
      <select
        id="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      >
        {months.map((monthName) => (
          <option key={monthName} value={monthName}>
            {monthName}
          </option>
        ))}
      </select>

      {/* Editable year */}
      {isEditingYear ? (
        <input
          id="year-input"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          onBlur={() => setIsEditingYear(false)}
          onKeyDown={handleYearKeyDown}
          autoFocus
        />
      ) : (
        <span id="year" onDoubleClick={() => setIsEditingYear(true)}>
          {year}
        </span>
      )}

      {/* Navigation buttons */}
      <div>
        <button id="prev-year" onClick={handlePreviousYear}>
          Previous Year
        </button>

        <button id="prev-month" onClick={handlePreviousMonth}>
          Previous Month
        </button>

        <button id="next-month" onClick={handleNextMonth}>
          Next Month
        </button>

        <button id="next-year" onClick={handleNextYear}>
          Next Year
        </button>
      </div>

      {/* Calendar table */}
      <table>
        <thead>
          <tr>
            {weekDays.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from(
            {
              length: Math.ceil((firstDay + daysInMonth) / 7),
            },
            (_, weekIndex) => (
              <tr key={weekIndex}>
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const dayNumber = weekIndex * 7 + dayIndex - firstDay + 1;

                  return (
                    <td key={dayIndex}>
                      {dayNumber > 0 && dayNumber <= daysInMonth
                        ? dayNumber
                        : ""}
                    </td>
                  );
                })}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
