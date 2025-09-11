
import './App.css';
import Sidebar from './Components/SideBar/Sidebar';
import Topbar from './components/Topbar';
import ChatPage from './Pages/Chat/ChatPage';
import DashboardPage from './Pages/DashBoard/DashboardPage';
import TasksPage from './Pages/Calendar/TasksPage';
import DayPage from './Pages/Calendar/DayPage';
import WeekPage from './Pages/Calendar/WeekPage';
import MonthPage from './Pages/Calendar/MonthPage';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';


function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  // Determine activeKey for sidebar
  let activeKey = 'home';
  if (location.pathname.startsWith('/chat')) activeKey = 'chat';
  else if (location.pathname.startsWith('/calendar')) activeKey = 'calendar';
  // Topbar title based on route
  let topbarTitle = 'IIITU';
  if (activeKey === 'chat') topbarTitle = 'New Chat Session';
  else if (activeKey === 'calendar') topbarTitle = 'Calendar';
  return (
    <div className="main-layout">
      <Sidebar activeKey={activeKey} onMenuClick={key => {
        if (key === 'chat') navigate('/chat');
        else if (key === 'home') navigate('/');
        else if (key === 'calendar') navigate('/calendar/tasks');
      }} />
      <div className="content-area">
        <Topbar title={topbarTitle} />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/calendar/tasks" element={<TasksPage />} />
          <Route path="/calendar/day" element={<DayPage />} />
          <Route path="/calendar/week" element={<WeekPage />} />
          <Route path="/calendar/month" element={<MonthPage />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
