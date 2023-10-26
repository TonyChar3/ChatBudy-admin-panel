import InboxScroll from '../../../container/scroll/inboxScroll';
import ChatRoomPage from './Chat room/chatroomPage';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserAuth } from '../../../context/AuthContext';
import ChatRoomCards from './Chat cards/ChatRoomCards';

const InboxPage = () => {

    const [openChat, setChat] = useState({});

    const { 
        visitors_array, 
        desktop_chat_room, 
        setModalOpen, 
        setModalErrorMode, 
        setModalMsg } = UserAuth();

    const handleOpenChat = (data) => {
        if(!data){
            return;
        }
        setChat(data);
    }

    useEffect(() => {
        if(Object.keys(desktop_chat_room).length > 0){
            setChat(desktop_chat_room);// Pass the state of the chatroom for desktop
        } else if(!desktop_chat_room) {
            setModalOpen(true);
            setModalErrorMode(true);
            setModalMsg('ERROR (500): Unable to load the inbox. Please reload the app or contact support');
        }
    },[desktop_chat_room])

    return(
        <>
            <motion.div 
                className="relative h-full w-full flex"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="h-full w-full lg:w-1/2 flex flex-col items-center lg:border-r-2 lg:border-[#6C2E9C]">
                    <InboxScroll>
                        <div className="w-full flex flex-col justify-center lg:p-5 lg:justify-start items-center">
                            {
                                visitors_array.length ? 
                                visitors_array.map((visitors, i) => (
                                    <ChatRoomCards key={i} open_chat_function={handleOpenChat} visitor_name={visitors.email} visitor_id={visitors._id}/>
                                ))
                                :
                                <>
                                    <div className="absolute bottom-0 h-full w-full flex flex-row p-5 justify-center items-center">
                                        <div className="flex flex-col justify-center items-center text-[#A881D4]">
                                            <i className="fa-duotone fa-comments text-4xl lg:text-5xl"></i>
                                            <h3 className="text-2xl lg:text-3xl ">No chat started</h3>
                                        </div>
                                    </div>
                                </>
                            }
                            <div className="w-full lg:h-[15%] h-[100px]"></div>
                        </div>
                    </InboxScroll>
                </div>
                <div className="lg:w-1/2 lg:block hidden">
                    {
                        Object.keys(openChat).length === 0?
                        <div className="h-full w-full flex flex-col justify-center items-center">
                            <i className="fa-light fa-comments text-6xl my-2 text-[#A881D4]"></i>
                            <h2 className="text-4xl text-[#A881D4]">Chat</h2>
                        </div>
                        :
                        <ChatRoomPage closeIt={() => { setChat({}) }} user={openChat}/>
                    }
                </div>
            </motion.div>
        </>
    );
}

export default InboxPage;