import { Link, useNavigate } from 'react-router-dom';
import Scroll from '../../../container/scroll/scroll';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import ChatBubble from '../Chat Bubbles/ChatBubble';
import { FetchChatRoom } from '../../../context/utils/inboxSectionFunctions';
import { sanitizeInputValue } from '../../../context/utils/security';
import { useWebSocket } from '../../../hooks/useWebSocket';
 
const ChatRoomPage = (props) => {

    const { 
        user, 
        user_hash, 
        mobile_chat_room, 
        setWSLink, 
        setDeskTopChatRoom, 
        setMobileChatRoom, 
        setModalOpen, 
        setModalMsg, 
        setModalErrorMode} = UserAuth();

    const [room_name, setName] = useState('');
    const [ui_state, setUIstate] = useState({
        room_name: '',
        visitor_id: '',
        messages_array: [],
        ws_connect_link: '',
        chat_input: '',
        send_is_typing: false
    });
    const [ws, data] = useWebSocket(ui_state.ws_connect_link);

    const TypingTimeoutRef = useRef(null)

    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    const isMobileView = windowWidth <= 768;

    const InputChange = (e) => {
        // sanitize the input value
        const sanitize_value = sanitizeInputValue(e);
        setUIstate(prevValue => ({
            ...prevValue,
            chat_input: sanitize_value
        }));
        // set the isTyping ...
        if(ui_state.chat_input !== '' && !ui_state.send_is_typing){
            ws.send(JSON.stringify({ type: 'typing', status: true }))
            setUIstate(prevValue => ({
                ...prevValue,
                send_is_typing: true
            }));
        } else if (ui_state.chat_input === ''){
            setUIstate(prevValue => ({
                ...prevValue,
                send_is_typing: false
            }));
        }
    }

    const CloseRoom = () => { 
        if(isMobileView){
            setMobileChatRoom({});
            setDeskTopChatRoom({});
        } else {
            props.closeIt() 
        }
        ws.close()             
        setUIstate(prevValue => ({
            ...prevValue,
            messages_array: []
        }));
    }

    const handleFetchRoom = async(user_hash, visitor_id) => {
        const connect_chatroom = await FetchChatRoom(visitor_id, user_hash, user.accessToken);
        if(connect_chatroom.error){
            // show a message for the user
            setModalOpen(true);
            setModalErrorMode(true);
            setModalMsg('ERROR: Chatroom currently unavaible. Please re-try or contact support.');
            // close desktop or mobile version of the chatroom
            setMobileChatRoom({});
            setDeskTopChatRoom({});
            setUIstate(prevValue => ({
                ...prevValue,
                messages_array: []
            }));
            if(!isMobileView){
                props.closeIt();
            }
        }
        // set the new websocket connection link
        setUIstate(prevValue => ({
            ...prevValue,
            ws_connect_link: `ws://localhost:8080?id=${connect_chatroom.data.wss_jwt}`
        }));
    }

    const SendChat = () => {
        // if there's nothing written or the chat input isnt set
        if(!ui_state.chat_input || ui_state.chat_input === ''){
            setUIstate(prevValue => ({
                ...prevValue,
                send_is_typing: false
            }));
        }    
        // send it to the websocket server
        ws.send(JSON.stringify({ senderType: 'agent', content: ui_state.chat_input }));
        setUIstate(prevValue => ({
            ...prevValue,
            chat_input: ''
        }));
    }

    useEffect(() => {
        if(props.user && user_hash){
            props.user.visitor_name? 
            setUIstate(prevValue => ({
                ...prevValue,
                room_name: props.user.visitor_name,
                visitor_id: props.user.visitor_id
            }))
            :
            setUIstate(prevValue => ({
                ...prevValue,
                room_name: props.user.visitor_id,
                visitor_id: props.user.visitor_id
            }))
            // fetch the chat room and set the messages array
            handleFetchRoom(user_hash, props.user.visitor_id)
        } else if (Object.keys(mobile_chat_room).length > 0 && user_hash){
            mobile_chat_room.visitor_name? setName(mobile_chat_room.visitor_name) : setName(mobile_chat_room.visitor_id)
            setUIstate(prevValue => ({
                ...prevValue,
                visitor_id: mobile_chat_room.visitor_id
            }));
            // fetch the chat room and set the messages array
            handleFetchRoom(user_hash, mobile_chat_room.visitor_id)
        } else{
            navigate('/navbar/inbox')
        }
    },[props.user, mobile_chat_room, user_hash])

    useEffect(() => {
        if(ws){
            setWSLink(ws);// context api
            if(Array.isArray(data)){
                data.forEach(msg => {
                    setUIstate(prevValue => ({
                        ...prevValue,
                        messages_array: [...prevValue.messages_array, msg]
                    }));
                });
            } else {
                if(data.type === '...' && data.status === true){
                    setUIstate(prevValue => ({
                        ...prevValue,
                        messages_array: [...prevValue.messages_array, data]
                    }));
                    clearTimeout(TypingTimeoutRef.current)
                    TypingTimeoutRef.current = setTimeout(() => {
                        setUIstate(prevValue => ({
                            ...prevValue,
                            messages_array: prevValue.messages_array.filter(msg => msg !== data)
                        }));
                    },5000)
                } else {
                    setUIstate(prevValue => ({
                        ...prevValue,
                        messages_array: prevValue.messages_array.filter((msg) => msg.sender_type !== data.type)
                    }));
                    setUIstate(prevValue => ({
                        ...prevValue,
                        messages_array: [...prevValue.messages_array, data]
                    }));
                }
            }
        }
    },[data])

    useEffect(() => {
        if(!isMobileView){
            navigate('/navbar/inbox')
        }
    },[isMobileView])

    return(
        <>
            <motion.div 
                className="w-full h-screen lg:h-full flex flex-col justify-start items-center"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="w-full flex flex-row p-2 justify-start items-center border-2 border-[#33b8b8] shadow-md shadow-[#33b8b8]">
                    <i onClick={CloseRoom} className="fa-regular fa-circle-xmark text-xl mx-3 text-[#33b8b8] hidden lg:inline cursor-pointer"></i>
                    <Link to="/navbar/inbox" onClick={CloseRoom}><i className="fa-solid fa-chevron-left text-xl mx-3 text-[#33b8b8] lg:hidden"></i></Link>
                    <h2 className="text-xl text-[#33b8b8]">{ui_state.room_name}</h2>
                </div>
                <Scroll>
                    <div className="lg:max-h-full w-full grid grid-cols-1">
                        {
                            ui_state.messages_array.length ?
                            <>
                            {
                                 ui_state.messages_array.map((msg, i) => (
                                    <ChatBubble key={i} text={msg.text || msg.type} sender_type={msg.sender_type || msg.type} />
                                ))
                            }
                            
                            </>
                            :
                            <div className="h-full w-full flex flex-row p-5 justify-center items-center">
                                <i className="fa-light fa-comments text-6xl my-2 text-[#33b8b8] opacity-5"></i>
                            </div>
                        }
                        <div className="h-[15vh]"></div>
                    </div>
                </Scroll>
                <div className="absolute bottom-10 w-full lg:w-[45%] flex flex-row justify-center items-center">
                    <div className="bottom-10 w-5/6 lg:w-full p-3 bg-[#33b8b8] rounded-xl border-[1px] border-[#33b8b8] flex flex-row justify-center items-center z-20">
                        <input onChange={(e) => InputChange(e.target.value) } value={ui_state.chat_input} type="text" placeholder="send a chat..." className="w-5/6 p-2 rounded-lg outline-none" />
                        <i onClick={() => SendChat()} className="fa-sharp fa-light fa-paper-plane-top ml-6 text-2xl text-white active:scale-[0.90] focus:scale-[1.1] duration-100 cursor-pointer"></i>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default ChatRoomPage;