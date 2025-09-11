import React from 'react';
import { MdAdd, MdShare, MdUpgrade, MdFeedback } from 'react-icons/md';
import './Topbar.css';

const Topbar = ({ title, subtitle }) => (
  <header className="topbar">
    <div className="topbar-left">
      <span className="studyset-title">{title}</span>
      <button className="new-studyset-btn"><MdAdd /> New Chat Session</button>
      {subtitle && <span className="subtitle">{subtitle}</span>}
      <button className="class-knowledge-btn">Chat History</button>
    </div>
    <div className="topbar-right">
      <button className="share-btn"><MdShare /> Share</button>
      <button className="upgrade-btn"><MdUpgrade /> Upgrade</button>
      <button className="feedback-btn"><MdFeedback /> Feedback</button>
      <div className="profile-circle">K</div>
      <div className="profile-badge">1</div>
    </div>
  </header>
);

export default Topbar;
