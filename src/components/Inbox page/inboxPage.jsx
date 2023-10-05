import InboxScroll from '../../container/scroll/inboxScroll';
import ChatRoomPage from './Chat room/chatroomPage';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';
import ChatRoomCards from './Chat cards/ChatRoomCards';

const InboxPage = () => {
    const [openChat, setChat] = useState({});

    const { visitorsArray, visitor_chat_room, setModalOpen, setModalMode, setModalMsg } = UserAuth();

    const handleOpenChat = (data) => {
        if(data){
            setChat(data)
        }
    }

    const handleCloseChat = () => {
        setChat({})
    }

    useEffect(() => {
        if(Object.keys(visitor_chat_room).length > 0){
            setChat(visitor_chat_room);// Pass the state of the chatroom for desktop
        } else if(!visitor_chat_room) {
            setModalOpen(true);
            setModalMode(true);
            setModalMsg('ERROR (500): Unable to load the inbox. Please reload the app or contact support');
        }
    },[visitor_chat_room])

    return(
        <>
            <motion.div 
                className="h-full w-full flex"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="h-full w-full lg:w-1/2 flex flex-col items-center bg-[#c3fffc]">
                    <InboxScroll>
                        <div className="w-full flex flex-col justify-center lg:p-5 lg:justify-start items-center">
                            {
                                visitorsArray.length ? 
                                visitorsArray.map((visitors, i) => (
                                    <ChatRoomCards key={i} open_chat_function={handleOpenChat} visitor_name={visitors.email} visitor_id={visitors._id}/>
                                ))
                                :
                                <div className="h-full w-full flex flex-row p-5 justify-center items-center">
                                    <h3 className="text-xl lg:text-3xl ">No chat... wait for visitors</h3>
                                </div>
                            }
                            <div className="w-full lg:h-[15%] h-[100px]"></div>
                        </div>
                    </InboxScroll>
                </div>
                <div className="lg:w-1/2 lg:block hidden">
                    {
                        Object.keys(openChat).length === 0?
                        <div className="h-full w-full flex flex-col justify-center items-center">
                            <i className="fa-light fa-comments text-6xl my-2 text-[#33b8b8]"></i>
                            <h2 className="text-4xl text-[#33b8b8]">Chat</h2>
                        </div>
                        :
                        <ChatRoomPage closeIt={handleCloseChat} user={openChat}/>
                    }
                </div>
            </motion.div>
        </>
    );
}

export default InboxPage;