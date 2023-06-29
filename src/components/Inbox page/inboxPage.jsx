import { Link } from 'react-router-dom';
import InboxScroll from '../../container/scroll/inboxScroll';
import ChatRoomPage from './Chat room/chatroomPage';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';
import ChatRoomCards from './Chat cards/ChatRoomCards';
import axios from 'axios';

const InboxPage = () => {

    const [openChat, setChat] = useState({});
    const [ChatArray, setArray] = useState([]);

    const { user, visitorsArray } = UserAuth();
    const handleOpenChat = (data) => {
        if(data){
            console.log("open this room", data.id)
            setChat(data)
        }
    }

    const handleCloseChat = () => {
        setChat({})
    }

    const handleDeleteChat = async() => {
        try{
            // this will remove the chatroom + the visitor
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        if(visitorsArray.length > 0){
            console.log(visitorsArray)
        }
    },[visitorsArray])
    return(
        <>
            <motion.div 
                className="w-screen flex lg:flex-row"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="h-screen w-screen lg:w-1/2 flex flex-col justify-center items-center bg-[#c3fffc]">
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
                        </div>
                        <div className="h-[10vh]"></div>
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