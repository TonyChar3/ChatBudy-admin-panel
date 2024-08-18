import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  checkoutPlusPlan,
  updateUserPlan,
} from "../../../../../utils/manageAuth";

import { UserAuth } from "../../../../service/authentication/authentication.context";
import { ModalState } from "../../../../service/modals/modals.context";

const PlanPickerPage = () => {
  const {
    Register,
    setShowLoader,
    setRegisterUser,
    register_user_info,
    login_user_info,
    new_plan_prospect,
    setLoginUserInfo,
    setNewPlanProspect,
  } = UserAuth();

  const { setModalOpen, setModalErrorMode, setModalMsg } = ModalState();

  const auth = getAuth();

  const navigate = useNavigate();

  const [plan_picked, setPlanPicked] = useState("");
  const [plan_picking_state, setPlanPickingState] = useState(null);

  const RegisterUser = async () => {
    try {
      if (plan_picked === "") {
        setModalOpen(true);
        setModalErrorMode(true);
        setModalMsg("Please pick a plan");
        return;
      }
      if (register_user_info === null) {
        setModalOpen(true);
        setModalErrorMode(true);
        setModalMsg(
          "Please enter register or log in again, you need your credentials set up again :("
        );
        navigate("/navbar/visitors");
        return;
      }
      // after success
      setShowLoader(true);
      setRegisterUser(true);
      if (plan_picked === "plus") {
        // create firebase user
        const create = await createUserWithEmailAndPassword(
          auth,
          register_user_info.email,
          register_user_info.password
        ); // Firebase auth profile
        if (create) {
          await updateProfile(auth.currentUser, {
            displayName: register_user_info.user_name,
          });
          await checkoutPlusPlan("new_client", auth.currentUser.accessToken, {
            ...register_user_info,
            password: "none",
            plan: plan_picked,
          });
          setNewPlanProspect(false);
        }
      } else if (plan_picked === "standard") {
        // register the user
        const register = await Register("standard");
        if (register) {
          setShowLoader(false);
          navigate("/navbar/visitors");
        }
      }
    } catch (err) {
      // -
    }
  };

  const SignedInUser = async () => {
    try {
      if (plan_picked === "") {
        setModalOpen(true);
        setModalErrorMode(true);
        setModalMsg("Please pick a plan");
        return;
      }
      if (!new_plan_prospect || login_user_info === null) {
        setModalOpen(true);
        setModalErrorMode(true);
        setModalMsg(
          "Please enter register or log in again, you need your credentials set up again :("
        );
        setNewPlanProspect(false);
        navigate("/");
        return;
      }
      // login w/ firebase
      const auth_user = await signInWithEmailAndPassword(
        auth,
        login_user_info.email,
        login_user_info.password
      );
      // show the loading animation
      setShowLoader(true);
      // if plan selected is plus +
      if (plan_picked === "plus") {
        //  call a async function that will make a request to change the plan on the DB
        if (auth_user) {
          await checkoutPlusPlan("client", auth.currentUser.accessToken);
          setLoginUserInfo(null);
          setNewPlanProspect(false);
        }
      } else if (plan_picked === "standard") {
        // else if plan selected is standard
        setNewPlanProspect(false);
        // change the plan in the DB to standard
        if (auth_user) {
          const update_plan = await updateUserPlan(
            auth.currentUser.accessToken,
            "standard"
          );
          if (update_plan) {
            await signOut(auth);
            const login = await signInWithEmailAndPassword(
              auth,
              login_user_info.email,
              login_user_info.password
            );
            if (login) {
              setLoginUserInfo(null);
              setShowLoader(false);
              navigate("/navbar/visitors");
            }
          }
        }
      }
    } catch (err) {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    if (register_user_info === null && new_plan_prospect) {
      setPlanPickingState("client");
    } else if (register_user_info !== null && new_plan_prospect) {
      setPlanPickingState("new_client");
    }
  }, []);

  return (
    <>
      <motion.div
        className="relative w-full h-screen flex lg:flex-row justify-center items-center bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <div className="hidden lg:block absolute top-0 left-0 h-[13%] w-[10%] mx-6 my-3 flex flex-row justify-center items-center">
          <img
            src="https://ik.imagekit.io/bqofr3ncj/tr:w-200/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_5_wv9ifc.png?updatedAt=1704919570304"
            alt="main logo chatbudy"
            w="100"
            h="100"
          />
        </div>
        <div className="absolute h-[30%] w-[90%] top-0 left-0 bg-login-mobile-top-left lg:top-0 lg:left-auto lg:h-[50%] lg:w-[30%] lg:right-[0] lg:bg-login-top-right bg-cover"></div>
        <div className="absolute bg-[#6C2E9C] lg:w-[65px] lg:h-[65px] w-[35px] h-[35px] top-20 right-[13%] lg:right-[27%] rounded-full"></div>
        <div className="hidden lg:block absolute bg-[#6C2E9C] w-[51px] h-[51px] top-40 left-[12%] rounded-full"></div>
        <div className="hidden lg:block absolute bg-[#6C2E9C] w-[20px] h-[20px] top-60 left-[17%] rounded-full"></div>
        <div className="w-[80%] h-auto flex flex-col justify-center items-center">
          <div className="w-full text-center my-1 text-[#A881D4]">
            <h2 className="text-4xl font-light md:text-3xl lg:text-5xl">
              Choose your plan
            </h2>
            <h2 className="text-sm p-1">*No card required for the free plan</h2>
          </div>
          <div className="w-full h-auto justify-center justify-center items-center">
            <div
              onClick={() => setPlanPicked("standard")}
              className={`w-[90%] lg:w-[45%] mx-auto mt-2 p-2 lg:p-3 flex flex-row items-center rounded-xl border-2 cursor-pointer active:scale-[0.90] transform-all ease duration-300
                        ${
                          plan_picked.length > 0 && plan_picked === "standard"
                            ? "border-[#6C2E9C] text-[#A881D4]"
                            : plan_picked.length > 0
                            ? "border-[#F5F3EF] text-[#F5F3EF]"
                            : "border-[#6C2E9C] text-[#A881D4]"
                        }`}
            >
              <h3 className="lg:text-xl">Standard</h3>
              <span className="mx-auto lg:text-lg">Free*</span>
              <div
                className={`w-[20px] h-[20px] rounded-full
                            ${
                              plan_picked.length > 0 &&
                              plan_picked === "standard"
                                ? "bg-[#50C878]"
                                : plan_picked.length > 0
                                ? "bg-[#F5F3EF]"
                                : "bg-[#F5F3EF]"
                            }`}
              ></div>
              {/**Circle */}
            </div>
            <div
              onClick={() => setPlanPicked("plus")}
              className={`w-[90%] lg:w-[45%] mx-auto mt-6 lg:mt-8 mb-4 p-2 lg:p-3 flex flex-row items-center rounded-xl border-2 text-[#A881D4] cursor-pointer active:scale-[0.90] transform-all ease duration-300
                        ${
                          plan_picked.length > 0 && plan_picked === "plus"
                            ? "border-[#6C2E9C] text-[#A881D4]"
                            : plan_picked.length > 0
                            ? "border-[#F5F3EF] text-[#F5F3EF]"
                            : "border-[#6C2E9C] text-[#A881D4]"
                        }`}
            >
              <h3 className="lg:text-xl">Plus +</h3>
              <span className="mx-auto lg:text-lg">15$/month</span>
              <div
                className={`w-[20px] h-[20px] rounded-full
                            ${
                              plan_picked.length > 0 && plan_picked === "plus"
                                ? "bg-[#50C878]"
                                : plan_picked.length > 0
                                ? "bg-[#F5F3EF]"
                                : "bg-[#F5F3EF]"
                            }`}
              ></div>
              {/**Circle */}
            </div>
          </div>
          {plan_picking_state === "new_client" ? (
            <>
              <button
                onClick={RegisterUser}
                className="bg-[#6C2E9C] p-2 text-lg text-white font-light rounded-xl w-[30%] lg:w-[10%] text-center mb-3 lg:text-xl"
              >
                Next
              </button>
            </>
          ) : (
            <>
              <button
                onClick={SignedInUser}
                className="bg-[#6C2E9C] p-2 text-lg text-white font-light rounded-xl w-[30%] lg:w-[10%] text-center mb-3 lg:text-xl"
              >
                Next
              </button>
            </>
          )}
        </div>
        <div className="absolute bg-[#6C2E9C] w-[101px] h-[101px] bottom-[8%] right-[-5%] lg:w-[61px] lg:h-[61px] lg:bottom-40 lg:right-[15%] rounded-full"></div>
        <div className="absolute bg-[#6C2E9C] w-[20px] h-[20px] bottom-[16%] right-[50%] lg:bottom-[16%] lg:right-[21%] rounded-full"></div>
        <div className="lg:hidden absolute bg-[#6C2E9C] w-[61px] h-[61px] bottom-[3%] left-[21%] rounded-full"></div>
        <div className="hidden lg:block lg:absolute lg:h-[50%] lg:w-[30%] lg:bottom-0 lg:left-[-2%] lg:bg-login-bottom-left lg:bg-cover z-20"></div>
      </motion.div>
    </>
  );
};

export default PlanPickerPage;
