import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const days = [
  { label: 'Sun', date: '07' },
  { label: 'Mon', date: '08' },
  { label: 'Tue', date: '09' },
  { label: 'Wed', date: '10' },
  { label: 'Thu', date: '11' },
  { label: 'Fri', date: '12' },
  { label: 'Sat', date: '13' },
];
const hours = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
];

const WeekPage = () => {
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
          <h1 className="text-2xl font-extrabold text-indigo-900 mb-1">Sep 7th - Sep 13th</h1>
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
              {/* Days header */}
              <div className="grid grid-cols-8 border-b border-gray-100 bg-white sticky top-0 z-10">
                <div className="h-14"></div>
                {days.map((day, idx) => (
                  <div key={day.label} className={`flex flex-col items-center justify-center h-14 px-2 ${idx === 4 ? 'bg-indigo-50' : ''}`}>
                    <span className={`text-base font-bold ${idx === 4 ? 'text-indigo-700' : 'text-gray-700'}`}>{day.label}</span>
                    <span className={`text-xs font-semibold ${idx === 4 ? 'text-indigo-700' : 'text-gray-400'}`}>{day.date}</span>
                  </div>
                ))}
              </div>
              {/* Time grid */}
              {hours.map((hour, rowIdx) => (
                <div key={hour} className="grid grid-cols-8 border-b border-gray-100 min-h-[48px]">
                  <div className="flex items-center justify-end pr-2 text-gray-500 font-semibold text-sm border-r border-gray-100">{hour}</div>
                  {days.map((_, colIdx) => (
                    <div key={colIdx} className={`h-12 border-r border-gray-100 ${colIdx === 4 && rowIdx === 6 ? 'bg-indigo-50' : ''}`}></div>
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

export default WeekPage;
