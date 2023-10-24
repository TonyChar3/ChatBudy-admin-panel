import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { UserAuth } from '../../../../context/AuthContext';

const ChatRoomCards = ({ open_chat_function, visitor_name, visitor_id }) => {

    const { 
        setMobileChatRoom, 
        ws_link, 
        setDeskTopChatRoom, 
        setWSLink } = UserAuth();

    const [chat_visitor_name, setName] = useState('');
    const [show_full_name, setFullName] = useState(false);
    const [isNameTruncated, setIsTruncated] = useState(false);
    const truncatedNameRef = useRef(null);

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

    useEffect(() => {
        if(truncatedNameRef.current){
            setIsTruncated(truncatedNameRef.current.scrollWidth > truncatedNameRef.current.clientWidth);
        }
    },[chat_visitor_name])

    return(
        <>
            <div className="relative p-2 m-4 lg:p-3 w-[95%] md:w-4/6 lg:w-5/6 flex flex-row justify-between items-center bg-white border-[1px] border-[#6C2E9C] rounded-3xl shadow-custom-shadow-input">
                <i onClick={() => setFullName(false)} className={`${show_full_name && isNameTruncated? 'mr-2 cursor-pointer' : 'hidden'} fa-light fa-circle-xmark text-[#A881D4] text-xl duration-300`}></i>
                <div className={`${show_full_name? 'w-full' : 'w-1/2'} p-2 ml-2`}>
                    <h2 ref={truncatedNameRef} onClick={() => setFullName(true)} className={`${show_full_name && isNameTruncated? '' : 'truncate'} ${isNameTruncated? 'cursor-pointer' : ''} text-lg md:text-xl lg:text-2xl text-[#A881D4]`}>{chat_visitor_name}</h2>
                </div>
                <div className={`${show_full_name && isNameTruncated? 'hidden' : ''} w-1/3 flex flex-row justify-around items-center`}>
                    <i onClick={OpenChat} className="fa-regular fa-comment text-4xl active:scale-[0.90] duration-100 ease-in hidden lg:inline text-[#A881D4] cursor-pointer"></i>
                    <Link to="/navbar/chatroom" onClick={MobileRoomState}>
                        <i className="fa-regular fa-comment text-[#A881D4] text-2xl md:text-2xl active:scale-[0.90] duration-100 ease-in lg:hidden"></i>
                    </Link>
                </div>
            </div>
            <div className="w-[40%] h-[2px] bg-[#A881D4]"></div>
        </>
    )
}

export default ChatRoomCards;