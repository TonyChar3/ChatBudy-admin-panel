import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { UserAuth } from '../../../context/AuthContext';
import { FirebaseErrorhandler } from '../../../context/utils/manageAuth';
import { verifyRateLimit } from '../../../context/utils/manageAuth';
import { sanitizeInputValue } from '../../../context/utils/security';

const ForgotPasswordForm = () => {

    const auth = getAuth();

    const { 
        setModalMsg, 
        setModalOpen, 
        setModalErrorMode } = UserAuth();

    const [ui_state, setUIstate] = useState({
        email: '',
        reset_btn_disabled: false,
        reset_btn_content: 'Reset',
        block_request: false,
        request_number_count: 0,
        error_mode: false
    });

    const SendPasswordResetEmail = async(e) => {
        e.preventDefault();
        // sanitize the email
        const sanitize_email = sanitizeInputValue(ui_state.email);
        if(ui_state.email === '' || !sanitize_email || sanitize_email === ''){
            setModalOpen(true);
            setModalErrorMode(true);
            setModalMsg('Please enter a valid email address')
            return
        }
        // if its allowed
        const verify_rate_limit = await verifyRateLimit(sanitize_email, ui_state.request_number_count);
        if (!verify_rate_limit.data.request_allowed) {
            setUIstate(prevValue => ({
                ...prevValue,
                reset_btn_disabled: true,
                error_mode: true
            }));
            setModalOpen(true);
            setModalErrorMode(true);
            setModalMsg('Wait 30 minutes... be sure to check your junk');
            return
        }
        // send the password reset email
        sendPasswordResetEmail(auth, sanitize_email)
        .then(() => {
            // inform the user that it was sent
            setUIstate(prevValue => ({
                ...prevValue,
                reset_btn_disabled: true,
                reset_btn_content: 're-send',
                request_number_count: prevValue.request_number_count + 1,
                error_mode: false
            }))
            // modal message
            setModalErrorMode(false);
            setModalOpen(true);
            setModalMsg('Email sent');
        })
        .catch((error) => {
            const error_message = FirebaseErrorhandler(error.code);
            setUIstate(prevValue => ({
                ...prevValue,
                error_mode: true
            }));
            setModalOpen(true);
            setModalErrorMode(true);
            setModalMsg(`ERROR: ${error_message || 'Unable to send an email. Please try again or contact support.'}`)
        });
    }

    useEffect(() => {
        if(ui_state.reset_btn_disabled){
            const timeout = setTimeout(() => { 
                setUIstate(prevValue => ({
                    ...prevValue,
                    reset_btn_disabled: false
                }))
            },[5000])
            return () => {
                clearTimeout(timeout)
            }
        }
    },[ui_state.reset_btn_disabled])

    useEffect(() => {
        if(ui_state.block_request){
            const timeout = setTimeout(() => { 
                setUIstate(prevValue => ({
                    ...prevValue,
                    block_request: false
                }))
            },[5000])
            return () => {
                clearTimeout(timeout)
            }
        }
    },[ui_state.block_request])

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
                    <form onSubmit={SendPasswordResetEmail} className={`lg:w-1/2 w-80 p-2 flex flex-col justify-center items-center border-[1px] bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-lg ${ui_state.error_mode? 'border-red-500 shadow-red-500' : 'shadow-[#33b8b8] border-[#33b8b8]'}`}>
                        <div className="w-full flex flex-col justify-center m-4">
                            <h1 className="text-center text-3xl text-black font-light lg:text-4xl">Enter your email</h1>
                            <div className="w-full p-1 mt-2 text-center text-red-500">
                                <i className="fa-light fa-circle-info mx-2 text-sm"></i>
                                <span className="text-sm">You should receive a password reset email shortly</span>
                            </div>
                        </div>
                        <div className="w-full flex justify-center mb-6 lg:mb-8">
                            <input 
                            type="text" 
                            placeholder='Email' 
                            onChange={(e) => {
                                setUIstate(prevValue => ({
                                    ...prevValue,
                                    email: e.target.value
                                }));
                            }} 
                            className="p-2 lg:p-3 pl-2 border-[1px] border-[#33b8b8] lg:border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md shadow-[#33b8b8] outline-none lg:text-lg"
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={ui_state.reset_btn_disabled || ui_state.block_request} 
                            className={`
                            ${ui_state.reset_btn_disabled || ui_state.block_request? 'bg-gray-300' : 'bg-[#33b8b8]'} 
                            p-1 text-white font-light rounded-lg w-[30%] text-center mb-3 lg:p-2 lg:text-xl`}
                        >
                            {ui_state.reset_btn_content}
                        </button>
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