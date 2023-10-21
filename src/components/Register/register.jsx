import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';
import { auth } from '../../firebase_setup/firebase_conf';
import { updateProfile, createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseErrorhandler, calculatePasswordStrength, passwordStrengthSpanMessage, credentialsRegexSanitize } from '../../context/utils/manageAuth';

const RegisterPage = () => {

    const  { 
        Register, 
        setModalOpen, 
        setModalMsg, 
        setModalErrorMode, 
        setShowLoader, 
        setRegisterUser }  = UserAuth();

    const [ui_state, setUIstate] = useState({
        show_password: false,
        password_strength: 0,
        show_progress_bar: false,
        progress_bar_message: '',
        error_mode: false
    });
    const [user_data, setUserData] = useState({
        email: '',
        user_name: '',
        website_url: '',
        password: ''
    });

    const InputChange = (name, value) => {
        setUserData(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    const ShowPassword = () => {
        ui_state.show_password?
        setUIstate(prevValue => ({
            ...prevValue,
            show_password: false
        }))
        :
        setUIstate(prevValue => ({
            ...prevValue,
            show_password: true
        }))
    }

    const ShowProgressBar = () => {
        ui_state.show_progress_bar?
        setUIstate(prevValue => ({
            ...prevValue,
            show_progress_bar: false
        }))
        :
        setUIstate(prevValue => ({
            ...prevValue,
            show_progress_bar: true
        }))
    }

    const RegisterUser = async(e) => {
        e.preventDefault();
        try{
            // if the user omit to provide every credential
            if(user_data.user_name === "" || user_data.email === "" || user_data.password === "" || user_data.website_url === ""){
                setUIstate(prevValue => ({
                    ...prevValue,
                    error_mode: true
                }));
                setModalErrorMode(true);
                setModalOpen(true);
                setModalMsg('ERROR: Please make sure to fill in all the fields.');
                return;
            } 
            // sanitize with Regex the credentials
            const sanitize_credentials = credentialsRegexSanitize(user_data);
            if(sanitize_credentials.error){
                setUIstate(prevValue => ({
                    ...prevValue,
                    error_mode: true
                }));
                sanitize_credentials.array.forEach(error => {
                    setModalErrorMode(true);
                    setModalOpen(true);
                    setModalMsg(error.msg);
                });
                return;
            }
            // else if no error send it to the backend
            setUIstate(prevValue => ({
                ...prevValue,
                error_mode: false
            }));
            // show loading animation
            setShowLoader(true);
            // create firebase user
            const create = await createUserWithEmailAndPassword(auth, user_data.email, user_data.password);// Firebase auth profile
            if(create){
                setRegisterUser(true);
                // create the user in the mongoDB
                const register = await Register(user_data.user_name, user_data.website_url);
                // set the displayname for the FireBase account
                await updateProfile(auth.currentUser, { displayName: user_data.user_name });
                if(register){
                    // welcome message
                    setModalErrorMode(false);
                    setModalMsg(`Welcome to chat buddy :)`);
                    setModalOpen(true);
                }
            }
        } catch(err){
            const error_message = FirebaseErrorhandler(err.code);
            setUIstate(prevValue => ({
                ...prevValue,
                error_mode: true
            }));
            setUserData(prevValue => ({
                ...prevValue,
                user_name: '',
                email: '',
                password: '',
                website_url: ''
            }));
            setModalErrorMode(true);
            setModalOpen(true);
            setModalMsg(`ERROR: 
            ${error_message || err.response.data.message || 'Unable to register. Please try again or contact support.'}
            `);
        }
    }

    useEffect(() => {
        const strength = calculatePasswordStrength(user_data.password);
        const progress_bar_msg = passwordStrengthSpanMessage(strength);
        setUIstate(prevValue => ({
            ...prevValue,
            password_strength: strength,
            progress_bar_message: progress_bar_msg
        }));
    },[user_data.password])

    return(
        <>
            <motion.div 
                className="w-screen h-screen flex flex-col lg:flex-row justify-center lg:justify-between"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            > 
                <div className="absolute top-5 right-10 rounded-xl lg:hidden">
                    <img src="/images/1.png" alt="chat canva" width="100" height="100" className="rounded-xl"/>
                </div>
                <div className="absolute top-[10%] left-10 lg:hidden">
                    <img src="/images/4.png" alt="money cnava" width="80" height="80" className="rounded-full"/>
                </div>
                <div className="lg:w-1/2 flex flex-col h-full justify-center items-center">
                    <div className="lg:block lg:absolute lg:top-0 lg:left-3 hidden">
                        <img src="/images/Increase Your Sales.png" alt="canva logo" width="150" height="150" />
                    </div>
                    <form className={`w-80 lg:w-2/4 p-2 my-4 flex flex-col justify-center items-center border-[1px] bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-lg ${ui_state.error_mode? 'shadow-red-500 border-red-500' : 'shadow-[#33b8b8] border-[#33b8b8]'}`}>
                        <div className="w-full flex justify-center m-4">
                            <h1 className="text-center text-2xl text-black font-light lg:text-3xl">Start for <span className="text-[#33b8b8] underline">FREE</span></h1>
                        </div>
                        <div className="w-full flex justify-center m-3 lg:m-5">
                            <input 
                            type="text" 
                            placeholder='Business name' 
                            value={`${user_data.user_name}`} 
                            autoComplete='username' 
                            onChange={(e) => InputChange('user_name', e.target.value)} 
                            className="p-2 lg:p-3 pl-2 border-[1px] border-[#33b8b8] lg:border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md shadow-[#33b8b8] outline-none"
                            />
                        </div>
                        <div className="w-full flex justify-center m-3 lg:m-5">
                            <input 
                            type="email" 
                            placeholder='Email' 
                            value={`${user_data.email}`} 
                            autoComplete='email' 
                            onChange={(e) => InputChange('email', e.target.value)} 
                            className="p-2 lg:p-3 pl-2 border-[1px] border-[#33b8b8] lg:border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md shadow-[#33b8b8] outline-none"
                            />
                        </div>
                    </form>
                    <form onSubmit={RegisterUser} className={`relative w-80 lg:w-2/4 p-2 my-4 flex flex-col justify-center items-center border-[1px] bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-lg ${ui_state.error_mode? 'shadow-red-500 border-red-500' : 'shadow-[#33b8b8] border-[#33b8b8]'}`}>
                        <div className="w-full flex justify-center m-3 lg:m-5 lg:mt-8 mt-4">
                            <input 
                            onFocus={ShowProgressBar} 
                            onBlur={ShowProgressBar} 
                            type={`${ui_state.show_password? 'text' : 'password'}`} 
                            placeholder='Password' 
                            value={`${user_data.password}`} 
                            autoComplete='password' 
                            onChange={(e) => InputChange('password',e.target.value)} 
                            className={`p-2 lg:p-3 pl-2 border-[1px] border-[#33b8b8] lg:border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md shadow-[#33b8b8] outline-none`}
                            />
                            <span className="absolute p-1 top-[14%] right-10 lg:p-2 lg:right-[12%] lg:top-[16%] cursor-pointer"><i onClick={ShowPassword} className={`fa-light fa-eye${ui_state.show_password? '' : '-slash'}`}></i></span>
                        </div>
                        <div className={`w-[80%] flex flex-row justify-start items-center ${ui_state.show_progress_bar? '' : 'h-0'} duration-500`}>
                            <div className={`w-1/2 h-1 rounded-xl bg-neutral-200 ${ui_state.show_progress_bar? '' : 'translate-y-[-20px] opacity-0 lg:translate-y-[20px]'} duration-500`}>
                                <div className={`h-1 ${ui_state.progress_bar_message.bg_color} rounded-xl`} style={{ width: `${ui_state.password_strength}%` }}></div>
                            </div>
                            <span className={`text-sm mx-1 ${ui_state.progress_bar_message.text_color} ${ui_state.show_progress_bar? '' : 'translate-y-[-20px] opacity-0 lg:translate-y-[20px]'} duration-300`}>{ui_state.progress_bar_message.msg}</span>
                        </div>
                        <div className="w-full flex justify-center m-2">
                            <input 
                            type="text" 
                            placeholder='Website URL' 
                            value={`${user_data.website_url}`} 
                            autoComplete="url" 
                            onChange={(e) => InputChange('website_url',e.target.value)} 
                            className="p-3 lg:p-6 pl-2 border-[1px] border-white w-4/6 rounded-2xl bg-[#33b8b8] bg-opacity-10 backdrop-filter backdrop-blur-sm outline-none"
                            />
                        </div>
                        <button type="submit" className="bg-[#33b8b8] p-1 lg:p-2 text-white text-lg lg:text-xl font-light rounded-lg w-[30%] text-center m-3">Start now</button>
                    </form>
                    <div className="bottom-[9%] lg:bottom-[6%]">
                        <p className="m-2 text-lg font-light lg:text-xl">already have an account<i className="fa-light fa-question mx-1 mr-2"></i><Link to="/" className="text-[#33b8b8]">Log in</Link></p>
                    </div>
                </div>
                <div className="hidden lg:block lg:h-screen lg:w-1/2">
                    <img src="images/increase_sales.png" width="800" height="800" alt="canva image" className="h-full w-full" />
                </div>
                <div className="absolute bottom-[13%] right-6 lg:hidden">
                    <img src="/images/4.png" alt="money cnava" width="50" height="50" className="rounded-full"/>
                </div>
            </motion.div>
        </>
    );    
}

export default RegisterPage;