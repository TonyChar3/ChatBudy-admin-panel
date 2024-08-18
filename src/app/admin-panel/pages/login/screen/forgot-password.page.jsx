import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import {
  verifyRateLimit,
  FirebaseErrorhandler,
} from "../../../../../utils/manageAuth";
import { sanitizeInputValue } from "../../../../../utils/security";

import { ModalState } from "../../../../service/modals/modals.context";

const ForgotPasswordForm = () => {
  const auth = getAuth();

  const { setModalMsg, setModalOpen, setModalErrorMode } = ModalState();

  const [ui_state, setUIstate] = useState({
    email: "",
    reset_btn_disabled: false,
    reset_btn_content: "Reset",
    block_request: false,
    request_number_count: 0,
    error_mode: false,
  });

  const SendPasswordResetEmail = async (e) => {
    e.preventDefault();
    // sanitize the email
    const sanitize_email = sanitizeInputValue(ui_state.email);
    if (ui_state.email === "" || !sanitize_email || sanitize_email === "") {
      setModalOpen(true);
      setModalErrorMode(true);
      setModalMsg("Please enter a valid email address");
      return;
    }
    // if its allowed
    const verify_rate_limit = await verifyRateLimit(
      sanitize_email,
      ui_state.request_number_count
    );
    if (!verify_rate_limit.data.request_allowed) {
      setUIstate((prevValue) => ({
        ...prevValue,
        reset_btn_disabled: true,
        error_mode: true,
      }));
      setModalOpen(true);
      setModalErrorMode(true);
      setModalMsg("Wait 30 minutes... be sure to check your junk");
      return;
    }
    // send the password reset email
    sendPasswordResetEmail(auth, sanitize_email)
      .then(() => {
        // inform the user that it was sent
        setUIstate((prevValue) => ({
          ...prevValue,
          reset_btn_disabled: true,
          reset_btn_content: "re-send",
          request_number_count: prevValue.request_number_count + 1,
          error_mode: false,
        }));
        // modal message
        setModalErrorMode(false);
        setModalOpen(true);
        setModalMsg("Email sent");
      })
      .catch((error) => {
        const error_message = FirebaseErrorhandler(error.code);
        setUIstate((prevValue) => ({
          ...prevValue,
          error_mode: true,
        }));
        setModalOpen(true);
        setModalErrorMode(true);
        setModalMsg(
          `ERROR: ${
            error_message ||
            "Unable to send an email. Please try again or contact support."
          }`
        );
      });
  };

  useEffect(() => {
    if (ui_state.reset_btn_disabled) {
      const timeout = setTimeout(() => {
        setUIstate((prevValue) => ({
          ...prevValue,
          reset_btn_disabled: false,
        }));
      }, [5000]);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [ui_state.reset_btn_disabled]);

  useEffect(() => {
    if (ui_state.block_request) {
      const timeout = setTimeout(() => {
        setUIstate((prevValue) => ({
          ...prevValue,
          block_request: false,
        }));
      }, [5000]);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [ui_state.block_request]);

  return (
    <>
      <motion.div
        className="w-screen h-screen flex lg:flex-row justify-center items-center bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <div className="absolute w-[61px] h-[61px] top-[13%] left-10 lg:top-80 lg:left-80 bg-[#6C2E9C] rounded-full"></div>
        <div className="lg:block absolute lg:top-4 lg:left-10 top-5 right-3">
          <img
            src="https://ik.imagekit.io/bqofr3ncj/tr:w-150/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_5_wv9ifc.png?updatedAt=1704919570304"
            width="150"
            height="150"
            alt="salezy logo"
          />
        </div>
        <div className="hidden lg:block absolute top-20 right-20">
          <img
            src="https://ik.imagekit.io/bqofr3ncj/tr:w-150/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_9_pkfjm8.png?updatedAt=1704919570843"
            width="150"
            height="150"
            alt="canva image"
            className="rounded-xl"
          />
        </div>
        <div className="lg:w-1/2 lg:flex lg:flex-row lg:justify-center">
          <form
            onSubmit={SendPasswordResetEmail}
            className={`w-full md:w-96 p-2 flex flex-col justify-center items-center`}
          >
            <div className="w-full flex flex-col justify-center m-4">
              <h1 className="text-center text-3xl text-[#A881D4] font-light md:text-4xl lg:text-5xl">
                Enter your email
              </h1>
              <div className="w-full p-1 mt-2 text-center text-red-500">
                <i className="fa-light fa-circle-info mx-2 text-sm"></i>
                <span className="text-sm">
                  You should receive a password reset email shortly
                </span>
              </div>
            </div>
            <div className="w-[75%] flex justify-center mb-6 md:mb-7 lg:mb-8">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => {
                  setUIstate((prevValue) => ({
                    ...prevValue,
                    email: e.target.value,
                  }));
                }}
                className="p-2 md:p-3 lg:p-3 pl-2 border-[1px] border-[#6C2E9C] w-5/6 shadow-custom-shadow-input outline-none md:text-lg lg:text-lg rounded-xl"
              />
            </div>
            <button
              type="submit"
              disabled={ui_state.reset_btn_disabled || ui_state.block_request}
              className={`
                            ${
                              ui_state.reset_btn_disabled ||
                              ui_state.block_request
                                ? "bg-gray-300"
                                : "bg-[#6C2E9C]"
                            } 
                            p-1 text-white font-light rounded-lg w-[30%] text-center mb-3 md:p-2 md:text-xl lg:p-2 lg:text-xl`}
            >
              {ui_state.reset_btn_content}
            </button>
            <Link
              to="/"
              className="mt-2 underline text-lg text-[#A881D4] font-light"
            >
              Cancel
            </Link>
          </form>
        </div>
        <div className="hidden lg:block absolute w-[71px] h-[71px] bottom-[5%] bottom-[10%] right-[10%] bg-[#6C2E9C] rounded-full"></div>
        <div className="absolute w-[91px] h-[91px] bottom-[14%] left-6 lg:left-auto lg:bottom-80 lg:right-80 bg-[#6C2E9C] rounded-full"></div>
        <div className="absolute w-[51px] h-[51px] bottom-[4%] right-6 lg:right-auto lg:left-6 lg:bottom-[15%] bg-[#6C2E9C] rounded-full"></div>
      </motion.div>
    </>
  );
};

export default ForgotPasswordForm;
