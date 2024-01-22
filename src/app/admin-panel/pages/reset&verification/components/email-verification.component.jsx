import { useNavigate } from "react-router-dom";
import { applyActionCode } from "firebase/auth";

import { FirebaseErrorhandler } from "../../../../../utils/manageAuth";

const EmailVerificationComponent = ({ active, auth, oobCode }) => {
  const navigate = useNavigate();

  const EmailVerification = () => {
    applyActionCode(auth, oobCode)
      .then(() => {
        navigate("/verify-reset-result", { state: { email_verified: true } });
      })
      .catch((error) => {
        navigate("/verify-reset-result", { state: { email_verified: false } });
        const error_message = FirebaseErrorhandler(error.code);
        setModalErrorMode(true);
        setModalOpen(true);
        setModalMsg(`ERROR: ${error_message}`);
      });
  };

  return (
    <>
      <div
        className={`${
          active ? "" : "hidden"
        } lg:w-1/2 w-80 p-2 flex flex-col justify-center items-center border-[1px] border-[#6C2E9C] bg-white lg:bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-lg shadow-[#A881D4] rounded-xl`}
      >
        <div className="w-full flex justify-center m-4">
          <button
            onClick={EmailVerification}
            className="bg-[#6C2E9C] p-1 text-white font-light rounded-lg w-[50%] text-center m-3 lg:p-2 lg:text-xl"
          >
            Verify your email
          </button>
        </div>
      </div>
    </>
  );
};

export default EmailVerificationComponent;
