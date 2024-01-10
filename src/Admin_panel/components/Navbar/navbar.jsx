import { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import NotificationPage from '../Notification Page/notificationPage';
import { CleanUpReadNotification } from '../../../context/utils/inboxSectionFunctions';
import { UserAuth } from '../../../context/AuthContext';
import axios from 'axios';

const NavBar = () => {

    const { 
        notification_array, 
        seen_notification_array, 
        setSeenNotificationArray, 
        user, 
        setModalOpen, 
        setModalMsg, 
        setModalErrorMode,
        mobile_chat_room,
        LogOut
    } = UserAuth();
    const [notification_open, setNotifPage] = useState(false);
    const [unread_notif, setUnReadNum] = useState(0);

    const handleOpenNotification = async() => {
        setNotifPage(handleOpenNotif => !handleOpenNotif);
        try{
            if(Array.isArray(seen_notification_array) && seen_notification_array.length > 0){
                const clean_up = await CleanUpReadNotification(seen_notification_array, user.accessToken);
                if(clean_up.error){
                    throw new Error(`${clean_up.error_msg}`);
                }
                setSeenNotificationArray([]);
            }
        } catch(err){
            console.log(err)
            setModalErrorMode(true);
            setModalOpen(true);
            setModalMsg('ERROR (500): Unable to clean up the notifications. Please reload the app or contact support')
        }
    }

    useEffect(() => {
        if(Array.isArray(notification_array)){
            let acc = 0
            notification_array.forEach(notif => {
                if(notif.read === false){
                    acc += 1
                }
            })
            setUnReadNum(acc)
        }
    },[notification_array])

    return(
        <>
            <audio id="notification_sound" src="https://ik.imagekit.io/bqofr3ncj/ChatBudy.io_2024-01-10_15_24/notifications-sound-chatbudy1_w5vh0i.mp3?updatedAt=1704919570387" muted="muted" autoPlay=""></audio>
            <div className="lg:flex lg:flex-row h-full w-full">
                <nav className={`absolute bottom-10 lg:static w-full lg:w-[6%] lg:h-full flex flex-col justify-center items-center z-60 ${Object.keys(mobile_chat_room).length > 0? 'hidden' : ''}`}>
                    <div className="relative w-[95%] lg:mb-2 lg:mt-2 lg:ml-3 lg:w-full lg:h-full bg-[#6C2E9C] flex flex-row lg:flex-col justify-between items-center rounded-2xl border-[1px] border-white shadow-custom-shadow-input rounded-xl">
                        <div className="w-full lg:h-2/5 flex flex-row lg:flex-col justify-around items-center text-white">
                            <div className="w-full flex flex-row justify-center items-center p-2 lg:border-t-2 lg:border-[#754C95]">
                                <NavLink to="/navbar/visitors" className="duration-100 ease-in-out active:scale-[0.90]">
                                    {({isActive}) => (
                                        <i onClick={notification_open? handleOpenNotification : undefined} 
                                        className={`${isActive && !notification_open? 'fa-solid':'fa-regular'} fa-people-simple text-3xl`}></i>
                                    )}
                                </NavLink>
                            </div>
                            <div className="w-full flex flex-row justify-center items-center p-2">
                                <NavLink to="/navbar/inbox" className="duration-100 ease-in-out active:scale-[0.90]">
                                    {({isActive}) => (
                                        <i onClick={notification_open? handleOpenNotification : undefined} 
                                        className={`${isActive && !notification_open? 'fa-duotone':'fa-regular'} fa-inbox text-3xl`}></i>
                                    )}
                                </NavLink>
                            </div>
                            <div className="w-full flex flex-row justify-center items-center p-2 lg:border-b-2 lg:border-[#754C95]">
                                <NavLink to="/navbar/analytics" className="hidden lg:block duration-100 ease-in-out active:scale-[0.90]">
                                    {({isActive}) => (
                                        <i onClick={notification_open? handleOpenNotification : undefined} 
                                        className={`${isActive && !notification_open? 'fa-solid':'fa-regular '} fa-chart-mixed text-3xl`}></i>
                                    )}
                                </NavLink>
                            </div>
                        </div>
                        <div className="hidden lg:block w-full text-center">
                            <i className="fa-sharp fa-solid fa-comments text-4xl text-white"></i>
                        </div>
                        <div className="w-full flex flex-row lg:flex-col lg:h-2/5 justify-around items-center text-white">
                            <div className="w-full flex flex-row justify-center items-center p-2 lg:border-t-2 lg:border-[#754C95]">
                                <span className="flex flex-row cursor-pointer">
                                    <h4 className={`${unread_notif === 0? 'hidden' : ''} text-sm`}>{unread_notif}</h4>
                                    <i onClick={handleOpenNotification} className={`${notification_open? "fa-solid fa-xmark" : "fa-regular fa-bell"} ${notification_open? "rotate-180" : ''} transition-transform text-3xl duration-100 ease-in-out active:scale-[0.90]`}></i>
                                </span>
                            </div>
                            <div className="w-full flex flex-row justify-center items-center p-2">
                                <NavLink  to="/navbar/setting" className="duration-100 ease-in-out active:scale-[0.90]">
                                    {({isActive}) => (
                                        <i onClick={notification_open? handleOpenNotification : undefined} 
                                        className={`${isActive && !notification_open? 'fa-solid' : 'fa-light'} fa-gears text-3xl`}></i>
                                    )}
                                </NavLink>
                            </div>
                            <div className="w-full text-center p-2 lg:border-b-2 lg:border-[#754C95]">
                                <i onClick={() => LogOut()} className="fa-solid fa-right-from-bracket text-lg lg:text-2xl text-[#938C9E] hover:text-[#E94E77] active:scale-[0.90] cursor-pointer"></i>
                            </div>
                        </div>
                    </div>
                </nav>
                {notification_open && 
                    <NotificationPage 
                        animationClass={notification_open? 'animate-fade-in-down':'animate-fade-out-up'}
                        open_close_function={handleOpenNotification}
                    />
                }
                <Outlet />
            </div>
        </>

    );
}

export default NavBar;