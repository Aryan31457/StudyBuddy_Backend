import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const weeks = [
  [
    { day: 31, month: 'prev' }, { day: 1, label: 'Sept 01' }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }
  ],
  [
    { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11, highlight: true }, { day: 12 }, { day: 13 }
  ],
  [
    { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 }
  ],
  [
    { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }
  ],
  [
    { day: 28 }, { day: 29 }, { day: 30 }, { day: 1, month: 'next', label: 'Oct 01' }, { day: 2, month: 'next' }, { day: 3, month: 'next' }, { day: 4, month: 'next' }
  ]
];
const daysOfWeek = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];

const MonthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTasks = location.pathname === '/calendar/tasks';
  const isDay = location.pathname === '/calendar/day';
  const isWeek = location.pathname === '/calendar/week';
  const isMonth = location.pathname === '/calendar/month';

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white p-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-8 pt-8 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold text-indigo-900 mb-1">September 2025</h1>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            className={`font-semibold rounded px-4 py-2 flex items-center gap-2 border shadow-sm transition ${isTasks ? 'bg-white text-indigo-700 border-indigo-200 ring-2 ring-indigo-200' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
            onClick={() => navigate('/calendar/tasks')}
          >
            <span className="font-bold">☰</span> Tasks
          </button>
          <button
            className={`font-semibold rounded px-4 py-2 flex items-center gap-2 border shadow-sm transition ${isDay ? 'bg-white text-indigo-700 border-indigo-200 ring-2 ring-indigo-200' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
            onClick={() => navigate('/calendar/day')}
          >
            <span>📅</span> Day
          </button>
          <button
            className={`font-semibold rounded px-4 py-2 flex items-center gap-2 border shadow-sm transition ${isWeek ? 'bg-white text-indigo-700 border-indigo-200 ring-2 ring-indigo-200' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
            onClick={() => navigate('/calendar/week')}
          >
            <span>📅</span> Week
          </button>
          <button
            className={`font-semibold rounded px-4 py-2 flex items-center gap-2 border shadow-sm transition ${isMonth ? 'bg-white text-indigo-700 border-indigo-200 ring-2 ring-indigo-200' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
            onClick={() => navigate('/calendar/month')}
          >
            <span>📅</span> Month
          </button>
        </div>
      </div>
      <div className="flex flex-1 w-full">
        <div className="flex-1 px-8 py-4 overflow-x-auto">
          <div className="border rounded-lg bg-gray-50 overflow-x-auto">
            <div className="flex flex-col">
              {/* Days of week header */}
              <div className="grid grid-cols-7 border-b border-gray-100 bg-white sticky top-0 z-10">
                {daysOfWeek.map((d, idx) => (
                  <div key={d} className="flex flex-col items-center justify-center h-14 px-2">
                    <span className="text-base font-bold text-gray-700">{d}</span>
                  </div>
                ))}
              </div>
              {/* Month grid */}
              {weeks.map((week, rowIdx) => (
                <div key={rowIdx} className="grid grid-cols-7 border-b border-gray-100 min-h-[64px]">
                  {week.map((cell, colIdx) => (
                    <div
                      key={colIdx}
                      className={`h-20 flex flex-col items-center justify-center border-r border-gray-100 text-base font-semibold ${cell.month === 'prev' || cell.month === 'next' ? 'bg-gray-100 text-gray-400' : ''} ${cell.highlight ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'}`}
                    >
                      <span>{cell.day}</span>
                      {cell.label && <span className="text-xs font-medium text-gray-400">{cell.label}</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right sidebar */}
        <div className="w-[350px] min-w-[300px] border-l bg-white flex flex-col px-6 py-6">
          <div className="flex items-center gap-2 mb-4">
            <FaCalendarAlt className="text-indigo-400 text-2xl" />
            <span className="font-bold text-lg text-indigo-900">Events</span>
          </div>
          <div className="text-gray-500 mb-4">Manage your schedule</div>
          <div className="flex gap-2 mb-4">
            <button className="bg-gray-100 text-gray-700 rounded px-4 py-2 font-semibold">Filters</button>
            <button className="bg-gray-100 text-gray-700 rounded px-4 py-2 font-semibold">Tags</button>
            <button className="bg-gray-100 text-gray-700 rounded px-4 py-2 font-semibold">Import & Connect</button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1">
            <div className="rounded-full bg-indigo-50 flex items-center justify-center w-20 h-20 mb-4">
              <FaCalendarAlt className="text-indigo-200 text-4xl" />
            </div>
            <div className="text-lg font-semibold text-gray-500 mb-2">No upcoming events</div>
            <div className="text-gray-400 text-center mb-4">Schedule events to see them here</div>
            <button className="bg-blue-100 text-blue-700 font-bold rounded px-6 py-2 mb-2 flex items-center gap-2 hover:bg-blue-200 transition">+ Add Event</button>
          </div>
          <button className="bg-blue-500 text-white font-bold rounded w-full py-3 mt-4 flex items-center justify-center gap-2 hover:bg-blue-600 transition">+ Add Event</button>
        </div>
      </div>
    </div>
  );
};

export default MonthPage;
