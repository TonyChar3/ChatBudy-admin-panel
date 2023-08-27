import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import NotificationPage from '../Notification Page/notificationPage';
import { UserAuth } from '../../context/AuthContext';
import axios from 'axios';

const NavBar = () => {

    const { 
        notificationsArray, 
        seen_notifications, 
        setSeenNotif, 
        user, 
        setModalOpen, 
        setModalMsg, 
        setModalMode 
    } = UserAuth();
    const [handleOpenNotif, setNotifPage] = useState(false);
    const [unread_notif, setUnReadNum] = useState(0);

    const handleOpenNotification = async() => {
        setNotifPage(handleOpenNotif => !handleOpenNotif)
        try{
            if(Array.isArray(seen_notifications) && seen_notifications.length > 0){
                const response  = await axios.delete('http://localhost:8080/user/clean-up-notification', {
                    data: {
                        notif_array: seen_notifications
                    },
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                });
                if(response){
                    setSeenNotif([])
                }
            }
        } catch(err){
            console.log(err)
            setModalMode(true);
            setModalOpen(true);
            setModalMsg('ERROR (500): Unable to clean up the notifications. Please reload the app or contact support')
        }
    }

    useEffect(() => {
        if(Array.isArray(notificationsArray)){
            let acc = 0
            notificationsArray.forEach(notif => {
                if(notif.read === false){
                    acc += 1
                }
            })
            setUnReadNum(acc)
        }
    },[notificationsArray])

    return(
        <>
            <div className="lg:flex lg:flex-row h-full w-full">
                <div className="absolute bottom-10 lg:static w-screen lg:w-[4%] lg:h-screen flex flex-col justify-center items-center z-20 lg:z-10">
                    <div className="bottom-10 right-0 w-5/6 lg:w-full lg:h-full bg-white flex flex-row lg:flex-col justify-between items-center p-2 rounded-2xl lg:rounded-none border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8]">
                        <div className="w-2/5 lg:h-1/4 flex flex-row lg:flex-col justify-around items-center">
                            <Link to="/navbar/visitors" className="duration-100 ease-in-out active:scale-[0.90]"><i onClick={handleOpenNotif? handleOpenNotification : undefined} className="fa-solid fa-people-simple text-3xl text-[#33b8b8]"></i></Link>
                            <Link to="/navbar/inbox" className="duration-100 ease-in-out active:scale-[0.90]"><i onClick={handleOpenNotif? handleOpenNotification : undefined} className="fa-regular fa-inbox text-3xl text-[#33b8b8]"></i></Link>
                        </div>
                        <div className="w-2/5 flex flex-row lg:flex-col lg:h-1/5 justify-around items-center">
                            <span className="flex flex-row text-[#33b8b8] cursor-pointer"><h4 className={`${handleOpenNotif? "hidden" : ''} ${unread_notif === 0? 'hidden' : ''} text-sm`}>{unread_notif}</h4><i onClick={handleOpenNotification} className={`${handleOpenNotif? "fa-solid fa-xmark" : "fa-regular fa-bell"} ${handleOpenNotif? "rotate-180" : ''} transition-transform text-3xl duration-100 ease-in-out active:scale-[0.90]`}></i></span>
                            <Link  to="/navbar/setting" className="duration-100 ease-in-out active:scale-[0.90]"><i onClick={handleOpenNotif? handleOpenNotification : undefined} className="fa-light fa-gears text-3xl text-[#33b8b8]"></i></Link>
                        </div>
                    </div>
                </div>
                {handleOpenNotif && 
                    <NotificationPage 
                        animationClass={handleOpenNotif? 'animate-fade-in-down':'animate-fade-out-up'}
                        open_close_function={handleOpenNotification}
                    />
                }
                <Outlet />
            </div>
        </>

    );
}

export default NavBar;