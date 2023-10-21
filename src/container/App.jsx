import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import RegisterPage from '../components/Register/register';
import LogInPage from '../components/Login/login';
import InboxPage from '../components/Inbox page/inboxPage';
import AccountSection from '../components/Settings page/Account/accountSection';
import InstallationSection from '../components/Settings page/Installation/installationSection';
import CustomizationSection from '../components/Settings page/widget_style/widgetStylingSection';
import AnalyticsSection from '../components/Analytics/analyticsSection';
import ChatRoomStylingSection from '../components/Settings page/chatroom_style/chatroomStyling';
import SettingsPage from '../components/Settings page/settingsPage';
import VisitorPage from '../components/Visitors page/visitorPage';
import NavBar from '../components/Navbar/navbar';
import ChatRoomPage from '../components/Inbox page/Chat room/chatroomPage';
import { AuthContextProvider } from '../context/AuthContext';
import ProtectedRoutes from '../context/ProtectedRoutes';
import Modal from '../context/Modals/Modal';
import DeleteModal from '../context/Modals/DeleteModal';
import PasswordAuthModal from '../context/Modals/PasswordAuthModal';
import ResetAndVerifyPage from '../components/Reset&Verify/resetVerifypage';
import VerifyandResetResultPage from '../components/Reset&Verify/Result/resultPage';
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
            <Route path="analytics" element={<AnalyticsSection />} />
            <Route path="widget_customization" element={<CustomizationSection />} />
            <Route path="chatroom_customization" element={<ChatRoomStylingSection />} />
          </Route>
          <Route path="/reset-verify" element={<ResetAndVerifyPage />} />
          <Route path="/verify-reset-result" element={<VerifyandResetResultPage />}/>
          <Route path="/forgot-password-form" element={<ForgotPasswordForm />}/>
        </Routes>
      </AnimatePresence>
    </AuthContextProvider>
    </>
  );
}

export default App
