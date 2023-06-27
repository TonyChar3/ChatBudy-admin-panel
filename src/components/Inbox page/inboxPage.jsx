import { Link } from 'react-router-dom';
import InboxScroll from '../../container/scroll/inboxScroll';
import ChatRoomPage from './Chat room/chatroomPage';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';
import axios from 'axios';

const InboxPage = () => {

    const [openChat, setChat] = useState({});
    const [ChatArray, setArray] = useState([]);

    const { user, visitorsArray } = UserAuth();
    const handleOpenChat = () => {
        const dummy = {
            name: 'Jack',
            email: 'test@email.com'
        }
        setChat(dummy)
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
        if(user){
            setArray(visitorsArray)
        }
    },[user])
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
                            <div className="w-[95%] lg:w-5/6 flex flex-row justify-between items-center bg-white border-[1px] border-[#33b8b8] p-2 m-4 rounded-xl shadow-md shadow-[#33b8b8]">
                                <div className="p-2 ml-2 w-1/2">
                                    <h2 className="text-lg lg:text-xl">Name of contact</h2>
                                </div>
                                <div className="w-1/2 flex flex-row justify-around items-center">
                                    <i onClick={() => handleOpenChat()} className="fa-regular fa-comment text-xl lg:text-3xl active:scale-[0.90] duration-100 ease-in hidden lg:inline hover:text-[#33b8b8] cursor-pointer"></i>
                                    <Link to="/navbar/chatroom"><i className="fa-regular fa-comment text-xl lg:text-3xl active:scale-[0.90] duration-100 ease-in lg:hidden"></i></Link>
                                    <i className="fa-regular fa-trash text-xl lg:text-2xl active:scale-[0.90] duration-100 ease-in hover:text-red-500 cursor-pointer"></i>
                                </div>
                            </div>
                            <div className="w-[95%] lg:w-5/6 flex flex-row justify-between items-center bg-white border-[1px] border-[#33b8b8] p-2 m-4 rounded-xl shadow-md shadow-[#33b8b8]">
                                <div className="p-2 ml-2 w-1/2">
                                    <h2 className="text-lg lg:text-xl">Name of contact</h2>
                                </div>
                                <div className="w-1/2 flex flex-row justify-around items-center">
                                    <i onClick={() => handleOpenChat()} className="fa-regular fa-comment text-xl lg:text-3xl active:scale-[0.90] duration-100 ease-in hidden lg:inline hover:text-[#33b8b8] cursor-pointer"></i>
                                    <Link to="/navbar/chatroom"><i className="fa-regular fa-comment text-xl lg:text-3xl active:scale-[0.90] duration-100 ease-in lg:hidden"></i></Link>
                                    <i className="fa-regular fa-trash text-xl lg:text-2xl active:scale-[0.90] duration-100 ease-in hover:text-red-500 cursor-pointer"></i>
                                </div>
                            </div>
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
                        <ChatRoomPage closeIt={handleCloseChat} />
                    }
                </div>
            </motion.div>
        </>
    );
}

export default InboxPage;