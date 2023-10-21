import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';

const ChatRoomCards = ({ open_chat_function, visitor_name, visitor_id }) => {

    const { 
        setMobileChatRoom, 
        ws_link, 
        setDeskTopChatRoom, 
        setWSLink } = UserAuth();

    const [chat_visitor_name, setName] = useState('');

    const OpenChat = () => {
        if(ws_link){
            ws_link.close()
            setMobileChatRoom({})
            setDeskTopChatRoom({})
            setWSLink('')
            open_chat_function({
                visitor_id: visitor_id,
                visitor_name: visitor_name
            });
        } else {
            open_chat_function({
                visitor_id: visitor_id,
                visitor_name: visitor_name
            });
        }
    }

    const MobileRoomState = () => {
        if(ws_link.length > 0){
            ws_link.close();
        } 
        setMobileChatRoom({ 
            visitor_id: visitor_id, 
            visitor_name: visitor_name 
        });
    }
    
    useEffect(() => {
        if(visitor_id){
            visitor_name? 
            setName(visitor_name) 
            : 
            setName(visitor_id)
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
                        <i onClick={OpenChat} className="fa-regular fa-comment text-xl lg:text-3xl active:scale-[0.90] duration-100 ease-in hidden lg:inline hover:text-[#33b8b8] cursor-pointer"></i>
                        <Link to="/navbar/chatroom" onClick={MobileRoomState}><i className="fa-regular fa-comment text-xl lg:text-3xl active:scale-[0.90] duration-100 ease-in lg:hidden"></i></Link>
                    </div>
                </>
            </div>
        </>
    )
}

export default ChatRoomCards;