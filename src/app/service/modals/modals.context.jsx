import { createContext, useContext, useEffect, useState } from "react";

const ModalsStateContext = createContext();

export const ModalsStateContextProvider = ({ children }) => {
  const [is_modal_open, setModalOpen] = useState(false); // modal
  const [is_modal_visible, setIsVisible] = useState(false); // modal
  const [modal_message, setModalMsg] = useState(""); // modal
  const [modal_error_mode, setModalErrorMode] = useState(false); // modal
  const [is_delete_modal_open, setDeleteModalOpen] = useState(false); // modal
  const [is_delete_modal_visible, setIsDeleteModalVisible] = useState(false); // modal
  const [delete_modal_info, setDeleteModalInfo] = useState({}); // modal
  const [delete_modal_useraccount, setDeleteModalUser] = useState(false); // modal
  const [is_passwordauth_modal_visible, setPasswordAuthModalVisible] =
    useState(false); // modal
  const [is_passwordauth_modal_open, setPasswordAuthModalOpen] =
    useState(false); // modal

  useEffect(() => {
    if (is_modal_open) {
      setIsVisible(true);
      const timeout = setTimeout(() => {
        setModalOpen(false);
      }, 5000);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [is_modal_open]);

  useEffect(() => {
    if (is_delete_modal_open) {
      setIsDeleteModalVisible(true);
    } else {
      const timeout = setTimeout(() => setIsDeleteModalVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [is_delete_modal_open]);

  useEffect(() => {
    if (is_passwordauth_modal_open) {
      setPasswordAuthModalVisible(true);
    } else {
      const timeout = setTimeout(() => setPasswordAuthModalVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [is_passwordauth_modal_open]);

  return (
    <ModalsStateContext.Provider
      value={{
        is_modal_open,
        setModalOpen,
        setModalMsg,
        is_modal_visible,
        modal_message,
        setDeleteModalOpen,
        is_delete_modal_open,
        setDeleteModalInfo,
        delete_modal_info,
        setPasswordAuthModalOpen,
        is_passwordauth_modal_open,
        setModalErrorMode,
        modal_error_mode,
        delete_modal_useraccount,
        setDeleteModalUser,
      }}
    >
      {children}
    </ModalsStateContext.Provider>
  );
};

export const ModalState = () => {
  return useContext(ModalsStateContext);
};
