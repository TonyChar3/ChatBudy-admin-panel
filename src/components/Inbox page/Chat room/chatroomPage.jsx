import { Link, useNavigate } from 'react-router-dom';
import Scroll from '../../../container/scroll/scroll';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import ChatBubble from '../Chat Bubbles/ChatBubble';
import axios from 'axios';
 
const ChatRoomPage = (props) => {

    const { user, user_hash, chat_visitor } = UserAuth();
    const [room_name, setName] = useState('');
    const [msg_array, setArray] = useState([]);
    const [ws_connect, setWS] = useState('');

    const navigate = useNavigate()

    const handleClose = () => {
        if(ws_connect){
            ws_connect.close()
        }
        props.closeIt()
    }

    const handleWSmobile = () => {
        if(ws_connect){
            ws_connect.close()
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

    useEffect(() => {
        if(props.user && user_hash){
            props.user.email? setName(props.user.email) : setName(props.user.id)
            // fetch the chat room and set the messages array
            handleFetchRoom(user_hash, props.user.id)
        } else if (Object.keys(chat_visitor).length > 0 && user_hash){
            console.log(user)
            chat_visitor.visitor_name? setName(chat_visitor.visitor_name) : setName(chat_visitor.visitor_id)
            // fetch the chat room and set the messages array
            handleFetchRoom(user_hash, chat_visitor.visitor_id)
        } else{
            navigate('/navbar/inbox')
        }
    },[props.user, chat_visitor, user_hash])

    useEffect(() => {
        if(ws_connect){
            console.log(ws_connect)
            ws_connect.addEventListener('open',(event) => {
                console.log(event)
                console.log('Connection established with visitor')
            });

            ws_connect.addEventListener('message',(event) => {
                const chat = JSON.parse(event.data)
                console.log(chat)
            });

            ws_connect.addEventListener('error',(event) => {
                console.log('WebSocket error: ', event)
            });
            return () => {
                ws_connect.close();
                console.log("Owner connection cut")
            }
        }
    },[ws_connect])

    return(
        <>
            <motion.div 
                className="w-full h-full flex flex-col justify-start items-center"

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
                    <div className="grid grid-cols-1">
                        {
                            msg_array.length ?
                                <div className="h-[12vh]"></div>
                            :
                            <div className="h-full w-full flex flex-row p-5 justify-center items-center">
                                <i className="fa-light fa-comments text-6xl my-2 text-[#33b8b8] opacity-5"></i>
                            </div>
                        }
                        
                    </div>
                </Scroll>
                <div className="absolute bottom-10 lg:static w-full flex flex-row justify-center items-center">
                    <div className="bottom-10 w-5/6 lg:m-4 p-3 bg-[#33b8b8] rounded-xl border-[1px] border-[#33b8b8] flex flex-row justify-center items-center z-20">
                        <input type="text" placeholder="send a chat..." className="w-5/6 p-2 rounded-lg outline-none" />
                        <i className="fa-sharp fa-light fa-paper-plane-top ml-6 text-2xl text-white active:scale-[0.90] focus:scale-[1.1] duration-100"></i>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default ChatRoomPage;