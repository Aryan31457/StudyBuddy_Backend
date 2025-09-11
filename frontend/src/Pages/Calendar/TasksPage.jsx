
import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';


const TasksPage = () => {
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
          <h1 className="text-3xl font-extrabold text-indigo-900 mb-1">My Tasks</h1>
          <div className="text-gray-500 text-base font-medium">Thursday, September 11th • <span className="inline-block align-middle"><button className="bg-blue-100 text-blue-700 rounded px-3 py-1 ml-2 font-semibold text-base">IIITU ▼</button></span></div>
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
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <button className="flex items-center gap-2 text-indigo-500 font-semibold text-lg mb-8 hover:underline"><span className="text-2xl">＋</span> Add a task</button>
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="rounded-full bg-indigo-50 flex items-center justify-center w-24 h-24 mb-6">
            <FaGraduationCap className="text-indigo-300 text-5xl" />
          </div>
          <div className="text-xl font-bold text-indigo-900 mb-2 text-center">Ready to ace your exams?</div>
          <div className="text-gray-500 text-center max-w-xl mb-6">Add an exam to generate personalized study sessions with flashcards, quizzes, and review tasks scheduled leading up to your exam date</div>
          <div className="flex gap-4 justify-center">
            <button className="bg-purple-200 text-indigo-900 font-bold rounded-lg px-6 py-3 flex items-center gap-2 shadow hover:bg-purple-300 transition"><FaGraduationCap className="text-xl" /> Create Study Plan</button>
            <button className="bg-gray-100 text-gray-700 font-semibold rounded-lg px-6 py-3 flex items-center gap-2 border border-gray-200 shadow hover:bg-gray-200 transition">Import & Sync</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
