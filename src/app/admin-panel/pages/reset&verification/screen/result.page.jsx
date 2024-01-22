import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion';

const VerifyandResetResultPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [ui_state, setUIstate] = useState({
        password_updated: false,
        email_verified: false
    });

    useEffect(() => {
        if(!location.state){
            navigate('/');
        } else if(location.state.password_updated){
            setUIstate(prevValue => ({
                ...prevValue,
                password_updated: true
            }));
        } else if(location.state.email_verified){
            setUIstate(prevValue => ({
                ...prevValue,
                email_verified: true
            }));
        }
    },[])

    return(
        <>
            <motion.div 
                className="w-screen h-screen flex lg:flex-row justify-center items-center bg-white"
    
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            > 
                <div className="absolute top-[10%] left-10 lg:hidden">
                    <div className="w-[100px] h-[100px] bg-[#6C2E9C] rounded-full"></div>
                </div>
                <div className="lg:block absolute lg:top-4 lg:left-10 top-5 right-3">
                    <img src="https://res.cloudinary.com/dskpbps9l/image/upload/v1698064004/ChatBudy.io/Increase_Your_Sales_5_wv9ifc.png" width="150" height="150" alt="salezy logo" />
                </div>
                <div className="hidden lg:block absolute top-20 right-20">
                    <img src="https://res.cloudinary.com/dskpbps9l/image/upload/v1698074702/ChatBudy.io/Increase_Your_Sales_9_pkfjm8.png" width="150" height="150" alt="canva image" className="rounded-xl" />
                </div>
                <div className="hidden lg:block absolute top-80 left-80">
                    <div className="w-[50px] h-[50px] bg-[#6C2E9C] rounded-full"></div>
                </div>
                <div className="lg:w-1/2 lg:flex lg:flex-row lg:justify-center">
                    <div className={`lg:w-1/2 w-80 p-2 flex flex-col justify-center items-center border-[1px] bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-lg ${ui_state.password_updated? 'shadow-[#A881D4] border-[#6C2E9C]' : ui_state.email_verified ? 'shadow-[#A881D4] border-[#6C2E9C]' : 'shadow-[#E94E77] border-[#E94E77]'} rounded-lg`}>
                        <div className="w-full flex justify-center mb-6 lg:mb-8">
                            <h2 className={`text-xl ${ui_state.password_updated? 'text-[#A881D4]' : ui_state.email_verified ? 'text-[#A881D4]' : 'text-red-500'}`}>
                                {ui_state.password_updated? 'Password updated successfully !' : ui_state.email_verified ? 'Email is verified !' : 'ERROR, please try again :('}
                            </h2>
                        </div>
                        <button onClick={() => window.location.href = "https://www.chatbudy.io/navbar/visitors"} className="bg-[#6C2E9C] p-1 text-white font-light rounded-lg w-[30%] text-center mb-3 lg:p-2 lg:text-xl">Exit</button>
                    </div>
                </div>
                <div className="hidden lg:block absolute bottom-80 right-80">
                    <div className="w-[100px] h-[100px] bg-[#6C2E9C] rounded-full"></div>
                </div>
                <div className="hidden lg:block absolute bottom-20 left-20">
                    <img src="https://res.cloudinary.com/dskpbps9l/image/upload/v1698260563/ChatBudy.io/Increase_Your_Sales_16_mfgnnp.png" width="150" height="150" alt="canva image" className="rounded-xl" />
                </div>
                <div className="absolute bottom-[5%] right-[10%] lg:hidden">
                    <div className="w-[50px] h-[50px] bg-[#6C2E9C] rounded-full"></div>
                </div>
                <div className="absolute bottom-[15%] left-6 lg:hidden">
                    <div className="w-[85px] h-[50px] bg-[#6C2E9C] rounded-full"></div>
                </div>
            </motion.div>
        </>
    )
}

export default VerifyandResetResultPage;