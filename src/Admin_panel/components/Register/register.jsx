import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserAuth } from '../../../context/AuthContext';
import { auth } from '../../../firebase_setup/firebase_conf';
import { updateProfile, createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseErrorhandler, calculatePasswordStrength, passwordStrengthSpanMessage, credentialsRegexSanitize } from '../../../context/utils/manageAuth';

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
                className="w-screen h-full flex flex-col lg:flex-row justify-center lg:justify-between"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="relative lg:w-1/2 flex flex-col h-full justify-center items-center">
                    <div className="lg:hidden absolute h-[30%] w-[85%] top-0 right-0 bg-register-mobile-top-right bg-cover z-0"></div>
                    <div className="absolute bg-[#6C2E9C] lg:w-[65px] lg:h-[65px] w-[35px] h-[35px] top-10 left-[13%] lg:left-auto lg:right-[10%] rounded-full"></div>
                    <div className="hidden lg:blockabsolute bg-[#6C2E9C] lg:w-[21px] lg:h-[21px] w-[35px] h-[35px] top-[9%] right-[13%] lg:right-[30%] rounded-full"></div>
                    <div className="hidden lg:block absolute bg-[#6C2E9C] lg:w-[21px] lg:h-[21px] w-[35px] h-[35px] top-[17%] right-[13%] lg:right-[20%] rounded-full"></div>
                    <div className="lg:block lg:absolute lg:top-0 lg:left-3 hidden">
                        <img src="https://res.cloudinary.com/dskpbps9l/image/upload/v1698064004/ChatBudy.io/Increase_Your_Sales_5_wv9ifc.png" alt="canva logo" width="150" height="150" />
                    </div>
                    <div className="w-full flex flex-col justify-center items-center mb-2">
                        <h1 className="text-center text-3xl text-[#A881D4] font-light lg:text-4xl">
                            Start for 
                            <span className="text-[#6C2E9C] underline ml-2">
                                FREE
                            </span>
                        </h1>
                        <h2 className="text-sm text-[#A881D4]">
                            register a new account
                        </h2>
                    </div>
                    <form className={`w-80 md:w-96 lg:w-2/4 p-2 flex flex-col justify-around items-center z-20`}>
                        <input 
                            type="text" 
                            name="username"
                            id="username"
                            placeholder='Business name' 
                            value={`${user_data.user_name}`} 
                            autoComplete='username' 
                            onChange={(e) => InputChange('user_name', e.target.value)} 
                            className="p-3 border-[1px] border-[#6C2E9C] w-full bg-white shadow-custom-shadow-input rounded-xl outline-none"
                        />
                        <input 
                            type="email"
                            id="email"
                            name="email" 
                            placeholder='Email' 
                            value={`${user_data.email}`} 
                            autoComplete='email' 
                            onChange={(e) => InputChange('email', e.target.value)} 
                            className="p-3 border-[1px] border-[#6C2E9C] w-full mt-4 bg-white shadow-custom-shadow-input rounded-xl outline-none"
                        />
                    </form>
                    <form onSubmit={RegisterUser} className={`relative w-80 md:w-96 mt-8 lg:mt-10 lg:w-2/4 flex flex-col justify-center items-center z-20`}>
                        <div className="relative w-full flex justify-center">
                            <input 
                            onFocus={ShowProgressBar} 
                            onBlur={ShowProgressBar} 
                            type={`${ui_state.show_password? 'text' : 'password'}`} 
                            id="password"
                            name="password"
                            placeholder='Password' 
                            value={`${user_data.password}`} 
                            autoComplete='password' 
                            onChange={(e) => InputChange('password',e.target.value)} 
                            className={`p-3 border-[1px] w-full bg-white shadow-custom-shadow-input border-[#6C2E9C] rounded-xl outline-none`}
                            />
                            <span className="absolute p-1 top-[14%] right-[5%] md:top-[15%] lg:p-2 lg:right-[12%] lg:top-[16%] cursor-pointer">
                                <i onClick={ShowPassword} className={`fa-light fa-eye${ui_state.show_password? '' : '-slash'}`}></i>
                            </span>
                        </div>
                        <div className={`w-[80%] flex flex-row justify-start items-center ${ui_state.show_progress_bar? 'my-2' : 'h-0'} duration-500`}>
                            <div className={`w-1/2 h-1 rounded-xl bg-neutral-200 ${ui_state.show_progress_bar? '' : 'translate-y-[-20px] opacity-0 md:translate-y-[18px] lg:translate-y-[20px]'} duration-500`}>
                                <div className={`h-1 ${ui_state.progress_bar_message.bg_color} rounded-xl`} style={{ width: `${ui_state.password_strength}%` }}></div>
                            </div>
                            <span className={`text-sm mx-1 ${ui_state.progress_bar_message.text_color} ${ui_state.show_progress_bar? '' : 'translate-y-[-20px] opacity-0 md:translate-y-[18px] lg:translate-y-[20px]'} duration-300`}>{ui_state.progress_bar_message.msg}</span>
                        </div>
                        <div className="w-full flex justify-center mt-3">
                            <input 
                            type="text" 
                            id="websiteurl"
                            name="websiteurl"
                            placeholder='Website URL' 
                            value={`${user_data.website_url}`} 
                            autoComplete="url" 
                            onChange={(e) => InputChange('website_url',e.target.value)} 
                            className="p-3 pl-2 border-[1px] border-[#6C2E9C] w-5/6 rounded-2xl bg-white shadow-custom-shadow-input outline-none"
                            />
                        </div>
                        <button type="submit" className="bg-[#6C2E9C] p-1 md:p-2 lg:p-2 mt-5 lg:mt-6 text-white text-xl lg:text-xl font-light rounded-lg w-[35%] text-center">Join</button>
                    </form>
                    <div className="bottom-[9%] lg:bottom-[6%] mt-2 lg:mt-4">
                        <p className="text-sm font-light">already signed-in<i className="fa-light fa-question mx-1 mr-3"></i><Link to="/" className="text-[#A881D4] underline">Back to login</Link></p>
                    </div>
                    <div className="absolute bg-[#6C2E9C] lg:w-[65px] lg:h-[65px] w-[35px] h-[35px] bottom-[10%] right-[10%] lg:left-[10%] rounded-full"></div>
                    <div className="absolute bg-[#6C2E9C] lg:w-[21px] lg:h-[21px] w-[35px] h-[35px] bottom-[4%] right-[40%] lg:left-[30%] rounded-full"></div>
                    <div className="lg:hidden absolute h-[70%] w-[60%] bottom-0 left-0 bg-register-mobile-bottom-left bg-cover z-0"></div>
                </div>
                <div className="hidden lg:block lg:h-screen lg:w-1/2">
                    <img src="https://res.cloudinary.com/dskpbps9l/image/upload/v1698070920/ChatBudy.io/Increase_Your_Sales_jlrrxf.png" width="800" height="800" alt="canva image" className="h-full w-full" />
                </div>
            </motion.div>
        </>
    );    
}

export default RegisterPage;