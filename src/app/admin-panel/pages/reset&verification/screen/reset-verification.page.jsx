import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getAuth, checkActionCode } from "firebase/auth";
import { FirebaseErrorhandler } from "../../../../../utils/manageAuth";

import EmailVerificationComponent from "../components/email-verification.component";
import PasswordResetComponent from "../components/password-reset.component";

import { ModalState } from "../../../../service/modals/modals.context";

const ResetAndVerifyPage = () => {
  const auth = getAuth();

  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get("oobCode");
  const mode = urlParams.get("mode");

  const { setModalOpen, setModalErrorMode, setModalMsg } = ModalState();

  const [isOobCodeValid, setOobCodeValid] = useState(false);
  const [page_version, setPageVersion] = useState({
    email_verification: false,
    password_reset: false,
  });

  useEffect(() => {
    if (oobCode) {
      checkActionCode(auth, oobCode)
        .then(() => {
          setOobCodeValid(true);
        })
        .catch((err) => {
          const error_message = FirebaseErrorhandler(err.code);
          setModalErrorMode(true);
          setModalOpen(true);
          setModalMsg(`ERROR: ${error_message}`);
          setOobCodeValid(false);
        });
    }
  }, [oobCode]);

  useEffect(() => {
    if (mode) {
      switch (mode) {
        case "resetPassword":
          setPageVersion((prevValue) => ({
            ...prevValue,
            password_reset: true,
          }));
          break;
        case "verifyEmail":
          setPageVersion((prevValue) => ({
            ...prevValue,
            email_verification: true,
          }));
          break;
        default:
          break;
      }
    }
  }, [mode]);

  return (
    <>
      <motion.div
        className="w-full h-full flex lg:flex-col justify-center items-center bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <div className="absolute top-5 left-10 rounded-xl lg:hidden">
          <div className="w-[100px] h-[100px] bg-[#6C2E9C] rounded-full"></div>
        </div>
        <div className="hidden lg:block absolute top-0 left-10">
          <img
            src="https://ik.imagekit.io/bqofr3ncj/tr:w-150/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_5_wv9ifc.png?updatedAt=1704919570304"
            width="150"
            height="150"
            alt="canva image"
          />
        </div>
        <div className="hidden lg:block absolute top-20 right-20">
          <img
            src="https://ik.imagekit.io/bqofr3ncj/tr:w-500/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_9_pkfjm8.png?updatedAt=1704919570843"
            width="150"
            height="150"
            alt="canva image"
            className="rounded-xl"
          />
        </div>
        <div className="hidden lg:block absolute top-80 left-80">
          <div className="w-[50px] h-[50px] bg-[#6C2E9C] rounded-full"></div>
        </div>
        <div className="lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:items-center">
          {isOobCodeValid ? (
            <>
              <PasswordResetComponent
                active={page_version.password_reset}
                auth={auth}
                oobCode={oobCode}
              />

              <EmailVerificationComponent
                active={page_version.email_verification}
                auth={auth}
                oobCode={oobCode}
              />
            </>
          ) : (
            <>
              <div className="w-full text-center">
                <h2 className="text-xl text-red-500">
                  Session has expired please send a new request
                </h2>
              </div>
            </>
          )}
        </div>
        <div className="hidden lg:block absolute bottom-80 right-80">
          <div className="w-[100px] h-[100px] bg-[#6C2E9C] rounded-full"></div>
        </div>
        <div className="hidden lg:block absolute bottom-20 left-20">
          <img
            src="https://ik.imagekit.io/bqofr3ncj/tr:w-150/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_16_mfgnnp.png?updatedAt=1704919570192"
            width="150"
            height="150"
            alt="canva image"
            className="rounded-xl"
          />
        </div>
        <div className="absolute bottom-[5%] right-20 lg:hidden">
          <div className="w-[50px] h-[50px] bg-[#6C2E9C] rounded-full"></div>
        </div>
      </motion.div>
    </>
  );
};

export default ResetAndVerifyPage;
