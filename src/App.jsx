import "./styles/App.css";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { AuthContextProvider } from "./app/service/authentication/authentication.context";
import { ModalsStateContextProvider } from "./app/service/modals/modals.context";
import { DataContextProvider } from "./app/service/data/app-data.context";
import { AppStateContextProvider } from "./app/service/app-state/app-state.context";

import ProtectedRoutes from "./app/service/authentication/protected-routes";
import SettingsSection from "./app/admin-panel/pages/settings/screen/settings.page";
import VisitorSection from "./app/admin-panel/pages/visitor/screen/visitor.page";
import InboxSection from "./app/admin-panel/pages/inbox-chat/screen/inbox.page";
import AnalyticsSection from "./app/admin-panel/pages/analytics/screen/analytics.page";

import NavBar from "./app/admin-panel/components/navbar.component";

/**
 *
 * Admin panel components
 */
const RegisterPage = lazy(() =>
  import("./app/admin-panel/pages/register/screen/register.page")
);
const LogInPage = lazy(() =>
  import("./app/admin-panel/pages/login/screen/login.page")
);
const AccountSection = lazy(() =>
  import("./app/admin-panel/pages/settings/screen/account/account.page")
);
const InstallationSection = lazy(() =>
  import(
    "./app/admin-panel/pages/settings/screen/installation/installation.page"
  )
);
const WidgetCustomizationSection = lazy(() =>
  import(
    "./app/admin-panel/pages/settings/screen/widget-settings/widget-settings.page"
  )
);
const ChatRoomCustomizationSection = lazy(() =>
  import(
    "./app/admin-panel/pages/settings/screen/chatroom-settings/chatroom-settings.page"
  )
);
const ChatRoomPage = lazy(() =>
  import("./app/admin-panel/pages/inbox-chat/screen/chatroom.page")
);
const Modal = lazy(() => import("./components/Modals/Modal"));
const DeleteModal = lazy(() => import("./components/Modals/DeleteModal"));
const PasswordAuthModal = lazy(() =>
  import("./components/Modals/PasswordAuthModal")
);
const ResetAndVerifyPage = lazy(() =>
  import(
    "./app/admin-panel/pages/reset&verification/screen/reset-verification.page"
  )
);
const VerifyandResetResultPage = lazy(() =>
  import("./app/admin-panel/pages/reset&verification/screen/result.page")
);
const ForgotPasswordForm = lazy(() =>
  import("./app/admin-panel/pages/login/screen/forgot-password.page")
);
const SpinningLoaderPage = lazy(() =>
  import("./components/Loader/Register_loading/spinningLoader")
);
const NotFoundPage = lazy(() => import("./app/Error/notFoundPage"));
const PlanPickerPage = lazy(() =>
  import("./app/admin-panel/pages/register/components/plan-picking.component")
);
const PlanSelectionPage = lazy(() =>
  import("./app/admin-panel/pages/subscription/screen/plan-selection.page")
);

function App() {
  const location = useLocation();

  return (
    <>
      <ModalsStateContextProvider>
        <AuthContextProvider>
          <DataContextProvider>
            <AppStateContextProvider>
              {/* Modals */}
              <PasswordAuthModal />
              <DeleteModal />
              <Modal />
              {/* Loading Animation page */}
              <SpinningLoaderPage />
              <AnimatePresence mode="wait">
                <Suspense fallback={<SpinningLoaderPage />}>
                  <Routes location={location} key={location.pathname}>
                    {/** Admin panel routes */}
                    <Route path="/" element={<LogInPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/plan-picking" element={<PlanPickerPage />} />
                    <Route
                      path="/navbar/*"
                      element={
                        <ProtectedRoutes>
                          <NavBar />
                        </ProtectedRoutes>
                      }
                    >
                      <Route path="inbox" element={<InboxSection />} />
                      <Route path="chatroom" element={<ChatRoomPage />} />
                      <Route path="setting" element={<SettingsSection />} />
                      <Route path="account" element={<AccountSection />} />
                      <Route
                        path="installation"
                        element={<InstallationSection />}
                      />
                      <Route path="visitors" element={<VisitorSection />} />
                      <Route path="analytics" element={<AnalyticsSection />} />
                      <Route
                        path="widget_customization"
                        element={<WidgetCustomizationSection />}
                      />
                      <Route
                        path="chatroom_customization"
                        element={<ChatRoomCustomizationSection />}
                      />
                      <Route
                        path="plan_selection"
                        element={<PlanSelectionPage />}
                      />
                      <Route path="*" element={<NotFoundPage />} />
                    </Route>
                    <Route
                      path="/reset-verify"
                      element={<ResetAndVerifyPage />}
                    />
                    <Route
                      path="/verify-reset-result"
                      element={<VerifyandResetResultPage />}
                    />
                    <Route
                      path="/forgot-password-form"
                      element={<ForgotPasswordForm />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </AnimatePresence>
            </AppStateContextProvider>
          </DataContextProvider>
        </AuthContextProvider>
      </ModalsStateContextProvider>
    </>
  );
}

export default App;
