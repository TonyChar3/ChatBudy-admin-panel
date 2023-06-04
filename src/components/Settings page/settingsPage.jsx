import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AccountSection from './Account/accountSection';
import InstallationSection from './Installation/installationSection';
import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';

const SettingsPage = () => {

    const navigate = useNavigate();

    const { LogOut } = UserAuth();

    const [openAccountPage, setAccount] = useState(false);

    const OpenAccountPage = (page_name) => {
        setAccount(page_name)
    }

    const LogOutUser = async() => {
        try{
            const logout = await LogOut()
            if(logout){
                event_Source.close()
                navigate("/")
            }
        } catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <motion.div 
                className="w-full h-screen lg:w-1/2 flex flex-col justify-center items-center bg-[#c3fffc]"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="w-80 lg:hidden text-center m-4 p-1 rounded-xl border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] bg-white lg:active:scale-[0.90] duration-200 ease-in-out">
                    <Link to="/navbar/account" className="flex flex-row justify-around items-center lg:hidden">
                        <h3 className="text-lg">Account<i className="fa-regular fa-user ml-2"></i></h3>
                        <i className="fa-solid fa-chevron-right"></i>
                    </Link>
                </div>
                <div onClick={() => OpenAccountPage('account')} className="hidden lg:w-[45%] lg:flex lg:flex-row lg:justify-around lg:items-center text-center m-4 p-2 rounded-xl border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] bg-white lg:active:scale-[0.90] duration-200 ease-in-out cursor-pointer">
                    <h3 className="hidden lg:inline-block lg:text-xl lg:cursor-pointer">Account<i className="fa-regular fa-user ml-2"></i></h3>
                    <i className="fa-solid fa-chevron-right hidden lg:inline-block lg:text-xl"></i>
                </div>

                <div className="w-80 lg:hidden text-center m-4 p-1 rounded-xl border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] bg-white lg:active:scale-[0.90] duration-200 ease-in-out">
                    <Link to="/navbar/installation" className="flex flex-row justify-around items-center lg:hidden">
                        <h3 className="text-lg">Installation<i className="fa-regular fa-screwdriver-wrench ml-2"></i></h3>
                        <i className="fa-solid fa-chevron-right"></i>
                    </Link>
                </div>
                <div onClick={() => OpenAccountPage('installation')} className="hidden lg:w-[45%] lg:flex lg:flex-row lg:justify-around lg:items-center text-center m-4 p-2 rounded-xl border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] bg-white lg:active:scale-[0.90] duration-200 ease-in-out cursor-pointer">
                    <h3 className="hidden lg:inline-block lg:text-xl lg:cursor-pointer">Installation<i className="fa-regular fa-screwdriver-wrench ml-2"></i></h3>
                    <i className="fa-solid fa-chevron-right hidden lg:inline-block lg:text-xl"></i>
                </div>
                <button onClick={LogOutUser}  className="w-[35%] lg:w-[20%] p-1 mt-2 border-[1px] border-[#33b8b8] shadow-md shadow-[#33b8b8] bg-white rounded-xl acitve:scale-[0.90] duration-100 ease-in text-lg hover:text-red-500">Disconnect<i className="fa-solid fa-right-from-bracket ml-2"></i></button>
            </motion.div>
            <motion.div 
                className="hidden lg:flex lg:w-1/2"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                {
                    openAccountPage === 'account'?
                    (
                        <AccountSection />
                    ) 
                    : 
                    (
                        openAccountPage === 'installation'?
                        (
                            <InstallationSection />
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