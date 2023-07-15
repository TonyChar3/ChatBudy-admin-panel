import { Link, useNavigate } from 'react-router-dom';
import Scroll from '../../../container/scroll/scroll';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import ChatBubble from '../Chat Bubbles/ChatBubble';
import axios from 'axios';
 
const ChatRoomPage = (props) => {

    const { user, user_hash, chat_visitor, setWS_Context, setVisitorRoom, setChatRoom} = UserAuth();
    const [room_name, setName] = useState('');
    const [visitorID, setVisitorID] = useState('');
    const [msg_array, setArray] = useState([]);
    const [ws_connect, setWS] = useState('');
    const [chat_input, setInputValue] = useState('');
    const [sentIsTyping, setIsTyping] = useState(false);
    const TypingTimeoutRef = useRef(null)

    const data_array = [];

    const navigate = useNavigate()

    const handleInputValue = (e) => {
        setInputValue(e)
        if(ws_connect){
            if(chat_input !== '' && !sentIsTyping){
                ws_connect.send(JSON.stringify({ type: 'typing', status: true }))
                setIsTyping(true)
            } else if (chat_input === ''){
                setIsTyping(false)
            }
        }
    }

    const handleClose = () => {
        if(ws_connect){
            ws_connect.close()
        }
        props.closeIt()
    }

    const handleWSmobile = () => {
        if(ws_connect){
            ws_connect.close()                
            setChatRoom({});
            setVisitorRoom({});
            setArray([])
        }
    }

    const handleFetchRoom = async(hash, id) => {
        try{
            const response = await axios.post('http://localhost:8080/chat/user-auth-ws',{
                data: {
                    visitor_id: id,
                    user_hash: hash 
                }
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ user.accessToken
                }
            });
            if(response){
                const socket = new WebSocket(`ws://localhost:8080?id=${response.data.wss_jwt}`)
                setWS(socket)
            }
        } catch(err){
            console.log(err)
        }
    }

    const handleSendChat = () => {
        if(chat_input){
            // get the chat message from the input
            if(chat_input !== ''){
                // create the new chat object           
                const new_chat = {
                    senderType: 'agent',
                    content: chat_input
                };
                if(ws_connect){
                    // send it to the websocket server
                    ws_connect.send(JSON.stringify(new_chat));
                    setInputValue('')
                }
            } else if(!chat_input || chat_input === ''){
                chat_input === ''
                setIsTyping(false)
            }
        }
    }

    useEffect(() => {
        if(props.user && user_hash){
            props.user.visitor_name? setName(props.user.visitor_name) : setName(props.user.visitor_id)
            setVisitorID(props.user.visitor_id)
            // fetch the chat room and set the messages array
            handleFetchRoom(user_hash, props.user.visitor_id)
        } else if (Object.keys(chat_visitor).length > 0 && user_hash){
            chat_visitor.visitor_name? setName(chat_visitor.visitor_name) : setName(chat_visitor.visitor_id)
            setVisitorID(chat_visitor.visitor_id)
            // fetch the chat room and set the messages array
            handleFetchRoom(user_hash, chat_visitor.visitor_id)
        } else{
            navigate('/navbar/inbox')
        }
    },[props.user, chat_visitor, user_hash])

    useEffect(() => {
        if(ws_connect){
            // set context for the WebSocket connection
            setWS_Context(ws_connect);
            ws_connect.addEventListener('open',(event) => {
                console.log('Connection established with visitor')
            });

            ws_connect.addEventListener('message',(event) => {
                const data = JSON.parse(event.data)
                if(Array.isArray(data)){
                    data.forEach(msg => {
                        setArray((prevArray) => [...prevArray, msg])
                    });
                } else {
                    if(data.type === '...' && data.status === true){
                        data_array.push(data)
                        setArray((prevArray) => [...prevArray, data])
                        clearTimeout(TypingTimeoutRef.current)
                        TypingTimeoutRef.current = setTimeout(() => {
                            setArray((prevArray) => prevArray.filter((msg) => msg !== data));
                        },5000)
                    } else {
                        setArray((prevArray) => prevArray.filter((msg) => msg.sender_type !== data.type));
                        data_array.push(data)
                        setArray((prevArray) => [...prevArray, data])
                    }
                }
            });

            ws_connect.addEventListener('error',(event) => {
                console.log('WebSocket error: ', event)
            });
            return () => {
                ws_connect.close();
                setArray([])
                console.log("Owner connection cut")
            }
        } 
    },[ws_connect])

    return(
        <>
            <motion.div 
                className="w-full h-screen lg:h-full flex flex-col justify-start items-center"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="w-full flex flex-row p-2 justify-start items-center border-2 border-[#33b8b8] shadow-md shadow-[#33b8b8]">
                    <i onClick={handleClose} className="fa-regular fa-circle-xmark text-xl mx-3 text-[#33b8b8] hidden lg:inline cursor-pointer"></i>
                    <Link to="/navbar/inbox" onClick={handleWSmobile}><i className="fa-solid fa-chevron-left text-xl mx-3 text-[#33b8b8] lg:hidden"></i></Link>
                    <h2 className="text-xl text-[#33b8b8]">{room_name}</h2>
                </div>
                <Scroll>
                    <div className="lg:max-h-full w-full grid grid-cols-1">
                        {
                            msg_array.length ?
                            <>
                            {
                                msg_array.map((msg, i) => (
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
                        <input onChange={(e) => handleInputValue(e.target.value) } value={chat_input} type="text" placeholder="send a chat..." className="w-5/6 p-2 rounded-lg outline-none" />
                        <i onClick={() => handleSendChat()} className="fa-sharp fa-light fa-paper-plane-top ml-6 text-2xl text-white active:scale-[0.90] focus:scale-[1.1] duration-100"></i>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default ChatRoomPage;