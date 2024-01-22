import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseErrorhandler } from "../../../utils/manageAuth";
import { requestUserRegister } from "./authentication.service";

import { ModalState } from "../modals/modals.context";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { setModalErrorMode, setModalOpen, setModalMsg } = ModalState();
  const auth = getAuth();

  const navigate = useNavigate();

  const [user, setUser] = useState({}); // authentication
  const [user_register, setRegisterUser] = useState(false); // authentication
  const [user_hash, setHash] = useState(""); // authentication
  const [show_loader, setShowLoader] = useState(false); // authentication
  const [register_user_info, setRegisterUserInfo] = useState(null); // authentication
  const [login_user_info, setLoginUserInfo] = useState(null); // authentication
  const [new_plan_prospect, setNewPlanProspect] = useState(false); // authentication
  const [user_current_plan, setUserCurrentPlan] = useState(null); // authentication

  const Register = async (plan) => {
    try {
      // Force the closing of the modal + make sure error mode is off
      setModalOpen(false);
      // create firebase user
      const create = await createUserWithEmailAndPassword(
        auth,
        register_user_info.email,
        register_user_info.password
      ); // Firebase auth profile
      if (create) {
        // create the user in the mongoDB
        const register = await requestUserRegister(
          auth,
          register_user_info.website_url,
          register_user_info.user_name,
          plan
        );
        if (register) {
          // welcome message
          setRegisterUser(false);
          setModalErrorMode(false);
          setModalMsg(`Welcome to chat buddy :)`);
          setModalOpen(true);
        } else if (register.error) {
          throw new Error();
        }
      }
      // set the current logged in user
      setUser(auth.currentUser);
      setRegisterUserInfo(null);
      return true;
    } catch (err) {
      const error_message = FirebaseErrorhandler(err.code);
      console.log(
        `ERROR (${err.response.status}) '${
          err.response.data.err || err.response.data.title
        }', ${
          err.response.data.err || err.response.data.message || error_message
        }`
      );
      setRegisterUser(true);
      setShowLoader(false);
      setModalOpen(true);
      setModalErrorMode(true);
      setModalMsg(`ERROR (${err.response.status}) 
            '${
              err.response.data.err ||
              err.response.data.message ||
              error_message
            }': 
            Unable to disconnect log out the account, please try again or contact support.
            `);
      if (auth.currentUser) {
        deleteUser(auth.currentUser.accessToken);
      }
      navigate("/register");
      return false;
    }
  };

  const Login = async (email, password) => {
    try {
      // make sure the modal is closed down
      setModalOpen(false);
      // login using firebase
      await signInWithEmailAndPassword(auth, email, password);
      // set everything up for the user
      setUser(auth.currentUser);
      setModalErrorMode(false);
      // Welcome him
      setModalMsg(`Welcome back  👋`);
      setModalOpen(true);
      navigate("/navbar/visitors");
      return true;
    } catch (err) {
      setShowLoader(false);
      const error_message = FirebaseErrorhandler(err.code);
      console.log(`ERROR '${err.code}', ${err}`);
      setModalOpen(true);
      setModalErrorMode(true);
      setModalMsg(`ERROR: 
            '${error_message}'
            `);
    }
  };

  const LogOut = async () => {
    try {
      // Sign out with Firebase
      await signOut(auth);
      // reset the current user object
      setUser({});
      // navigate back to the Login page
      navigate("/login");
    } catch (err) {
      const error_message = FirebaseErrorhandler(err.code);
      console.log(`ERROR '${err.code}', ${err}`);
      setModalOpen(true);
      setModalErrorMode(true);
      setModalMsg(`ERROR: 
            '${error_message}'
            `);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (!user) {
        setUser(null);
      }
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <UserContext.Provider
      value={{
        Register,
        Login,
        LogOut,
        user,
        setUser,
        user_hash,
        show_loader,
        setShowLoader,
        setRegisterUser,
        register_user_info,
        setRegisterUserInfo,
        new_plan_prospect,
        setNewPlanProspect,
        login_user_info,
        setLoginUserInfo,
        user_current_plan,
        setUserCurrentPlan,
        user_register,
        setHash,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
