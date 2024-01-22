import { useState } from "react";
import { PasswordUpdateAuthentication } from "../../utils/manageAuth";

import { ModalState } from "../../app/service/modals/modals.context";

const PasswordAuthModal = () => {
  // import context data
  const {
    setPasswordAuthModalOpen,
    is_passwordauth_modal_open,
    setModalOpen,
    setModalMsg,
    setModalErrorMode,
  } = ModalState();

  const [seePassword, setSeePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error_mode, setErrorMode] = useState(false);

  const PasswordAuthCancel = () => {
    setErrorMode(false);
    setEmail("");
    setPassword("");
    setPasswordAuthModalOpen(false);
  };

  const PasswordAuth = async () => {
    const re_auth = await PasswordUpdateAuthentication(email, password);
    switch (re_auth.error) {
      case true:
        setErrorMode(true);
        setModalErrorMode(true);
        setModalOpen(true);
        setModalMsg(re_auth.message);
        setEmail("");
        setPassword("");
        break;
      case false:
        setErrorMode(false);
        setModalErrorMode(false);
        setModalOpen(true);
        setModalMsg(re_auth.message);
        setPasswordAuthModalOpen(false);
        setEmail("");
        setPassword("");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div
        className={`${
          is_passwordauth_modal_open ? "absolute" : "hidden"
        } z-50 left-0 right-0 w-full h-full flex flex-row justify-center items-center bg-black bg-opacity-20`}
      >
        <div
          className={`w-[90%] md:w-[70%] lg:w-[28%] flex flex-col justify-center items-center text-center p-2 rounded-lg bg-white shadow-lg border-[1px] text-[#A881D4] ${
            error_mode
              ? "shadow-[#E94E77] border-[#E94E77]"
              : "shadow-[#A881D4] border-[#6C2E9C]"
          }`}
        >
          <h3 className="text-2xl my-2">
            Authenticate to update your password
          </h3>
          <form className="flex flex-col justify-center items-center w-full">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-80 p-2 my-2 outline-none border-[#6C2E9C] border-[1px] rounded-2xl shadow-custom-shadow-input"
            />
            <div className="relative w-full md:w-80 flex flex-row justify-center items-center p-1">
              <input
                type={`${seePassword ? "text" : "password"}`}
                name="password"
                placeholder="Password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="relative w-80 p-2 my-2 outline-none border-[#6C2E9C] border-[1px] rounded-2xl shadow-custom-shadow-input"
              />
              <i
                onClick={() => setSeePassword((seePassword) => !seePassword)}
                className={`absolute right-10 fa-light fa-eye${
                  seePassword ? "" : "-slash"
                } cursor-pointer`}
              ></i>
            </div>
          </form>
          <button
            type="button"
            onClick={PasswordAuth}
            className="w-[35%] p-2 my-1 text-lg lg:text-md text-white bg-[#6C2E9C] rounded-xl active:scale-[0.90] duration-200 ease-in-out"
          >
            Authenticate
          </button>
          <button
            type="button"
            onClick={PasswordAuthCancel}
            className="w-[35%] p-1 m-1 text-lg lg:text-md text-[#E94E77] bg-white border-[#E94E77] border-[1px] rounded-xl active:scale-[0.90] duration-200 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default PasswordAuthModal;
