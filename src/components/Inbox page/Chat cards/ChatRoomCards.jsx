import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import axios from 'axios';

const ChatRoomCards = ({ open_chat_function, visitor_name, visitor_id }) => {

    const { setChatRoom, ws_link, setVisitorRoom, setWS_Context } = UserAuth();

    const [chat_visitor_name, setName] = useState('');

    const handleOpenChat = () => {
        if(ws_link){
            ws_link.close()
            setChatRoom({})
            setVisitorRoom({})
            setWS_Context('')
            const chat_room = {
                visitor_id: visitor_id,
                visitor_name: visitor_name
            }
            open_chat_function(chat_room)
        } else {
            const chat_room = {
                visitor_id: visitor_id,
                visitor_name: visitor_name
            }
            open_chat_function(chat_room)
        }
    }

    const handleMobileRoomState = () => {
        if(ws_link.length > 0){
            ws_link.close();
        }
        const room_state = {
            visitor_id: visitor_id,
            visitor_name: visitor_name
        }
        setChatRoom(room_state)
    }
    
    useEffect(() => {
        if(visitor_id){
            visitor_name? setName(visitor_name) : setName(visitor_id)
        }
    },[visitor_id])

    return(
        <>
            <div className="relative w-[95%] lg:w-5/6 flex flex-row justify-between items-center bg-white border-[1px] border-[#33b8b8] p-2 m-4 rounded-xl shadow-md shadow-[#33b8b8]">
                <div className="p-2 ml-2 w-1/2">
                    <h2 className="text-lg lg:text-xl">{chat_visitor_name}</h2>
                </div>
                <>
                    <div className="w-1/3 flex flex-row justify-around items-center">
                        <i onClick={handleOpenChat} className="fa-regular fa-comment text-xl lg:text-3xl active:scale-[0.90] duration-100 ease-in hidden lg:inline hover:text-[#33b8b8] cursor-pointer"></i>
                        <Link to="/navbar/chatroom" onClick={handleMobileRoomState}><i className="fa-regular fa-comment text-xl lg:text-3xl active:scale-[0.90] duration-100 ease-in lg:hidden"></i></Link>
                    </div>
                    {/* <div className='w-1/6 p-1 flex flex-row justify-end items-center'>
                        <i className="fa-light fa-handshake text-xl lg:text-2xl cursor-pointer transform-all active:scale-[0.90] ease"></i>
                    </div> */}
                </>
            </div>
        </>
    )
}

export default ChatRoomCards;