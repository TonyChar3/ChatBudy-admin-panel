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
import ChatRoomPage from '../components/Inbox page/Chat room/chatroomPage';
import { AuthContextProvider } from '../context/AuthContext';
import ProtectedRoutes from '../context/ProtectedRoutes';
import Modal from '../context/Modals/Modal';
import DeleteModal from '../context/Modals/DeleteModal';
import PasswordAuthModal from '../context/Modals/PasswordAuthModal';
import PasswordUpdate from '../components/Settings page/Account/Password_update/passwordUpate';
import PasswordUpdateResultPage from '../components/Settings page/Account/Password_update/resultPage';
import ForgotPasswordForm from '../components/Login/Forgot_password/forgotPasswordForm';
import SpinningLoaderPage from '../context/Loader/spinningLoader';

function App() {

  const location = useLocation();

  return (
    <>
    <AuthContextProvider>
      <PasswordAuthModal />
      <DeleteModal />
      <Modal/>
      <SpinningLoaderPage />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/navbar/*" element={<ProtectedRoutes><NavBar /></ProtectedRoutes>}>
            <Route path="inbox" element={<InboxPage />}/> 
            <Route path="chatroom" element={<ChatRoomPage />} />
            <Route path="setting" element={<SettingsPage />}/>
            <Route path="account" element={<AccountSection />} />
            <Route path="installation" element={<InstallationSection />} />
            <Route path="visitors" element={<VisitorPage />} />
          </Route>
          <Route path="/update-password" element={<PasswordUpdate />} />
          <Route path="/password-update-result" element={<PasswordUpdateResultPage />}/>
          <Route path="/forgot-password-form" element={<ForgotPasswordForm />}/>
        </Routes>
      </AnimatePresence>
    </AuthContextProvider>
    </>
  );
}

export default App
