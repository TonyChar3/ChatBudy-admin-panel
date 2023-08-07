import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { UserAuth } from '../../../context/AuthContext';

const ForgotPasswordForm = () => {

    const { setModalMsg, setModalOpen } = UserAuth();

    const [email, setEmail] = useState('');
    const [reset_btn_disabled, setBtnDisabled] = useState(false);
    const [reset_btn_content, setBtnContent] = useState('Reset');

    const auth = getAuth();

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    const handleEmail = (e) => {
        setEmail(e)
    }

    const handleSendPasswordResetEmail = (e) => {
        e.preventDefault();
        // sanitize the input
        if(emailRegex.test(email)){
            // send the password reset email
            sendPasswordResetEmail(auth, email)
            .then(() => {
                // inform the user that it was sent
                setModalOpen(true)
                setModalMsg('Email sent')
                setBtnDisabled(true)
                setBtnContent('re-send')
            })
            .catch((error) => {
                console.log(error)
            });
        } else {
            console.log('Wrong password...')
        }
    }

    useEffect(() => {
        if(reset_btn_disabled){
            const timeout = setTimeout(() => { setBtnDisabled(false)},[5000])
            return () => {
                clearTimeout(timeout)
            }
        }
    },[reset_btn_disabled])

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
                    <form onSubmit={handleSendPasswordResetEmail} className="lg:w-1/2 w-80 p-2 flex flex-col justify-center items-center border-[1px] border-[#33b8b8] bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-lg shadow-[#33b8b8]">
                        <div className="w-full flex flex-col justify-center m-4">
                            <h1 className="text-center text-3xl text-black font-light lg:text-4xl">Enter your email</h1>
                            <div className="w-full p-1 mt-2 text-center text-red-500">
                                <i className="fa-light fa-circle-info mx-2 text-sm"></i>
                                <span className="text-sm">You should receive a password reset email shortly</span>
                            </div>
                        </div>
                        <div className="w-full flex justify-center mb-6 lg:mb-8">
                            <input type="text" placeholder='Email' onChange={(e) => handleEmail(e.target.value)} className="p-1 lg:p-3 pl-2 border-[1px] border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md shadow-[#33b8b8] outline-none lg:text-lg"/>
                        </div>
                        <button type="submit" disabled={reset_btn_disabled} className={`${reset_btn_disabled? 'bg-gray-300' : 'bg-[#33b8b8]'} p-1 text-white font-light rounded-lg w-[30%] text-center mb-3 lg:p-2 lg:text-xl`}>{reset_btn_content}</button>
                        <Link to="/" className="mt-2 underline text-lg text-[#33b8b8] font-light">Cancel</Link>
                    </form>
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

export default ForgotPasswordForm;