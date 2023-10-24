import { Link } from 'react-router-dom';
import { useState } from 'react';
import AccountSection from './Account/accountSection';
import InstallationSection from './Installation/installationSection';
import CustomizationSection from './widget_style/widgetStylingSection';
import ChatRoomStylingSection from './chatroom_style/chatroomStyling';
import { motion } from 'framer-motion';
import { UserAuth } from '../../../context/AuthContext';

const SettingsPage = () => {

    const { 
        setDeleteModalOpen, 
        setDeleteModalUser 
    } = UserAuth();

    const [openPage, setOpenPage] = useState(false);

    const RemoveAccount = () => {
        // Show the Delete modal
        setDeleteModalOpen(true);
        // Set the modal to delete user account
        setDeleteModalUser(true);
    }

    return(
        <>
            <motion.div 
                className="w-full h-full lg:w-1/2 flex flex-col justify-center items-center lg:border-r-2 lg:border-[#6C2E9C]"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="w-[40%] h-[2px] bg-[#A881D4]"></div>
                    <div className="w-80 lg:hidden text-center m-4 p-1 md:p-2 rounded-xl border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] bg-white lg:active:scale-[0.90] duration-200 ease-in-out">
                        <Link to="/navbar/account" className="flex flex-row justify-around items-center lg:hidden">
                            <h3 className="text-lg md:text-xl">Account<i className="fa-regular fa-user ml-2"></i></h3>
                            <i className="fa-solid fa-chevron-right md:text-lg"></i>
                        </Link>
                    </div>
                    <div onClick={() => setOpenPage('account')} className="hidden lg:w-[45%] lg:flex lg:flex-row lg:justify-around lg:items-center text-center m-4 p-2 rounded-xl border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] bg-white lg:active:scale-[0.90] duration-200 ease-in-out cursor-pointer">
                        <h3 className="hidden lg:inline-block lg:text-xl lg:cursor-pointer">Account<i className="fa-regular fa-user ml-2"></i></h3>
                        <i className="fa-solid fa-chevron-right hidden lg:inline-block lg:text-xl"></i>
                    </div>

                    <div className="w-80 lg:hidden text-center m-4 p-1 md:p-2 rounded-xl border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] bg-white lg:active:scale-[0.90] duration-200 ease-in-out">
                        <Link to="/navbar/installation" className="flex flex-row justify-around items-center lg:hidden">
                            <h3 className="text-lg md:text-xl">Installation<i className="fa-regular fa-screwdriver-wrench ml-2"></i></h3>
                            <i className="fa-solid fa-chevron-right"></i>
                        </Link>
                    </div>
                    <div onClick={() => setOpenPage('installation')} className="hidden lg:w-[45%] lg:flex lg:flex-row lg:justify-around lg:items-center text-center m-4 p-2 rounded-xl border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] bg-white lg:active:scale-[0.90] duration-200 ease-in-out cursor-pointer">
                        <h3 className="hidden lg:inline-block lg:text-xl lg:cursor-pointer">Installation<i className="fa-regular fa-screwdriver-wrench ml-2"></i></h3>
                        <i className="fa-solid fa-chevron-right hidden lg:inline-block lg:text-xl"></i>
                    </div>
                    <div className="w-80 md:w-80 lg:hidden text-center m-4 p-1 md:p-2 rounded-xl border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] bg-white lg:active:scale-[0.90] duration-200 ease-in-out">
                        <Link to="/navbar/widget_customization" className="flex flex-row justify-around items-center lg:hidden">
                            <h3 className="text-lg md:text-xl">Widget style<i className="fa-regular fa-paintbrush-pencil ml-2"></i></h3>
                            <i className="fa-solid fa-chevron-right"></i>
                        </Link>
                    </div>
                    <div onClick={() => setOpenPage('widget_customization')} className="hidden md:hidden lg:w-[45%] lg:flex lg:flex-row lg:justify-around lg:items-center text-center m-4 p-2 rounded-xl border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] bg-white lg:active:scale-[0.90] duration-200 ease-in-out cursor-pointer">
                        <h3 className="hidden lg:inline-block lg:text-xl lg:cursor-pointer">Widget style<i className="fa-regular fa-paintbrush-pencil ml-2"></i></h3>
                        <i className="fa-solid fa-chevron-right hidden lg:inline-block lg:text-xl"></i>
                    </div>
                    <div className="w-80 md:w-80 lg:hidden text-center m-4 p-1 md:p-2 rounded-xl border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] bg-white lg:active:scale-[0.90] duration-200 ease-in-out">
                        <Link to="/navbar/chatroom_customization" className="flex flex-row justify-around items-center lg:hidden">
                            <h3 className="text-lg md:text-xl">
                                Chatroom style
                                <i className="fa-regular fa-message-captions ml-2"></i>
                            </h3>
                            <i className="fa-solid fa-chevron-right"></i>
                        </Link>
                    </div>
                    <div onClick={() => setOpenPage('chatroom_customization')} className="hidden lg:w-[45%] lg:flex lg:flex-row lg:justify-around lg:items-center text-center m-4 p-2 rounded-xl border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] bg-white lg:active:scale-[0.90] duration-200 ease-in-out cursor-pointer">
                        <h3 className="hidden lg:inline-block lg:text-xl lg:cursor-pointer">Chatroom style<i className="fa-regular fa-message-captions ml-2"></i></h3>
                        <i className="fa-solid fa-chevron-right hidden lg:inline-block lg:text-xl"></i>
                    </div>
                    <button onClick={RemoveAccount}  className="w-[35%] lg:w-[20%] p-1 mt-2 md:mt-3 lg:mt-2 border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] bg-white rounded-xl acitve:scale-[0.90] duration-100 ease-in text-lg hover:text-red-500">
                        Delete Account
                    </button>
                </div>
            </motion.div>
            <motion.div 
                className="hidden lg:flex lg:w-1/2"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                {
                    openPage === 'account'?
                    (
                        <AccountSection />
                    ) 
                    : 
                    (
                        openPage === 'installation'?
                        (
                            <InstallationSection />
                        )
                        :
                            openPage === 'widget_customization'?
                            (
                                <CustomizationSection />
                            )
                            :
                                openPage === 'chatroom_customization'?
                                (
                                    <ChatRoomStylingSection />
                                )
                                :
                                (
                                    <div className="w-full h-screen flex flex-col justify-center items-center text-2xl text-[#33b8b8]">
                                        <i className="fa-light fa-gears text-6xl my-2"></i>
                                        Settings
                                    </div>
                                )
                    )
                }
            </motion.div>
        </>
    );
}

export default SettingsPage;