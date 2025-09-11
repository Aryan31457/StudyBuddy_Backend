import React from 'react';
import SparkEDog from '../../components/SparkEDog.jsx';

const ChatPage = () => (
  <div className="flex flex-col flex-1 min-h-0 bg-gray-50 relative">
  {/* Tooltip is now handled in Sidebar on hover of Chat button */}
    {/* Main content */}
    <div className="flex flex-col items-center justify-center flex-1 min-h-[400px] pt-10 pb-8">
      <SparkEDog />
      <div className="flex flex-col items-center mt-6 w-full">
        <div className="flex gap-4 mb-4">
          <button className="bg-indigo-100 text-indigo-700 rounded-lg px-5 py-2 text-base font-semibold shadow hover:bg-indigo-200 transition border border-indigo-200">Personalities & Skillsets</button>
          <button className="bg-indigo-100 text-indigo-700 rounded-lg px-5 py-2 text-base font-semibold shadow hover:bg-indigo-200 transition border border-indigo-200">Scenarios</button>
        </div>
        <h2 className="text-3xl font-extrabold text-indigo-900 my-2">Hi, I'm StudyBuddy</h2>
        <div className="text-gray-500 text-lg mb-6 text-center max-w-xl">Ask me anything about learning, or try one of these examples:</div>
        <div className="flex gap-4 flex-wrap justify-center mb-2 w-full">
          <button className="bg-indigo-100 text-indigo-700 rounded-lg px-5 py-2 font-semibold shadow hover:bg-indigo-200 transition border border-indigo-200">Explain Concepts</button>
          <button className="bg-indigo-100 text-indigo-700 rounded-lg px-5 py-2 font-semibold shadow hover:bg-indigo-200 transition border border-indigo-200">Summarize</button>
          <button className="bg-indigo-100 text-indigo-700 rounded-lg px-5 py-2 font-semibold shadow hover:bg-indigo-200 transition border border-indigo-200">Find Citations</button>
          <button className="bg-indigo-100 text-indigo-700 rounded-lg px-5 py-2 font-semibold shadow hover:bg-indigo-200 transition border border-indigo-200">Study Techniques</button>
        </div>
      </div>
    </div>
    {/* Bottom bar */}
    <div className="bg-white border-t border-gray-200 px-4 py-6 flex flex-col items-center gap-2 shadow-sm">
      <input className="w-full max-w-2xl px-5 py-3 rounded-xl border border-gray-300 text-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition" placeholder="Ask your AI tutor anything..." />
      <div className="flex gap-3 flex-wrap justify-center w-full max-w-2xl">
        <button className="bg-indigo-100 text-indigo-700 rounded-lg px-5 py-2 font-semibold shadow hover:bg-indigo-200 transition border border-indigo-200 flex items-center gap-2"><span role='img' aria-label='web'>🌐</span> Web Browsing</button>
        <button className="bg-indigo-100 text-indigo-700 rounded-lg px-5 py-2 font-semibold shadow hover:bg-indigo-200 transition border border-indigo-200">Search Academic Papers</button>
        <button className="bg-orange-50 text-orange-700 border border-orange-300 rounded-lg px-5 py-2 font-semibold shadow hover:bg-orange-100 transition">Using 0 material(s) <span className="underline ml-1 cursor-pointer">Select Materials</span></button>
        <button className="bg-indigo-500 text-white rounded-lg px-6 py-2 font-bold text-lg shadow hover:bg-indigo-600 transition">➤</button>
      </div>
    </div>
  </div>
);

export default ChatPage;
