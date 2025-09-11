
import './App.css';
import Sidebar from './Components/SideBar/Sidebar';
import Topbar from './components/Topbar';
import ChatPage from './Pages/Chat/ChatPage';
import DashboardPage from './Pages/DashBoard/DashboardPage';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';


function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  // Determine activeKey for sidebar
  const activeKey = location.pathname === '/chat' ? 'chat' : 'home';
  // Topbar title based on route
  const topbarTitle = activeKey === 'chat' ? 'New Chat Session' : 'IIITU';
  return (
    <div className="main-layout">
      <Sidebar activeKey={activeKey} onMenuClick={key => {
        if (key === 'chat') navigate('/chat');
        else if (key === 'home') navigate('/');
      }} />
      <div className="content-area">
        <Topbar title={topbarTitle} />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/chat" element={<ChatPage />} />
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
