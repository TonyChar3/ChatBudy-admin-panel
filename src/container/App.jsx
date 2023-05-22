import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import RegisterPage from '../components/Register/register';
import LogInPage from '../components/Login/login';
import InboxPage from '../components/Inbox page/inboxPage';
import AccountSection from '../components/Settings page/Account/accountSection';
import InstallationSection from '../components/Settings page/Installation/installationSection';
import SettingsPage from '../components/Settings page/settingsPage';
import VisitorPage from '../components/Visitors page/visitorPage';
import NavBar from '../components/Navbar/navbar';
import NotificationPage from '../components/Notification Page/notificationPage';
import ChatRoomPage from '../components/Inbox page/Chat room/chatroomPage';
import ProtectedRoutes from '../context/ProtectedRoutes';

function App() {

  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/navbar/*" element={<NavBar />}>
            <Route path="inbox" element={<InboxPage />}/> 
            <Route path="chatroom" element={<ChatRoomPage />} />
            <Route path="setting" element={<SettingsPage />}/>
            <Route path="account" element={<AccountSection />} />
            <Route path="installation" element={<InstallationSection />} />
            <Route path="visitors" element={<VisitorPage />} />
            <Route path="notifications" element={<NotificationPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App
