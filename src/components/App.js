import React, { Component, useState } from "react";
import "../styles/App.css";

const App = () => {
  const [month, setMonth] = useState("8");
  const [year, setYear] = useState("2026");
  const [isEditingYear, setIsEditingYear] = useState(false);

  const months = [
    {
      id: 0,
      name: "January",
    },
    {
      id: 1,
      name: "February",
    },
    {
      id: 2,
      name: "March",
    },
    {
      id: 3,
      name: "April",
    },
    {
      id: 4,
      name: "May",
    },
    {
      id: 5,
      name: "June",
    },
    {
      id: 6,
      name: "July",
    },
    {
      id: 7,
      name: "August",
    },
    {
      id: 8,
      name: "September",
    },
    {
      id: 9,
      name: "October",
    },
    {
      id: 10,
      name: "November",
    },
    {
      id: 11,
      name: "December",
    },
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  return (
    <div id="main">
      <h1>Calendar</h1>

      <select
        value={month}
        onChange={(e) => {
          setMonth(e.target.value);
        }}
      >
        {months.map((month) => {
          return (
            <option key={month.id} value={month.id}>
              {month.name}
            </option>
          );
        })}
      </select>

      {isEditingYear ? (
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          onBlur={() => setIsEditingYear(false)}
        />
      ) : (
        <h2 onDoubleClick={() => setIsEditingYear(true)}>{year}</h2>
      )}

      <table>
        <thead>
          <tr>
            {weekDays.map((day) => {
              return <th key={day}>{day}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {Array.from(
            { length: Math.ceil((firstDay + daysInMonth) / 7) },
            (_, weekIndex) => {
              return (
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
              );
            }
          )}
        </tbody>
      </table>

      <button onClick={() => setYear(String(Number(year) - 1))}>
        ⏪
      </button>
      
      <button onClick={() => {
        if (Number(month) === 0) {
          setMonth("11");
          setYear(String(Number(year) - 1));
        } else {
          setMonth(String(Number(month) - 1));
        }
      }}>
        🡸
      </button>

      <button onClick={() => {
        if (Number(month) === 11) {
          setMonth("0");
          setYear(String(Number(year) + 1));
        } else {
          setMonth(String(Number(month) + 1));
        }
      }}>
        🡺
      </button>

      

      <button onClick={() => setYear(String(Number(year) + 1))}>
        ⏩
      </button>
    </div>
  );
};

export default App;
