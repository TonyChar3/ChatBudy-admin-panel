import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserAuth } from '../../../context/AuthContext';

const NotificationCard = ({ notif_id, notif_title, notif_content, sent_from, notif_date, notif_action, open_close_function }) => {

    const { seen_notifications, setSeenNotif, visitorsArray, setVisitorRoom, setChatRoom } = UserAuth();

    const navigate = useNavigate();

    const [card_clicked, setScale] = useState(false);
    const [notif_sent_time, setTime] = useState(false);

    const handleUserInteraction = (read_notif) => {
        setScale(true)
        if(!seen_notifications.includes(read_notif)) {
            setSeenNotif(prevArray => [...prevArray, read_notif]);
        }
    }

    const handleFastReply = () => {
        if(notif_action){
            let chat_obj = {};
            visitorsArray.forEach(visitor => {
                if(visitor._id === notif_action){
                    chat_obj = {
                        visitor_id: notif_action,
                        visitor_name: visitor.email
                    }
                    if(window.innerWidth <= 500){
                        setChatRoom(chat_obj)
                        navigate("/navbar/chatroom")
                    } else if( window.innerWidth > 500){
                        setVisitorRoom(chat_obj)
                        navigate("/navbar/inbox")
                    }
                }
            })
            open_close_function()
        }
    }

    const handleCloseNotification = (e) => {
        e.stopPropagation()
        setScale(false)
    }

    const handleNotificationSentTime = (time_entered) => {
        const currentDate = new Date()
        const visitorCreatedAt = new Date(time_entered);

        visitorCreatedAt.toLocaleDateString() === currentDate.toLocaleDateString()? 
        setTime('today') 
        : 
        setTime(`${visitorCreatedAt.toLocaleDateString()}`)
    }

    useEffect(() => {
        handleNotificationSentTime(notif_date)
    },[])

    return(
        <>
            <div onClick={() => handleUserInteraction(notif_id)} className={`p-2 bg-gray-500 rounded-lg transition-transform ${card_clicked? 'absolute w-full h-full z-50 top-0 left-0 bg-white bg-opacity-100 mx-0 my-0' : 'w-[95%] mt-4 lg:my-4 mx-auto bg-opacity-10 cursor-pointer'} duration-500 ease`}>
                <div>

                    <p className={`font-normal my-1 lg:text-lg ${card_clicked? 'p-1 text-2xl' : 'text-md'}`}>{notif_title}</p>
                </div>
                {
                    card_clicked ?
                    <motion.div
                        className="p-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    >
                        <h3 className="text-lg my-2 text-[#33b8b8]">{notif_content}</h3>
                        <div className="my-4 w-full">
                            <h3 className=" text-sm my-1 text-[#c0c2c4]">from: {sent_from}</h3>
                            <h3 className="text-sm text-[#c0c2c4]">sent: {notif_sent_time}</h3>
                            <div className="my-2 p-2 w-full flex flex-row justify-around items-center">
                                {notif_action?<i onClick={() => handleFastReply()} className="fa-sharp fa-light fa-reply mr-4 text-[#33b8b8] text-2xl cursor-pointer"></i>:''}
                                <i onClick={(e) => handleCloseNotification(e)}  className="fa-solid fa-xmark-large text-[#f21f23] text-xl cursor-pointer"></i>
                            </div>
                        </div>
                    </motion.div>
                    :
                    <></>
                }      
            </div>
        </>
    )
}
export default NotificationCard;