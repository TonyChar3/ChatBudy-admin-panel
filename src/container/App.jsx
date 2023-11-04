import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import RegisterPage from '../Admin_panel/components/Register/register';
import LogInPage from '../Admin_panel/components/Login/login';
import InboxPage from '../Admin_panel/components/Inbox page/inboxPage';
import AccountSection from '../Admin_panel/components/Settings page/Account/accountSection';
import InstallationSection from '../Admin_panel/components/Settings page/Installation/installationSection';
import CustomizationSection from '../Admin_panel/components/Settings page/widget_style/widgetStylingSection';
import AnalyticsSection from '../Admin_panel/components/Analytics/analyticsSection';
import ChatRoomStylingSection from '../Admin_panel/components/Settings page/chatroom_style/chatroomStyling';
import SettingsPage from '../Admin_panel/components/Settings page/settingsPage';
import VisitorPage from '../Admin_panel/components/Visitors page/visitorPage';
import NavBar from '../Admin_panel/components/Navbar/navbar';
import ChatRoomPage from '../Admin_panel/components/Inbox page/Chat room/chatroomPage';
import { AuthContextProvider } from '../context/AuthContext';
import ProtectedRoutes from '../context/ProtectedRoutes';
import Modal from '../context/Modals/Modal';
import DeleteModal from '../context/Modals/DeleteModal';
import PasswordAuthModal from '../context/Modals/PasswordAuthModal';
import ResetAndVerifyPage from '../Admin_panel/components/Reset&Verify/resetVerifypage';
import VerifyandResetResultPage from '../Admin_panel/components/Reset&Verify/Result/resultPage';
import ForgotPasswordForm from '../Admin_panel/components/Login/Forgot_password/forgotPasswordForm';
import SpinningLoaderPage from '../context/Loader/Register_loading/spinningLoader';
import NotFoundPage from '../Admin_panel/components/Not Found/notFoundPage';

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
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/reset-verify" element={<ResetAndVerifyPage />} />
          <Route path="/verify-reset-result" element={<VerifyandResetResultPage />}/>
          <Route path="/forgot-password-form" element={<ForgotPasswordForm />}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </AuthContextProvider>
    </>
  );
}

export default App
