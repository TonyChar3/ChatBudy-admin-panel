import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "../../../../../hooks/useWindowWidth";

import { ModalState } from "../../../../service/modals/modals.context";
import { AppData } from "../../../../service/data/app-data.context";
import { AppState } from "../../../../service/app-state/app-state.context";

const VisitorCard = ({
  id,
  name,
  email,
  browser,
  country,
  time,
  visitor_mode,
  unread_chat_count,
}) => {
  const { setDeskTopChatRoom, setMobileChatRoom } = AppState();
  const { setDeleteModalInfo, setDeleteModalOpen } = ModalState();

  const {
    seen_notification_array,
    setSeenNotificationArray,
    notification_array,
  } = AppData();

  const [browser_icon, setIcon] = useState("");
  const [time_entered, setTime] = useState("");
  const [open_actions, setActions] = useState(false);
  const [open_info, setInfoOpen] = useState(false);
  const [show_full_name, setFullName] = useState(false);
  const [isNameTruncated, setIsTruncated] = useState(false);
  const truncatedNameRef = useRef(null);

  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const isMobileView = windowWidth <= 768;

  const cleanUpUnreadChat = () => {
    // find the visitor notification
    const notifications = notification_array
      .filter((notif) => notif.sent_from.toString() === id.toString())
      .map((notif) => notif._id);
    // add them to the seen notification array
    setSeenNotificationArray([...seen_notification_array, ...notifications]);
  };

  const handleBrowserIcon = (name_browser) => {
    switch (name_browser) {
      case "Safari":
        setIcon(<i className="fa-brands fa-safari text-2xl lg:text-3xl"></i>);
        break;
      case "Firefox":
        setIcon(
          <i className="fa-brands fa-firefox-browser text-2xl lg:text-3xl"></i>
        );
        break;
      case "Google Chrome":
        setIcon(<i className="fa-brands fa-chrome text-2xl lg:text-3xl"></i>);
        break;
      case "Internet Explorer":
        setIcon(
          <i className="fa-brands fa-internet-explorer text-2xl lg:text-3xl"></i>
        );
        break;
      case "Microsoft Edge":
        setIcon(<i className="fa-brands fa-edge text-2xl lg:text-3xl"></i>);
        break;
      case "Opera":
        setIcon(<i className="fa-brands fa-opera text-2xl lg:text-3xl"></i>);
        break;
      default:
        setIcon(null);
        break;
    }
  };

  const visitorTimeEntered = (time_entered) => {
    const currentDate = new Date();
    const visitorCreatedAt = new Date(time_entered);

    visitorCreatedAt.toLocaleDateString() === currentDate.toLocaleDateString()
      ? setTime("Today")
      : setTime(`${visitorCreatedAt.toLocaleDateString()}`);
  };

  const deleteVisitor = (visitr_id, visitr_email) => {
    setActions(false);
    setDeleteModalOpen(true);
    setDeleteModalInfo({
      id: visitr_id,
      email: visitr_email,
    });
  };

  const openChatRoom = () => {
    if (unread_chat_count > 0) {
      cleanUpUnreadChat();
    }
    if (isMobileView) {
      setMobileChatRoom({
        visitor_id: id,
        visitor_name: email,
      });
      navigate("/navbar/chatroom");
    } else if (!isMobileView) {
      setDeskTopChatRoom({
        visitor_id: id,
        visitor_name: email,
      });
      navigate("/navbar/inbox");
    }
  };

  useEffect(() => {
    handleBrowserIcon(browser);
    visitorTimeEntered(time);
  }, [id]);

  useEffect(() => {
    if (truncatedNameRef.current) {
      setIsTruncated(
        truncatedNameRef.current.scrollWidth >
          truncatedNameRef.current.clientWidth
      );
    }
  }, [name]);

  return (
    <>
      <div className="w-[95%] md:w-[85%] relative flex flex-row justify-around p-4 md:p-4 lg:p-4 my-4 border-[1px] border-[#6C2E9C] rounded-xl shadow-custom-shadow-input bg-white">
        <div
          className={`${
            show_full_name && isNameTruncated ? "w-full" : "w-1/2"
          } flex flex-row justify-start items-center z-5`}
        >
          <i
            onClick={() => setFullName(false)}
            className={`${
              show_full_name && isNameTruncated
                ? "cursor-pointer"
                : "scale-0 w-0"
            } fa-light fa-circle-xmark text-[#A881D4] text-xl mr-2 duration-300`}
          ></i>
          <div
            className={`relative ${
              show_full_name && isNameTruncated ? "w-full" : "lg:w-1/2 w-full"
            }`}
          >
            <h2
              onClick={() => setFullName(true)}
              ref={truncatedNameRef}
              className={`lg:text-2xl ${
                show_full_name && isNameTruncated
                  ? "mr-0 text-xs"
                  : "mr-10 text-lg"
              } ${
                isNameTruncated ? "cursor-pointer" : ""
              } truncate text-[#A881D4] transition-all ease duration-300`}
            >
              {name}
            </h2>
            <span
              className={`${
                unread_chat_count === 0 ? "hidden" : "bg-red-500 text-white"
              } absolute top-0 left-[65%] w-[25px] h-auto text-center rounded-full`}
            >
              {unread_chat_count}
            </span>
          </div>
          <div
            className={`${
              show_full_name && isNameTruncated ? "scale-0" : ""
            } hidden w-[40%] top-1 left-[15%] p-2 lg:flex flex-row justify-between lg:justify-around lg:items-center lg:mx-auto rounded-3xl duration-300`}
          >
            {browser_icon}
            <span
              className={`flag-icon flag-icon-${country.toLowerCase()} text-xl md:text-2xl lg:text-3xl`}
            ></span>
          </div>
        </div>

        <div
          className={`${
            show_full_name && isNameTruncated ? "scale-0 w-0" : "w-1/2"
          } flex flex-row justify-end z-10`}
        >
          <div
            className={`${
              show_full_name && isNameTruncated ? "scale-0 w-0" : ""
            } ${
              open_info || open_actions ? "scale-0" : ""
            }  flex flex-row justify-end items-center w-1/2 duration-300`}
          >
            <h2 className="md:text-lg lg:text-xl mr-2 underline text-[#A881D4]">
              {time_entered === "Invalid Date" ? "Today" : time_entered}
            </h2>
          </div>
          <div
            className={`flex flex-row justify-end items-center ${
              show_full_name && isNameTruncated ? "w-0 scale-0" : "w-1/2"
            }`}
          >
            <i
              onClick={() => setInfoOpen((open_info) => !open_info)}
              className={`${open_actions ? "hidden" : ""} 
                            ${
                              open_info
                                ? "fa-solid fa-xmark"
                                : "fa-light fa-circle-info"
                            }
                            ${open_info ? "rotate-180" : ""}
                            mr-3 text-xl md:text-xl lg:text-2xl text-[#8C8C8C] lg:hidden active:scale-[0.90] cursor-pointer duration-300`}
            ></i>
            <i
              onClick={() => {
                setInfoOpen(false);
                setActions((open_actions) => !open_actions);
              }}
              className={`${
                open_actions
                  ? "fa-solid fa-xmark"
                  : "fa-solid fa-ellipsis-vertical"
              } 
                        text-xl md:text-xl lg:text-4xl text-[#8C8C8C] active:scale-[0.90] cursor-pointer duration-300 
                        ${open_actions ? "rotate-180" : ""}
                        `}
            ></i>
          </div>
        </div>
        <div
          className={`${
            open_info ? "" : "scale-0"
          } absolute w-[30%] top-1 right-[15%] p-2 flex flex-row justify-between lg:justify-around lg:items-center lg:mx-auto border-[1px] border-[#A881D4] rounded-3xl bg-[#F5F3EF] duration-300`}
        >
          {browser_icon}
          <span
            className={`flag-icon flag-icon-${country.toLowerCase()} text-xl md:text-2xl lg:text-3xl`}
          ></span>
        </div>
        <div
          className={`absolute z-10 right-[12%] top-1 lg:top-4 p-2 flex flex-row items-center text-sm text-center
                ${
                  visitor_mode === "live-chat"
                    ? "justify-between w-[30%] lg:w-[10%]"
                    : "justify-center w-[18%] lg:w-[8%]"
                }  
                ${
                  open_actions ? "" : "scale-0"
                } border-[1px] border-[#A881D4] rounded-3xl bg-[#F5F3EF] duration-300`}
        >
          <i
            onClick={() => deleteVisitor(id, email)}
            className="fa-sharp fa-light fa-delete-left text-2xl lg:text-3xl text-red-500 active:scale-[0.90] cursor-pointer"
          ></i>
          <i
            onClick={() => openChatRoom()}
            className={`${
              visitor_mode === "live-chat" ? "" : "hidden"
            } fa-sharp fa-light fa-comment text-2xl lg:text-3xl text-[#A881D4] active:scale-[0.90] cursor-pointer`}
          ></i>
        </div>
      </div>
      <div className="w-[40%] h-[2px] bg-[#A881D4]"></div>
    </>
  );
};

export default VisitorCard;
