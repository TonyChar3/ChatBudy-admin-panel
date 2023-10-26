import { Link } from 'react-router-dom';
import { useState } from 'react';
import AccountSection from './Account/accountSection';
import InstallationSection from './Installation/installationSection';
import CustomizationSection from './widget_style/widgetStylingSection';
import ChatRoomStylingSection from './chatroom_style/chatroomStyling';
import { motion } from 'framer-motion';

const SettingsPage = () => {

    const [openPage, setOpenPage] = useState('');

    return(
        <>
            <motion.div 
                className="relative w-full h-full lg:w-1/2 flex flex-col justify-center items-center lg:border-r-2 lg:border-[#6C2E9C]"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="w-[25%] lg:w-[15%] h-[2px] bg-[#A881D4] bg-opacity-40"></div>
                    {/*Account section*/}
                    <div className="w-[80%] md:w-80 lg:hidden text-[#A881D4] m-4 p-2 rounded-xl border-[1px] border-[#A881D4] shadow-custom-shadow-input bg-white lg:active:scale-[0.90] duration-200 ease-in-out">
                        <Link to="/navbar/account" className="flex flex-row justify-around items-center lg:hidden">
                            <div className="w-[70%] flex flex-row justify-between items-center w-1/2">
                                <div className="w-1/6 flex flex-row justify-center items-center">
                                    <i className="fa-regular fa-user text-xl"></i>
                                </div>
                                <div className="w-5/6 flex flex-row justify-center items-center">
                                    <h3 className="text-xl">Account</h3>
                                </div>
                            </div>
                            <div className="w-[10%] text-center">
                                <i className="fa-solid fa-chevron-right text-lg"></i>
                            </div>
                        </Link>
                    </div>
                    <div onClick={() => setOpenPage('account')} className="hidden md:hidden w-[50%] lg:flex flex-row justify-around items-center m-4 p-3 rounded-xl border-[1px] border-[#A881D4] shadow-custom-shadow-input bg-white text-[#A881D4] active:scale-[0.90] duration-200 ease-in-out cursor-pointer">
                        <div className="w-[70%] flex flex-row justify-between items-center w-1/2">
                            <div className="w-1/6 flex flex-row justify-center items-center">
                                <i className="fa-regular fa-user text-2xl"></i>
                            </div>
                            <div className="w-5/6 flex flex-row justify-center items-center">
                                <h3 className="text-2xl">Account</h3>
                            </div>
                        </div>
                        <div className="w-[10%] text-center">
                            <i className="fa-solid fa-chevron-right text-2xl"></i>
                        </div>
                    </div>
                    <div className="w-[25%] hidden lg:block lg:w-[15%] h-[2px] bg-[#A881D4] bg-opacity-40"></div>

                    {/* Installation section */}
                    <div onClick={() => setOpenPage('installation')} className="hidden md:hidden w-[50%] lg:flex flex-row justify-around items-center m-4 p-3 rounded-xl text-[#A881D4] border-[1px] border-[#A881D4] shadow-custom-shadow-input bg-white lg:active:scale-[0.90] duration-200 ease-in-out cursor-pointer">
                        <div className="w-[70%] flex flex-row justify-between items-center w-1/2">
                            <div className="w-1/6 flex flex-row justify-center items-center">
                            <i className="fa-regular fa-screwdriver-wrench text-2xl"></i>
                            </div>
                            <div className="w-5/6 flex flex-row justify-center items-center">
                                <h3 className="text-2xl cursor-pointer">Installation</h3>
                            </div>
                        </div>
                        <div className="w-[10%] text-center">
                            <i className="fa-solid fa-chevron-right text-2xl"></i>
                        </div>
                    </div>
                    <div className="w-[25%] lg:w-[15%] h-[2px] bg-[#A881D4] bg-opacity-40"></div>

                    {/*Widget customization */}
                    <div className="w-[80%] md:w-80 lg:hidden text-[#A881D4] m-4 p-2 rounded-xl border-[1px] border-[#A881D4] shadow-custom-shadow-input bg-white lg:active:scale-[0.90] duration-200 ease-in-out">
                        <Link to="/navbar/widget_customization" className="flex flex-row justify-around items-center lg:hidden">
                            <div className="w-[70%] flex flex-row justify-between items-center w-1/2">
                                <div className="w-1/6 flex flex-row justify-center items-center">
                                    <i className="fa-regular fa-paintbrush-pencil ml-2"></i>
                                </div>
                                <div className="w-5/6 flex flex-row justify-center items-center">
                                    <h3 className="text-lg md:text-xl">Widget style</h3>
                                </div>
                            </div>
                            <div className="w-[10%] text-center">
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>
                    </div>
                    <div onClick={() => setOpenPage('widget_customization')} className="hidden md:hidden w-[50%] text-[#A881D4] lg:flex flex-row justify-around items-center m-4 p-3 rounded-xl border-[1px] border-[#A881D4] shadow-custom-shadow-input bg-white active:scale-[0.90] duration-200 ease-in-out cursor-pointer">
                        <div className="w-[70%] flex flex-row justify-between items-center w-1/2">
                            <div className="w-1/6 flex flex-row justify-center items-center">
                                <i className="fa-regular fa-paintbrush-pencil text-2xl"></i>
                            </div>
                            <div className="w-5/6 flex flex-row justify-center items-center">
                                <h3 className="text-2xl">Widget style</h3>
                            </div>
                        </div>
                        <div className="w-[10%] text-center">
                            <i className="fa-solid fa-chevron-right text-2xl"></i>
                        </div>
                    </div>
                    <div className="w-[25%] lg:w-[15%] h-[2px] bg-[#A881D4] bg-opacity-40"></div>

                    {/*Chatroom customization */}
                    <div className="w-[80%] md:w-80 lg:hidden text-[#A881D4] m-4 p-2 rounded-xl border-[1px] border-[#A881D4] shadow-custom-shadow-input bg-white lg:active:scale-[0.90] duration-200 ease-in-out">
                        <Link to="/navbar/chatroom_customization" className="flex flex-row justify-around items-center lg:hidden">
                            <div className="w-[70%] flex flex-row justify-between items-center w-1/2">
                                <div className="w-1/6 flex flex-row justify-center items-center">
                                    <i className="fa-regular fa-message-captions"></i>
                                </div>
                                <div className="w-5/6 flex flex-row justify-center items-center">
                                    <h3 className="text-lg md:text-xl">Chatroom style</h3>
                                </div>
                            </div>
                            <div className="w-[10%] text-center">
                                <i className="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>
                    </div>
                    <div onClick={() => setOpenPage('chatroom_customization')} className="hidden w-[50%] lg:flex flex-row justify-around items-center m-4 p-3 rounded-xl text-[#A881D4] border-[1px] border-[#A881D4] shadow-custom-shadow-input bg-white active:scale-[0.90] duration-200 ease-in-out cursor-pointer">
                        <div className="w-[70%] flex flex-row justify-between items-center w-1/2">
                            <div className="w-1/6 flex flex-row justify-center items-center">
                                <i className="fa-regular fa-message-captions text-2xl"></i>
                            </div>
                            <div className="w-5/6 flex flex-row justify-center items-center">
                                <h3 className="text-2xl">Chatroom style</h3>
                            </div>
                        </div>
                        <div className="w-[10%] text-center">
                            <i className="fa-solid fa-chevron-right text-2xl"></i>
                        </div>
                    </div>

                    <div className="w-[25%] lg:w-[15%] h-[2px] bg-[#A881D4] bg-opacity-40"></div>
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
                        <AccountSection close_page_desktop={setOpenPage} />
                    ) 
                    : 
                    (
                        openPage === 'installation'?
                        (
                            <InstallationSection close_page_desktop={setOpenPage} />
                        )
                        :
                            openPage === 'widget_customization'?
                            (
                                <CustomizationSection close_page_desktop={setOpenPage} />
                            )
                            :
                                openPage === 'chatroom_customization'?
                                (
                                    <ChatRoomStylingSection close_page_desktop={setOpenPage} />
                                )
                                :
                                (
                                    <div className="w-full h-screen flex flex-col justify-center items-center text-2xl text-[#A881D4]">
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