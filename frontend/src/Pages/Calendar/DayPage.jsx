
import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const hours = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
];

const DayPage = () => {
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
          <h1 className="text-2xl font-extrabold text-indigo-900 mb-1">Thursday, September 11th</h1>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            className={`font-semibold rounded px-4 py-2 flex items-center gap-2 border shadow-sm transition ${isTasks ? 'bg-white text-indigo-700 border-indigo-200 ring-2 ring-indigo-200' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
            onClick={() => navigate('/calendar/tasks')}
          >
            Tasks
          </button>
          <button
            className={`font-semibold rounded px-4 py-2 flex items-center gap-2 border shadow-sm transition ${isDay ? 'bg-white text-indigo-700 border-indigo-200 ring-2 ring-indigo-200' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
            onClick={() => navigate('/calendar/day')}
          >
            Day
          </button>
          <button
            className={`font-semibold rounded px-4 py-2 flex items-center gap-2 border shadow-sm transition ${isWeek ? 'bg-white text-indigo-700 border-indigo-200 ring-2 ring-indigo-200' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
            onClick={() => navigate('/calendar/week')}
          >
            Week
          </button>
          <button
            className={`font-semibold rounded px-4 py-2 flex items-center gap-2 border shadow-sm transition ${isMonth ? 'bg-white text-indigo-700 border-indigo-200 ring-2 ring-indigo-200' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
            onClick={() => navigate('/calendar/month')}
          >
            Month
          </button>
        </div>
      </div>
      <div className="flex flex-1 w-full">
        <div className="flex-1 px-8 py-4">
          <div className="border rounded-lg bg-gray-50 overflow-x-auto">
            <div className="flex flex-col divide-y divide-gray-100">
              {hours.map((hour, idx) => (
                <div key={hour} className={`flex items-center h-16 px-6 ${idx === 6 ? 'bg-indigo-50' : ''}`}>
                  <span className="text-gray-700 font-semibold w-24">{hour}</span>
                  {/* Event slots can go here */}
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

export default DayPage;
