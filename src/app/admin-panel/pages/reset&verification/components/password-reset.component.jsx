import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";

import { FirebaseErrorhandler } from "../../../../../utils/manageAuth";

const PasswordResetComponent = ({ active, auth, oobCode }) => {
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;

  const [ui_state, setUIstate] = useState({
    new_password: "",
    confirm_password: "",
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    whitespace: false,
  });

  const InputChange = (name, value) => {
    setUIstate((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const ChangePassword = async (e) => {
    e.preventDefault();
    // compare both new + confirm password if they're the same
    if (
      ui_state.new_password.toString() === ui_state.confirm_password.toString()
    ) {
      // if every conditions are true with checkPassword() + test with Regex and sanitize the input
      if (
        ui_state.length &&
        ui_state.uppercase &&
        ui_state.lowercase &&
        ui_state.number &&
        ui_state.specialChar &&
        ui_state.whitespace &&
        passwordRegex.test(ui_state.new_password)
      ) {
        // update the password with the new one
        confirmPasswordReset(auth, oobCode, ui_state.new_password)
          .then(() => {
            navigate("/verify-reset-result", {
              state: { password_updated: true },
            });
          })
          .catch((error) => {
            navigate("/verify-reset-result", {
              state: { password_updated: false },
            });
            const error_message = FirebaseErrorhandler(error.code);
            setModalErrorMode(true);
            setModalOpen(true);
            setModalMsg(`ERROR: ${error_message}`);
          });
      }
    } else {
      setModalErrorMode(true);
      setModalOpen(true);
      setModalMsg("ERROR: Passwords do not match...");
    }
  };

  const CheckPassword = (password) => {
    setUIstate((prevValue) => ({
      ...prevValue,
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
      whitespace: !/\s/.test(password),
    }));
  };

  useEffect(() => {
    CheckPassword(ui_state.new_password);
  }, [ui_state.new_password]);

  return (
    <>
      <form
        onSubmit={ChangePassword}
        className={`${
          active ? "" : "hidden"
        } lg:w-[70%] w-80 p-2 flex flex-col justify-center items-center border-[1px] border-[#6C2E9C] bg-white lg:bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-lg shadow-[#A881D4] rounded-xl`}
      >
        <div className="w-full flex justify-center m-4">
          <h1 className="text-center text-2xl text-[#A881D4] font-light lg:text-4xl">
            Update your password
          </h1>
        </div>
        <div className="w-full flex justify-center m-4 lg:m-8">
          <input
            type="text"
            placeholder="New password"
            onChange={(e) => InputChange("new_password", e.target.value)}
            className="p-1 lg:p-3 pl-2 border-[1px] border-[#6C2E9C] w-5/6 bg-white bg-opacity-10 rounded-2xl backdrop-filter backdrop-blur-sm shadow-custom-shadow-input outline-none lg:text-lg"
          />
        </div>
        <div className="w-full flex justify-center m-4 lg:m-8">
          <input
            type="text"
            placeholder="Confirm password"
            onChange={(e) => InputChange("confirm_password", e.target.value)}
            className="p-1 lg:p-3 pl-2 border-[1px] border-[#6C2E9C] w-5/6 bg-white bg-opacity-10 rounded-2xl backdrop-filter backdrop-blur-sm shadow-custom-shadow-input outline-none lg:text-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-[#6C2E9C] p-1 text-white font-light rounded-lg w-[30%] text-center m-3 lg:p-2 lg:text-xl"
        >
          Change
        </button>
        <div className="my-2 h-5 w-[70%] lg:w-80 border-t-2 opacity-30 border-[#A881D4]"></div>
        <ul className="p-2">
          <li
            className={`my-[0.2em] ${
              ui_state.length ? "text-[#A881D4]" : "text-[#E94E77]"
            }`}
          >
            - The password must be at least 8 characters long.
          </li>
          <li
            className={`my-[0.2em] ${
              ui_state.uppercase ? "text-[#A881D4]" : "text-[#E94E77]"
            }`}
          >
            - It must contain at least one uppercase letter.
          </li>
          <li
            className={`my-[0.2em] ${
              ui_state.lowercase ? "text-[#A881D4]" : "text-[#E94E77]"
            }`}
          >
            - It must contain at least one lowercase letter.
          </li>
          <li
            className={`my-[0.2em] ${
              ui_state.number ? "text-[#A881D4]" : "text-[#E94E77]"
            }`}
          >
            - It must contain at least one number.
          </li>
          <li
            className={`my-[0.2em] ${
              ui_state.specialChar ? "text-[#A881D4]" : "text-[#E94E77]"
            }`}
          >
            - It must contain at least one special character (e.g., !, @, #, $,
            %, ^, &, *).
          </li>
          <li
            className={`my-[0.2em] ${
              ui_state.whitespace ? "text-[#A881D4]" : "text-[#E94E77]"
            }`}
          >
            - It must not contain any whitespace characters.
          </li>
        </ul>
      </form>
    </>
  );
};

export default PasswordResetComponent;
