import { createContext, useContext, useState } from "react";
import {
  requestSaveWidgetCustomization,
  requestAccountDelete,
  requestVisitorDelete,
} from "./app-state.service";

import { deleteUser } from "firebase/auth";
import { auth } from "../../../firebase_setup/firebase_conf";

import { UserAuth } from "../authentication/authentication.context";
import { ModalState } from "../modals/modals.context";

const AppStateContext = createContext();

export const AppStateContextProvider = ({ children }) => {
  const { user, setUser, user_hash } = UserAuth();
  const { setModalOpen, setModalMsg, setModalErrorMode, setDeleteModalInfo } =
    ModalState();

  const [mobile_chat_room, setMobileChatRoom] = useState({}); // state
  const [desktop_chat_room, setDeskTopChatRoom] = useState({}); // state
  const [added_customization_object, setAddedCustomizationObj] = useState({}); // state

  const saveWidgetCustomization = async () => {
    try {
      if (Object.keys(added_customization_object).length > 0) {
        // make a request to save the customization inside the customization object
        await requestSaveWidgetCustomization(
          added_customization_object,
          user.accessToken
        );
        setModalErrorMode(false);
        setAddedCustomizationObj({});
        window.location.reload(); // refresh page to reflect new changes for the user
      }
    } catch (err) {
      setModalOpen(true);
      setModalErrorMode(true);
      setModalMsg(
        `ERROR (${err.response.status}) '${
          err.response.data.err || err.response.data.message
        }': Unable to save new widget style. Please try again or contact support`
      );
    }
  };

  const RemoveVisitor = async (visitr_id) => {
    try {
      // make the request to the delete the visitor
      await requestVisitorDelete(user_hash, visitr_id, user.accessToken);
      // inform that it did succeed
      setModalErrorMode(false);
      setModalMsg("Visitor deleted");
      setModalOpen(true);
      setDeleteModalInfo({});
    } catch (err) {
      setModalOpen(true);
      setModalErrorMode(true);
      setModalMsg(
        `ERROR (${err.response.status}) '${
          err.response.data.err || err.response.data.message
        }': Unable to delete visitor, please try again or contact support`
      );
    }
  };

  const DeleteUserAccount = async (access_token) => {
    try {
      // send a request to delete the account
      await requestAccountDelete(access_token);
      // delete from firebase right after
      await deleteUser(auth.currentUser);
      // set everything to null and navigate back to the login page
      setUser(null);
      // display the modal with the right message
      setModalOpen(true);
      setModalErrorMode(false);
      setModalMsg("Profile deleted. See ya 👋");
      return;
    } catch (err) {
      setModalOpen(true);
      setModalErrorMode(true);
      setModalMsg(`ERROR (${err.response.status}) 
            '${err.response.data.err || err.response.data.message}': 
            Unable to remove the account, please try again or contact support.
            `);
      return false;
    }
  };

  return (
    <AppStateContext.Provider
      value={{
        setMobileChatRoom,
        mobile_chat_room,
        setDeskTopChatRoom,
        desktop_chat_room,
        added_customization_object,
        setAddedCustomizationObj,
        saveWidgetCustomization,
        RemoveVisitor,
        DeleteUserAccount,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const AppState = () => {
  return useContext(AppStateContext);
};
