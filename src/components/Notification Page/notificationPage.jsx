import NotificationCard from './Notification_card/notificationCard';
import NotificationScroll from '../../container/scroll/notificationScroll';
import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';


const NotificationPage = () => {

    const { notificationsArray } = UserAuth();

    console.log("The array: ", notificationsArray)

    return(
        <>
            <motion.div 
                className="w-full h-screen flex flex-col bg-[#c3fffc]"
                
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="w-full p-2 flex flex-row justify-center bg-white shadow-lg shadow-[#33b8b8]">
                    <i className="fa-regular fa-bell-on ml-4 text-[#33b8b8] text-2xl"></i>
                </div>
                    <div className="w-full flex flex-col h-[93.4%]">
                        <NotificationScroll>
                            {

                            }
                            <div className="h-[10vh] lg:h-20 w-full"></div>
                        </NotificationScroll>
                    </div>
            </motion.div>
        </>
    );
}

export default NotificationPage;