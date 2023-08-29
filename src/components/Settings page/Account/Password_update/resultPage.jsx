import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion';

const PasswordUpdateResultPage = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [password_updated, setPasswordUpdated] = useState(false);
    const [email_verified, setEmailVerified] = useState(false);

    const finishSequence = async() => {
        window.location.href = "http://localhost:5173/"
    }

    useEffect(() => {
        if(!location.state){
            navigate('/')
        } else if(location.state.passwordUpdated){
            setPasswordUpdated(true)
        } else if(location.state.emailVerified){
            setEmailVerified(true)
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
                    <img src="/images/4.png" alt="money cnava" width="100" height="100" className="rounded-full"/>
                </div>
                <div className="lg:block absolute lg:top-4 lg:left-10 top-5 right-3">
                    <img src="images/Increase Your Sales.png" width="150" height="150" alt="salezy logo" />
                </div>
                <div className="hidden lg:block absolute top-20 right-20">
                    <img src="images/3.png" width="150" height="150" alt="canva image" className="rounded-xl" />
                </div>
                <div className="hidden lg:block absolute top-80 left-80">
                    <img src="images/4.png" width="50" height="50" alt="canva image" className="rounded-full" />
                </div>
                <div className="lg:w-1/2 lg:flex lg:flex-row lg:justify-center">
                    <div className={`lg:w-1/2 w-80 p-2 flex flex-col justify-center items-center border-[1px] bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-lg ${password_updated? 'shadow-[#33b8b8] border-[#33b8b8]' : email_verified ? 'shadow-[#33b8b8] border-[#33b8b8]' : 'shadow-red-500 border-red-500'} rounded-lg`}>
                        <div className="w-full flex justify-center mb-6 lg:mb-8">
                            <h2 className={`text-xl ${password_updated? 'text-[#33b8b8]' : email_verified ? 'text-[#33b8b8]' : 'text-red-500'}`}>{password_updated? 'Password updated successfully !' : email_verified ? 'Email is verified !' : 'ERROR, please try again :('}</h2>
                        </div>
                        <button onClick={finishSequence} className="bg-[#33b8b8] p-1 text-white font-light rounded-lg w-[30%] text-center mb-3 lg:p-2 lg:text-xl">Exit</button>
                    </div>
                </div>
                <div className="hidden lg:block absolute bottom-80 right-80">
                    <img src="images/4.png" width="100" height="100" alt="canva image" className="rounded-full" />
                </div>
                <div className="hidden lg:block absolute bottom-20 left-20">
                    <img src="images/1.png" width="150" height="150" alt="canva image" className="rounded-xl" />
                </div>
                <div className="absolute bottom-[5%] right-[10%] lg:hidden">
                    <img src="/images/4.png" alt="money cnava" width="50" height="50" className="rounded-full"/>
                </div>
                <div className="absolute bottom-[15%] left-6 lg:hidden">
                    <img src="/images/4.png" alt="money cnava" width="85" height="50" className="rounded-full"/>
                </div>
            </motion.div>
        </>
    )
}

export default PasswordUpdateResultPage;