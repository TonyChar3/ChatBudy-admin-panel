import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import MockWidgetModel from "../../component/mock-widget.component";
import { sanitizeInputValue } from "../../../../../../utils/security";

import { useWindowWidth } from "../../../../../../hooks/useWindowWidth";
import { AppState } from "../../../../../service/app-state/app-state.context";
import { AppData } from "../../../../../service/data/app-data.context";

const ChatRoomCustomizationSection = ({ close_page_desktop }) => {
  const {
    added_customization_object,
    setAddedCustomizationObj,
    saveWidgetCustomization,
  } = AppState();

  const { widget_customizations } = AppData();

  const [open_customization, setOpenCustomization] = useState(false);
  const [active_section, setActiveSection] = useState(null);
  const [value, setValue] = useState({
    widget_title: "",
    greeting_msg: "",
    offline_msg: "",
    font_color: "",
    mock_shape: "",
    mock_bg_color: "",
    chat_mode: "",
    show_mock: false,
  });

  const navigate = useNavigate();
  const windowWidth = useWindowWidth();
  const isMobileView = windowWidth <= 820;

  const openCustomizations = () => {
    setOpenCustomization((open_customization) => !open_customization);
    setActiveSection(null);
  };

  const toggleCustomizationSection = (section) => {
    if (active_section === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };

  const InputChange = (name, value) => {
    setValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const addNewCustomization = (name, new_value) => {
    let value;

    // clean up if needed the input value
    if (
      name.toString() === "greeting_message" ||
      name.toString() === "admin_name" ||
      name.toString() === "offline_message"
    ) {
      value = sanitizeInputValue(new_value);
    } else {
      value = new_value;
    }
    widget_customizations[name].toString() === value.toString()
      ? setAddedCustomizationObj((prevObj) => {
          const updatedObj = { ...prevObj }; // clone the object
          delete updatedObj[name]; // delete the key from the cloned object
          return updatedObj;
        })
      : //or
        setAddedCustomizationObj((prevObj) => ({
          ...prevObj,
          [name]: value,
        }));
    if (
      name.toString() === "greeting_message" ||
      name.toString() === "admin_name" ||
      name.toString() === "offline_message"
    ) {
      // close the drawer
      setActiveSection(null);
    }
  };

  useEffect(() => {
    if (!isMobileView) {
      navigate("/navbar/setting");
    }
  }, [isMobileView]);

  useEffect(() => {
    if (Object.keys(widget_customizations).length > 0) {
      setValue((prevValues) => ({
        ...prevValues,
        widget_title: widget_customizations.admin_name,
        greeting_msg: widget_customizations.greeting_message,
        offline_msg: widget_customizations.offline_message,
        font_color: widget_customizations.font_color,
        mock_bg_color: widget_customizations.main_color,
        mock_shape: widget_customizations.shape,
        chat_mode: widget_customizations.chat_mode,
        show_mock: true,
      }));
      // make sure the add_customization object is empty
      if (Object.keys(added_customization_object).length > 0) {
        setAddedCustomizationObj({});
      }
    } else {
      setValue((prevValues) => ({
        ...prevValues,
        ["show_mock"]: false,
      }));
    }
  }, [widget_customizations]);

  return (
    <>
      <motion.div
        className="lg:relative w-full h-full flex flex-col justify-center items-center bg-settings-section-bg bg-cover bg-no-repeat"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        {/* Go back button*/}
        <div className="absolute top-0 left-0 w-[20px] p-3 m-3 text-center text-[#A881D4] rounded-3xl active:scale-[0.90] ease duration-300 cursor-pointer">
          <Link to="/navbar/setting" className="lg:hidden">
            <i className="fa-solid fa-chevron-left text-3xl"></i>
          </Link>
          <i
            onClick={() => close_page_desktop("")}
            className="fa-regular fa-circle-xmark hidden lg:inline-block text-3xl"
          ></i>
        </div>
        {/* Open custom options */}
        <div
          onClick={openCustomizations}
          className={`${
            open_customization ? "border-red-500" : "border-[#6C2E9C]"
          } absolute w-[14%] md:w-[11%] lg:w-[9%] h-[8%] top-[2%] left-[45%] flex flex-row justify-center items-center rounded-full p-2 border-2 active:scale-[0.90] ease transition-all duration-300 bg-white ${
            open_customization ? "z-[40]" : "z-0"
          } cursor-pointer`}
        >
          <i
            className={`${
              open_customization
                ? "fa-solid fa-xmark text-red-500"
                : "fa-regular fa-message-pen text-[#A881D4]"
            } text-2xl md:text-3xl lg:text-3xl transition-all ease duration-100`}
          ></i>
        </div>
        {/* Save new customization */}
        <div
          onClick={saveWidgetCustomization}
          className={`absolute w-[14%] top-[3%] right-4 flex flex-row justify-center items-center rounded-full p-2 border-2 ${
            Object.keys(added_customization_object).length > 0
              ? "border-[#6C2E9C] active:scale-[0.90] ease transition-all duration-300 bg-white cursor-pointer"
              : "border-gray-300"
          }`}
        >
          <span
            className={`text-md ${
              Object.keys(added_customization_object).length > 0
                ? "text-[#A881D4]"
                : "text-gray-300"
            }`}
          >
            Save
          </span>
        </div>
        {/* Customization options */}
        <div
          className={`absolute w-full h-full justify-center items-center ${
            open_customization
              ? "translate-y-0 z-[30] flex bg-white bg-opacity-50 duration-300"
              : "translate-x-full opacity-0"
          } transition-all ease-in-out`}
        ></div>
        <div
          className={`relative bottom-[50%] top-[10%] mx-auto w-full mt-5 flex-col justify-center items-center ${
            open_customization
              ? "translate-y-0 z-[80] flex duration-300"
              : "translate-x-full opacity-0 duration-700 z-0"
          } transition-all ease-in-out`}
        >
          {/* Header title */}
          <div
            onClick={() => toggleCustomizationSection("widget_title")}
            className={`flex flex-row w-80 my-3 p-2 border-2 border-[#6C2E9C] text-[#A881D4] rounded-lg lg:w-2/4 ${
              active_section === "widget_title" ? "z-20" : "z-0"
            } bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}
          >
            <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
              <span className="text-lg lg:text-xl">Chatroom header</span>
            </div>
            <div className="flex flex-row justify-center items-center w-20 lg:w-40">
              <i
                className={`fa-sharp fa-solid fa-chevron-up text-xl ${
                  active_section === "widget_title" ? "rotate-180" : ""
                } duration-300 lg:text-2xl cursor-pointer`}
              ></i>
            </div>
          </div>
          <div
            className={`flex flex-row w-full p-2 my-2 justify-center items-center ${
              active_section === "widget_title"
                ? "static translate-x-0 z-0 duration-300"
                : "absolute translate-x-[200px] -z-20 h-0"
            }`}
          >
            <div
              className={`text-center text-lg ${
                active_section === "widget_title"
                  ? "static translate-x-0 w-full flex flex-row justify-around items-center z-0 duration-300 lg:w-1/2"
                  : "relative translate-x-[500px] w-0 -z-20"
              }`}
            >
              <input
                type="text"
                onChange={(e) => InputChange("widget_title", e.target.value)}
                placeholder="Chatroom header"
                value={value.widget_title}
                className="p-2 lg:p-3 pl-2 border-[1px] border-[#6C2E9C] w-4/6 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm shadow-lg shadow-[#A881D4] outline-none lg:text-lg rounded-lg"
              />
              <button
                type="button"
                onClick={() =>
                  addNewCustomization("admin_name", value.widget_title)
                }
                className="bg-[#6C2E9C] p-1 text-white font-light rounded-lg w-[25%] text-center lg:p-2 lg:text-lg active:scale-[0.90] ease-in-out duration-100"
              >
                Enter
              </button>
            </div>
          </div>
          {/* Greeting message */}
          <div
            onClick={() => toggleCustomizationSection("widget_greeting")}
            className={`flex flex-row w-80 my-3 p-2 border-2 border-[#6C2E9C] text-[#A881D4] rounded-lg lg:w-2/4 ${
              active_section === "widget_greeting" ? "z-20" : "z-0"
            } bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}
          >
            <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
              <span className="text-lg lg:text-xl">Greeting message</span>
            </div>
            <div className="flex flex-row justify-center items-center w-20 lg:w-40">
              <i
                className={`fa-sharp fa-solid fa-chevron-up text-xl ${
                  active_section === "widget_greeting" ? "rotate-180" : ""
                } duration-300 lg:text-2xl cursor-pointer`}
              ></i>
            </div>
          </div>
          <div
            className={`flex flex-row w-full p-2 my-2 justify-center items-center ${
              active_section === "widget_greeting"
                ? "static translate-x-0 z-0 duration-300"
                : "absolute translate-x-[200px] -z-20 h-0"
            }`}
          >
            <div
              className={`text-center text-lg ${
                active_section === "widget_greeting"
                  ? "static translate-x-0 w-full flex flex-col justify-around items-center z-0 duration-300 lg:w-1/2"
                  : "relative translate-x-[500px] w-0 -z-20"
              }`}
            >
              <textarea
                name="greeting_msg"
                id="greeting_msg_input"
                onChange={(e) => InputChange("greeting_msg", e.target.value)}
                value={value.greeting_msg}
                placeholder="Greeting message to visitors"
                className="p-2 lg:p-3 pl-2 border-[1px] border-[#6C2E9C] w-4/6 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm shadow-lg shadow-[#A881D4] outline-none lg:text-lg rounded-lg resize-none"
              ></textarea>
              <button
                type="button"
                onClick={() =>
                  addNewCustomization("greeting_message", value.greeting_msg)
                }
                className="bg-[#6C2E9C] p-1 text-white font-light rounded-lg w-[25%] my-3 text-center lg:p-2 lg:text-lg active:scale-[0.90] ease-in-out duration-100"
              >
                Enter
              </button>
            </div>
          </div>
          {/* Offline message */}
          <div
            onClick={() => toggleCustomizationSection("widget_offline_msg")}
            className={`flex flex-row w-80 my-3 p-2 border-2 border-[#6C2E9C] text-[#A881D4] rounded-lg lg:w-2/4 ${
              active_section === "widget_greeting" ? "z-20" : "z-0"
            } bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}
          >
            <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
              <span className="text-lg lg:text-xl">Offline message</span>
            </div>
            <div className="flex flex-row justify-center items-center w-20 lg:w-40">
              <i
                className={`fa-sharp fa-solid fa-chevron-up text-xl ${
                  active_section === "widget_offline_msg" ? "rotate-180" : ""
                } duration-300 lg:text-2xl cursor-pointer`}
              ></i>
            </div>
          </div>
          <div
            className={`flex flex-row w-full p-2 my-2 justify-center items-center ${
              active_section === "widget_offline_msg"
                ? "static translate-x-0 z-0 duration-300"
                : "absolute translate-x-[200px] -z-20 h-0"
            }`}
          >
            <div
              className={`text-center text-lg ${
                active_section === "widget_offline_msg"
                  ? "static translate-x-0 w-full flex flex-col justify-around items-center z-0 duration-300 lg:w-1/2"
                  : "relative translate-x-[500px] w-0 -z-20"
              }`}
            >
              <textarea
                name="offline_msg"
                id="offline_msg_input"
                onChange={(e) => InputChange("offline_msg", e.target.value)}
                value={value.offline_msg}
                placeholder="Greeting message to visitors"
                className="p-2 lg:p-3 pl-2 border-[1px] border-[#6C2E9C] w-4/6 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm shadow-lg shadow-[#A881D4] outline-none lg:text-lg rounded-lg resize-none"
              ></textarea>
              <button
                type="button"
                onClick={() =>
                  addNewCustomization("offline_message", value.offline_msg)
                }
                className="bg-[#6C2E9C] p-1 text-white font-light rounded-lg w-[25%] my-3 text-center lg:p-2 lg:text-lg active:scale-[0.90] ease-in-out duration-100"
              >
                Enter
              </button>
            </div>
          </div>
          {/* Font color */}
          <div
            onClick={() => toggleCustomizationSection("font_color")}
            className={`flex flex-row w-80 my-3 p-2 border-2 border-[#6C2E9C] text-[#A881D4] rounded-lg lg:w-2/4 ${
              active_section === "font_color" ? "z-20" : "z-0"
            } bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}
          >
            <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
              <span className="text-lg lg:text-xl">Font Color</span>
            </div>
            <div className="flex flex-row justify-center items-center w-20 lg:w-40">
              <i
                className={`fa-sharp fa-solid fa-chevron-up text-xl ${
                  active_section === "font_color" ? "rotate-180" : ""
                } duration-300 lg:text-2xl cursor-pointer`}
              ></i>
            </div>
          </div>
          <div
            className={`flex flex-row w-full p-2 my-2 justify-center items-center ${
              active_section === "font_color"
                ? "static translate-x-0 z-0 duration-300"
                : "absolute translate-x-[200px] -z-20 h-0"
            }`}
          >
            <div
              className={`text-center text-lg ${
                active_section === "font_color"
                  ? "static translate-x-0 w-full flex flex-row justify-around items-center z-0 duration-300 lg:w-1/2"
                  : "relative translate-x-[500px] w-0 -z-20"
              }`}
            >
              <div
                onClick={() => {
                  setValue((prevValues) => ({
                    ...prevValues,
                    ["font_color"]: "light",
                  }));
                  addNewCustomization("font_color", "light");
                }}
                style={{ backgroundColor: value.mock_bg_color }}
                className={`w-13 h-13 p-1 rounded-lg ${
                  value.font_color === "light"
                    ? "shadow-lg shadow-[#A881D4] scale-[1.1]"
                    : "shadow-md shadow-[#6C2E9C]"
                } cursor-pointer`}
              >
                <h2 className="text-lg lg:text-xl text-white tracking-wide">
                  Light
                </h2>
              </div>
              <div
                onClick={() => {
                  setValue((prevValues) => ({
                    ...prevValues,
                    ["font_color"]: "dark",
                  }));
                  addNewCustomization("font_color", "dark");
                }}
                style={{ backgroundColor: value.mock_bg_color }}
                className={`w-13 h-13 p-1 rounded-lg ${
                  value.font_color === "dark"
                    ? "shadow-lg shadow-[#A881D4] scale-[1.1]"
                    : "shadow-md shadow-[#6C2E9C]"
                } cursor-pointer`}
              >
                <h2 className="text-lg lg:text-xl text-zinc-700 tracking-wide">
                  Dark
                </h2>
              </div>
            </div>
          </div>
          {/* Chat mode */}
          <div
            onClick={() => toggleCustomizationSection("chat_mode")}
            className={`flex flex-row w-80 my-3 p-2 border-2 border-[#6C2E9C] text-[#A881D4] rounded-lg lg:w-2/4 ${
              active_section === "chat_mode" ? "z-20" : "z-0"
            } bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}
          >
            <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
              <span className="text-lg lg:text-xl">Chat mode</span>
            </div>
            <div className="flex flex-row justify-center items-center w-20 lg:w-40">
              <i
                className={`fa-sharp fa-solid fa-chevron-up text-xl ${
                  active_section === "chat_mode" ? "rotate-180" : ""
                } duration-300 lg:text-2xl cursor-pointer`}
              ></i>
            </div>
          </div>
          <div
            className={`flex flex-row w-full p-2 my-2 justify-center items-center ${
              active_section === "chat_mode"
                ? "static translate-x-0 z-0 duration-300"
                : "absolute translate-x-[200px] -z-20 h-0"
            }`}
          >
            <div
              className={`text-center text-lg ${
                active_section === "chat_mode"
                  ? "static translate-x-0 w-full flex flex-col justify-around items-center z-0 duration-300 lg:w-1/2"
                  : "relative translate-x-[500px] w-0 -z-20"
              }`}
            >
              <div className="flex flex-col justify-between">
                <div
                  onClick={() => {
                    setValue((prevValues) => ({
                      ...prevValues,
                      ["chat_mode"]: "live-chat",
                    }));
                    addNewCustomization("chat_mode", "live-chat");
                  }}
                  className={`w-40 m-2 flex flex-row justify-between items-center 
                                    ${
                                      value.chat_mode === "live-chat"
                                        ? "border-b-2 border-[#A881D4] text-[#A881D4] scale-[1.05] lg:text-xl"
                                        : "border-b-[1px] border-gray-300 text-gray-300 text-lg"
                                    } 
                                    cursor-pointer active:scale-[0.90] transition-all ease`}
                >
                  Live chat
                </div>
                <div
                  onClick={() => {
                    setValue((prevValues) => ({
                      ...prevValues,
                      ["chat_mode"]: "lead-gen",
                    }));
                    addNewCustomization("chat_mode", "lead-gen");
                  }}
                  className={`w-40 m-2 flex flex-row justify-between items-center
                                    ${
                                      value.chat_mode === "lead-gen"
                                        ? "border-b-2 border-[#A881D4] text-[#A881D4] scale-[1.05] lg:text-xl"
                                        : "border-b-[1px] border-gray-300 text-gray-300 text-lg"
                                    } 
                                    cursor-pointer active:scale-[0.90] transition-all ease`}
                >
                  Lead generation
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full flex flex-row justify-center items-center">
          <MockWidgetModel
            show_mock={value.show_mock}
            font_color={value.font_color}
            greeting_message={value.greeting_msg}
            main_color={value.mock_bg_color}
            shape={value.mock_shape}
            header_title={value.widget_title}
            chat_mode={value.chat_mode}
            offline_message={value.offline_msg}
            position={widget_customizations.position}
            open_mock={true}
          />
        </div>
      </motion.div>
    </>
  );
};

export default ChatRoomCustomizationSection;
