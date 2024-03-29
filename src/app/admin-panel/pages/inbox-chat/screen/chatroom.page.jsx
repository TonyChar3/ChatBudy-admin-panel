import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import ScrollView from "../../../../../components/scroll/scroll-view.component";
import { useWindowWidth } from "../../../../../hooks/useWindowWidth";
import { useWebSocket } from "../../../../../hooks/useWebSocket";

import {
  FetchChatRoom,
  CleanUpReadNotification,
} from "../../../lib/inboxSectionFunctions";
import { sanitizeChatInputValue } from "../../../../../utils/security";

import DataLoadingAnimation from "../../../../../components/Loader/data_loading/dataLoadingAnimation";
import ChatTextBubble from "../components/chat-text-bubble.component";

import { UserAuth } from "../../../../service/authentication/authentication.context";
import { ModalState } from "../../../../service/modals/modals.context";
import { AppData } from "../../../../service/data/app-data.context";
import { AppState } from "../../../../service/app-state/app-state.context";

const ChatRoomPage = (props) => {
  const { user, user_hash } = UserAuth();

  const { mobile_chat_room, setDeskTopChatRoom, setMobileChatRoom } =
    AppState();

  const { setModalOpen, setModalMsg, setModalErrorMode } = ModalState();

  const { setWSLink, seen_notification_array, setSeenNotificationArray } =
    AppData();

  const [ui_state, setUIstate] = useState({
    room_name: "",
    visitor_id: "",
    messages_array: [],
    ws_connect_link: "",
    chat_input: "",
    send_is_typing: false,
    show_loading: false,
  });
  const [ws, data] = useWebSocket(ui_state.ws_connect_link);

  const TypingTimeoutRef = useRef(null);

  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const isMobileView = windowWidth <= 820;

  const InputChange = (e) => {
    // sanitize the input value
    const sanitize_value = sanitizeChatInputValue(e);
    setUIstate((prevValue) => ({
      ...prevValue,
      chat_input: sanitize_value,
    }));
    // set the isTyping ...
    if (ui_state.chat_input !== "" && !ui_state.send_is_typing) {
      ws.send(JSON.stringify({ type: "typing", status: true }));
      setUIstate((prevValue) => ({
        ...prevValue,
        send_is_typing: true,
      }));
    } else if (ui_state.chat_input === "") {
      setUIstate((prevValue) => ({
        ...prevValue,
        send_is_typing: false,
      }));
    }
  };

  const CloseRoom = () => {
    if (isMobileView) {
      setMobileChatRoom({});
      setDeskTopChatRoom({});
    } else {
      setDeskTopChatRoom({});
      props.closeIt();
    }
    ws.close();
    setUIstate((prevValue) => ({
      ...prevValue,
      messages_array: [],
    }));
  };

  const handleFetchRoom = async (user_hash, visitor_id) => {
    ui_state.messages_array = []; // reset the chat array
    const connect_chatroom = await FetchChatRoom(
      visitor_id,
      user_hash,
      user.accessToken
    );
    if (connect_chatroom.error) {
      // show a message for the user
      setModalOpen(true);
      setModalErrorMode(true);
      setModalMsg(
        "ERROR: Chatroom currently unavaible. Please re-try or contact support."
      );
      // close desktop or mobile version of the chatroom
      setMobileChatRoom({});
      setDeskTopChatRoom({});
      setUIstate((prevValue) => ({
        ...prevValue,
        messages_array: [],
      }));
      if (!isMobileView) {
        props.closeIt();
      }
    }
    // set the new websocket connection link
    setUIstate((prevValue) => ({
      ...prevValue,
      ws_connect_link: `wss://chatbudy-api.onrender.com/?id=${connect_chatroom.data.wss_jwt}`,
    }));
  };

  const SendChat = () => {
    // if there's nothing written or the chat input isnt set
    if (!ui_state.chat_input || ui_state.chat_input === "") {
      setUIstate((prevValue) => ({
        ...prevValue,
        send_is_typing: false,
      }));
      return;
    }
    // send it to the websocket server
    ws.send(
      JSON.stringify({ senderType: "agent", content: ui_state.chat_input })
    );
    setUIstate((prevValue) => ({
      ...prevValue,
      chat_input: "",
    }));
  };

  const ClearSeenChatNotification = async () => {
    try {
      if (seen_notification_array.length >= 0) {
        const clean_up = await CleanUpReadNotification(
          seen_notification_array,
          user.accessToken
        );
        if (clean_up.error) {
          throw new Error(`${clean_up.error_msg}`);
        }
        setSeenNotificationArray([]);
      }
    } catch (err) {
      setModalOpen(true);
      setModalErrorMode(true);
      setModalMsg("ERROR: notification, please refresh.");
    }
  };

  useEffect(() => {
    ClearSeenChatNotification();
    if (props.user && user_hash) {
      props.user.visitor_name
        ? setUIstate((prevValue) => ({
            ...prevValue,
            room_name: props.user.visitor_name,
            visitor_id: props.user.visitor_id,
            show_loading: true,
          }))
        : setUIstate((prevValue) => ({
            ...prevValue,
            room_name: props.user.visitor_id,
            visitor_id: props.user.visitor_id,
            show_loading: true,
          }));
      // fetch the chat room and set the messages array
      handleFetchRoom(user_hash, props.user.visitor_id);
    } else if (Object.keys(mobile_chat_room).length > 0 && user_hash) {
      mobile_chat_room.visitor_name
        ? setUIstate((prevValue) => ({
            ...prevValue,
            room_name: mobile_chat_room.visitor_name,
            visitor_id: mobile_chat_room.visitor_id,
            show_loading: true,
          }))
        : setUIstate((prevValue) => ({
            ...prevValue,
            room_name: mobile_chat_room.visitor_id,
            visitor_id: mobile_chat_room.visitor_id,
            show_loading: true,
          }));
      // fetch the chat room and set the messages array
      handleFetchRoom(user_hash, mobile_chat_room.visitor_id);
    } else {
      navigate("/navbar/inbox");
    }
  }, [props.user, mobile_chat_room, user_hash]);

  useEffect(() => {
    if (ws) {
      setWSLink(ws); // context api
      if (Array.isArray(data)) {
        data.length > 0
          ? data.forEach((msg) => {
              setUIstate((prevValue) => ({
                ...prevValue,
                messages_array: [...prevValue.messages_array, msg],
                show_loading: false,
              }));
            })
          : setUIstate((prevValue) => ({
              ...prevValue,
              messages_array: [],
              show_loading: false,
            }));
      } else {
        if (data.type === "..." && data.status === true) {
          setUIstate((prevValue) => ({
            ...prevValue,
            messages_array: [...prevValue.messages_array, data],
            show_loading: false,
          }));
          clearTimeout(TypingTimeoutRef.current);
          TypingTimeoutRef.current = setTimeout(() => {
            setUIstate((prevValue) => ({
              ...prevValue,
              messages_array: prevValue.messages_array.filter(
                (msg) => msg !== data
              ),
              show_loading: false,
            }));
          }, 5000);
        } else {
          setUIstate((prevValue) => ({
            ...prevValue,
            messages_array: prevValue.messages_array.filter(
              (msg) => msg.sender_type !== data.type
            ),
            show_loading: false,
          }));
          setUIstate((prevValue) => ({
            ...prevValue,
            messages_array: [...prevValue.messages_array, data],
            show_loading: false,
          }));
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (!isMobileView) {
      setMobileChatRoom({});
      navigate("/navbar/inbox");
    }
  }, [isMobileView]);

  return (
    <>
      <motion.div
        className="w-full h-full lg:h-full flex flex-col justify-start items-center bg-chatroom-custom-bg bg-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <div className="w-[97%] flex flex-row p-3 md:p-3 mt-2 justify-start items-center border-[1px] border-[#6C2E9C] rounded-xl shadow-custom-shadow-input bg-white">
          <i
            onClick={CloseRoom}
            className="fa-regular fa-circle-xmark text-xl md:text-2xl mx-3 text-[#A881D4] hidden lg:inline cursor-pointer"
          ></i>
          <Link to="/navbar/inbox" onClick={CloseRoom}>
            <i className="fa-solid fa-chevron-left text-xl md:text-2xl mx-3 text-[#A881D4] lg:hidden"></i>
          </Link>
          <h2 className="text-xl md:text-2xl text-[#A881D4]">
            {ui_state.room_name}
          </h2>
        </div>
        <ScrollView style="max-h-screen h-full w-full">
          {ui_state.show_loading ? (
            <DataLoadingAnimation />
          ) : (
            <>
              <div className="lg:max-h-full w-full grid grid-cols-1">
                {ui_state.messages_array.length ? (
                  <>
                    {ui_state.messages_array.map((msg, i) => (
                      <ChatTextBubble
                        key={i}
                        text={msg.text || msg.type}
                        sender_type={msg.sender_type || msg.type}
                      />
                    ))}
                  </>
                ) : (
                  <div className="h-full w-full flex flex-row p-5 justify-center items-center">
                    <i className="fa-light fa-comments text-6xl my-2 text-[#A881D4] opacity-5"></i>
                  </div>
                )}
                <div className="h-[15vh]"></div>
              </div>
            </>
          )}
        </ScrollView>
        <div className="absolute bottom-10 w-full lg:w-[45%] flex flex-row justify-center items-center">
          <div className="bottom-10 w-5/6 lg:w-full p-3 bg-[#A881D4] rounded-xl flex flex-row justify-center items-center z-20">
            <input
              onChange={(e) => InputChange(e.target.value)}
              value={ui_state.chat_input}
              type="text"
              name="chat"
              id="chat"
              placeholder="send a chat..."
              className="w-5/6 p-2 md:p-3 md:text-lg rounded-lg outline-none"
            />
            <i
              onClick={() => SendChat()}
              className="fa-sharp fa-light fa-paper-plane-top ml-6 text-2xl md:text-3xl text-white active:scale-[0.90] focus:scale-[1.1] duration-100 cursor-pointer"
            ></i>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ChatRoomPage;
