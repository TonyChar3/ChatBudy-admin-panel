import './App.css'
import { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthContextProvider } from '../context/AuthContext';
import ProtectedRoutes from '../context/ProtectedRoutes';
/**
 * Admin panel components
 */
const RegisterPage = lazy(() => import('../Admin_panel/components/Register/register'));
const LogInPage = lazy(() => import('../Admin_panel/components/Login/login'));
const InboxPage = lazy(() => import('../Admin_panel/components/Inbox page/inboxPage'));
const AccountSection = lazy(() => import('../Admin_panel/components/Settings page/Account/accountSection'));
const InstallationSection = lazy(() => import('../Admin_panel/components/Settings page/Installation/installationSection'));
const CustomizationSection = lazy(() => import('../Admin_panel/components/Settings page/widget_style/widgetStylingSection'));
const AnalyticsSection = lazy(() => import('../Admin_panel/components/Analytics/analyticsSection'));
const ChatRoomStylingSection = lazy(() => import('../Admin_panel/components/Settings page/chatroom_style/chatroomStyling'));
const SettingsPage = lazy(() => import('../Admin_panel/components/Settings page/settingsPage'));
const VisitorPage = lazy(() => import('../Admin_panel/components/Visitors page/visitorPage'));
const NavBar = lazy(() => import('../Admin_panel/components/Navbar/navbar'));
const ChatRoomPage = lazy(() => import('../Admin_panel/components/Inbox page/Chat room/chatroomPage'));
const Modal = lazy(() => import('../context/Modals/Modal'));
const DeleteModal = lazy(() => import('../context/Modals/DeleteModal'));
const PasswordAuthModal = lazy(() => import('../context/Modals/PasswordAuthModal'));
const ResetAndVerifyPage = lazy(() => import('../Admin_panel/components/Reset&Verify/resetVerifypage'));
const VerifyandResetResultPage = lazy(() => import('../Admin_panel/components/Reset&Verify/Result/resultPage'));
const ForgotPasswordForm = lazy(() => import('../Admin_panel/components/Login/Forgot_password/forgotPasswordForm'));
const SpinningLoaderPage = lazy(() => import('../context/Loader/Register_loading/spinningLoader'));
const NotFoundPage = lazy(() => import('../Admin_panel/components/Not Found/notFoundPage'));
const PlanPickerPage = lazy(() => import('../Admin_panel/components/Register/plan picking/planPicker'))
const PlanSelectionPage = lazy(() => import('../Admin_panel/components/Subscriptions plan/planSelectionPage'));
/**
 * Website Components
 */
const WebsiteHomePage = lazy(() => import('../Website/components/Home_page/websiteHomePage'));
const WebSiteNavbar = lazy(() => import('../Website/components/Navbar/websiteNavbar'));
const WebsiteTermsConditionsPage = lazy(() => import('../Website/components/Terms&Conditions/websiteTermsConditionsPage'));
const WebsitePricingPage = lazy(() => import('../Website/components/Pricing_page/websitePricingPage'));
const ScrollToTop =lazy(() => import('./scroll/scrollToTop'));

function App() {

  const location = useLocation();

  return (
    <>
    <AuthContextProvider>
      {/* Modals */}
      <PasswordAuthModal />
      <DeleteModal />
      <Modal/>
      {/* Loading Animation page */}
      <SpinningLoaderPage />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/** Website Routes */}
          <Route path="/" element={<><ScrollToTop/><WebSiteNavbar /></>}>
            <Route index element={<WebsiteHomePage />} />
            <Route path="pricing" element={<WebsitePricingPage />} />
            <Route path="terms_conditions" element={<WebsiteTermsConditionsPage />} />
          </Route>
          {/** Admin panel routes */}
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/plan-picking" element={<PlanPickerPage />} />
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
            <Route path="plan_selection" element={<PlanSelectionPage />} />
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
