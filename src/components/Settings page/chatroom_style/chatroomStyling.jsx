import ChatroomMockModel from "./mock_chatroom/chatroomMockModel";
import { motion } from 'framer-motion';
import { UserAuth } from "../../../context/AuthContext";
import { useState, useEffect } from 'react';
import { sanitizeInputValue } from "../../../utils/security";

const ChatRoomStylingSection = () => {

    const { customization_object, add_customization_obj, setAddedCustomizationObj, saveWidgetCustomization } = UserAuth();

    const [open_customization, setOpenCustomization] = useState(false);
    const [room_title_arrow, setRoomTitleArrow] = useState(false);
    const [greeting_msg_arrow, setGreetingMsgArrow] = useState(false);
    const [greeting_msg, setGreetingMsg] = useState('');
    const [widget_title, setTitle] = useState('');
    const [mock_shape, setMockShape] = useState('');
    const [mock_bg_color, setMockColor] = useState('');

    const handleOpenCustomization = () => {
        setOpenCustomization(open_customization => !open_customization);
        setRoomTitleArrow(false);
        setGreetingMsgArrow(false);
    }

    const handleRoomTitleSection = () => {
        setRoomTitleArrow(room_title_arrow => !room_title_arrow);
        setGreetingMsgArrow(false);
    }

    const handleGreetingMsgSection = () => {
        setGreetingMsgArrow(greeting_msg_arrow => !greeting_msg_arrow);
        setRoomTitleArrow(false);
    }

    const GreetingMsgEnterClick = () => {
        // clean it up with regex
        const sanitized_val = sanitizeInputValue(greeting_msg);
        // add it to the object
        setAddedCustomizationObj(prevObj => ({
            ...prevObj,
            greeting_message: sanitized_val
        }));
        // reflect the changes on the mock model
        customization_object.greeting_message = sanitized_val;
        // close the drawer
        setGreetingMsgArrow(false);
    }

    const WidgetTitleEnterClick = () => {
        // clean it up with regex
        const sanitized_val = sanitizeInputValue(widget_title);
        // add it to the object
        setAddedCustomizationObj(prevObj => ({
            ...prevObj,
            admin_name: sanitized_val
        }));
        // reflect the changes on the mock model
        customization_object.admin_name = sanitized_val;
        // close the drawer
        setRoomTitleArrow(false);
    }

    useEffect(() => {
        if(Object.keys(customization_object).length > 0){
            setTitle(customization_object.admin_name);
            setGreetingMsg(customization_object.greeting_message);
            setMockColor(customization_object.main_color);
            setMockShape(customization_object.shape);
            // make sure the add_customization object is empty
            if(Object.keys(add_customization_obj).length > 0){
                setAddedCustomizationObj({});
            }
        }
    },[customization_object])

    return (
        <>
            <motion.div
                className="lg:relative w-full h-full flex flex-col justify-center items-center bg-white"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div onClick={handleOpenCustomization} className={`${open_customization? 'border-red-500' : 'border-[#33b8b8]'} absolute w-[14%] lg:w-[9%] h-[8%] top-[2%] left-4 flex flex-row justify-center items-center rounded-full p-2 border-2 active:scale-[0.90] ease transition-all duration-300 bg-white z-[40] cursor-pointer`}>
                    <i className={`${open_customization? 'fa-solid fa-xmark text-red-500' : 'fa-regular fa-message-pen text-[#33b8b8]'} text-2xl transition-all ease duration-100`}></i>
                </div>
                <div onClick={saveWidgetCustomization} className={`absolute w-[14%] top-[3%] right-4 flex flex-row justify-center items-center rounded-full p-2 border-2 ${Object.keys(add_customization_obj).length > 0? 'border-[#33b8b8] active:scale-[0.90] ease transition-all duration-300 bg-white cursor-pointer' : 'border-gray-300'}`}>
                    <span className={`text-md ${Object.keys(add_customization_obj).length > 0? 'text-[#33b8b8]' : 'text-gray-300'}`}>Save</span>
                </div>
                <div className={`absolute w-full h-full justify-center items-center ${open_customization? 'translate-y-0 z-[30] flex bg-white bg-opacity-50 duration-300' : 'translate-x-full opacity-0'} transition-all ease-in-out`}></div>
                <div className={`relative bottom-[50%] top-[10%] mx-auto w-full mt-5 flex-col justify-center items-center ${open_customization? 'translate-y-0 z-[80] flex duration-300' : 'translate-x-full opacity-0'} transition-all ease-in-out`}>
                    <div onClick={handleRoomTitleSection} className={`flex flex-row w-80 my-3 p-1 border-2 border-[#33b8b8] rounded-lg lg:w-2/4 ${room_title_arrow? 'z-20' : 'z-0'} bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]">Chatroom header</span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${room_title_arrow? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 my-2 justify-center items-center ${room_title_arrow? 'static translate-x-0 z-0 duration-300' : 'absolute translate-x-[200px] -z-20 h-0'}`}>
                        <div className={`text-center text-lg ${room_title_arrow? 'static translate-x-0 w-full flex flex-row justify-around items-center z-0 duration-300 lg:w-1/2' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                           <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Chatroom header" value={widget_title} className="p-2 lg:p-3 pl-2 border-[1px] border-[#33b8b8] w-4/6 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm shadow-lg shadow-[#33b8b8] outline-none lg:text-lg rounded-lg"/>
                           <button type="button" onClick={WidgetTitleEnterClick} className="bg-[#33b8b8] p-1 text-white font-light rounded-lg w-[25%] text-center lg:p-2 lg:text-lg active:scale-[0.90] ease-in-out duration-100">Enter</button>
                        </div>
                    </div>
                    <div onClick={handleGreetingMsgSection} className={`flex flex-row w-80 my-3 p-1 border-2 border-[#33b8b8] rounded-lg lg:w-2/4 ${greeting_msg_arrow? 'z-20' : 'z-0'} bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]">Greeting message</span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${greeting_msg_arrow? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 my-2 justify-center items-center ${greeting_msg_arrow? 'static translate-x-0 z-0 duration-300' : 'absolute translate-x-[200px] -z-20 h-0'}`}>
                        <div className={`text-center text-lg ${greeting_msg_arrow? 'static translate-x-0 w-full flex flex-col justify-around items-center z-0 duration-300 lg:w-1/2' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                            <textarea name="greeting_msg" id="greeting_msg_input" onChange={(e) => setGreetingMsg(e.target.value)} value={greeting_msg} placeholder="Greeting message to visitors" className="p-2 lg:p-3 pl-2 border-[1px] border-[#33b8b8] w-4/6 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm shadow-lg shadow-[#33b8b8] outline-none lg:text-lg rounded-lg resize-none"></textarea>
                            <button type="button" onClick={GreetingMsgEnterClick} className="bg-[#33b8b8] p-1 text-white font-light rounded-lg w-[25%] my-3 text-center lg:p-2 lg:text-lg active:scale-[0.90] ease-in-out duration-100">Enter</button>
                        </div>
                    </div>
                </div>
                <div className="relative w-full h-full flex flex-row justify-center items-center">
                    <ChatroomMockModel room_title={widget_title} greeting_message={greeting_msg} shape={mock_shape} main_color={mock_bg_color} />
                </div>
            </motion.div>
        </>
    )
}

export default ChatRoomStylingSection;