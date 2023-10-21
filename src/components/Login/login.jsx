import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { sanitizeInputValue } from '../../context/utils/security';

const LogInPage = () => {

    const navigate = useNavigate();

    const { 
        Login, 
        setModalOpen, 
        setModalErrorMode, 
        setModalMsg } = UserAuth();
    
    const [ui_state, setUIstate] = useState({
        error_mode: false,
        show_password: false
    });
    const [user_data, setUserData] = useState({
        email: '',
        password: ''
    });

    const InputChange = (name, value) => {
        setUserData(prevValue => ({
            ...prevValue,
            [name]: value
        }))
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

    const SignUpUser = async(e) => {
        e.preventDefault()
        // sanitize inputs value
        const sanitize_email = sanitizeInputValue(user_data.email);
        const sanitize_password = sanitizeInputValue(user_data.password);

        if(user_data.email === '' || user_data.password === ''){
            setModalOpen(true);
            setModalMsg('ERROR: Missing credentials. Please provide your email and your password');
            setModalErrorMode(true);
            setUIstate(prevValue => ({
                ...prevValue,
                error_mode: true
            }));
            return;
        }
        // login the user
        const login = await Login(sanitize_email, sanitize_password);
        if(!login){
            setUIstate(prevValue => ({
                ...prevValue,
                error_mode: true
            }));
        } else {
            setUIstate(prevValue => ({
                ...prevValue,
                error_mode: false
            }));
            navigate("/navbar/visitors");
        }
    }

    return(
        <>
            <motion.div 
                className="w-screen h-screen flex lg:flex-row justify-center items-center bg-white"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            > 
                <div className="absolute top-5 right-6 rounded-xl lg:hidden">
                    <img src="/images/1.png" alt="chat canva" width="100" height="100" className="rounded-xl"/>
                </div>
                <div className="absolute top-[8%] left-10 lg:hidden">
                    <img src="/images/4.png" alt="money cnava" width="100" height="100" className="rounded-full"/>
                </div>
                <div className="hidden lg:block absolute top-0 left-10">
                    <img src="images/Increase Your Sales.png" width="150" height="150" alt="canva image" />
                </div>
                <div className="hidden lg:block absolute top-20 right-20">
                    <img src="images/3.png" width="150" height="150" alt="canva image" className="rounded-xl" />
                </div>
                <div className="hidden lg:block absolute top-80 left-80">
                    <img src="images/4.png" width="50" height="50" alt="canva image" className="rounded-full" />
                </div>
                <div className="lg:w-1/2 lg:flex lg:flex-row lg:justify-center">
                    <form onSubmit={SignUpUser} className={`lg:w-1/2 w-80 p-2 flex flex-col justify-center items-center border-[1px] bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-lg ${ui_state.error_mode? 'shadow-red-500 border-red-500' : 'shadow-[#33b8b8] border-[#33b8b8]'}`}>
                        <div className="w-full flex justify-center m-4">
                            <h1 className="text-center text-2xl text-black font-light lg:text-3xl">
                                Access your account
                            </h1>
                        </div>
                        <div className="w-full flex justify-center m-4 lg:m-8">
                            <input 
                            type="text" 
                            placeholder='Email'
                            autoComplete='email' 
                            onChange={(e) => InputChange('email',e.target.value)} 
                            className="p-2 lg:p-3 pl-2 border-[1px] border-[#33b8b8] lg:border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-lg shadow-[#33b8b8] outline-none lg:text-lg"
                            />
                        </div>
                        <div className="w-full flex flex-col justify-center items-center mt-4">
                            <input 
                            type={`${ui_state.show_password? 'text' : 'password'}`} 
                            placeholder='Password' 
                            autoComplete='password'
                            value={`${user_data.password}`} 
                            onChange={(e) => InputChange('password',e.target.value)} 
                            className="p-2 lg:p-3 pl-2 border-[1px] border-[#33b8b8] lg:border-white w-5/6 bg-white bg-opacity-10 shadow-[#33b8b8] shadow-md outline-none lg:text-lg"
                            />
                            <span className="absolute p-1 right-[22%] lg:p-2 lg:right-[12%] lg:bottom-[38%] cursor-pointer">
                                <i onClick={ShowPassword} className={`fa-light fa-eye${ui_state.show_password? '' : '-slash'}`}></i>
                            </span>
                        </div>
                        <div className="w-[85%] p-1 mt-2 mb-4">
                            <Link to="/forgot-password-form">
                                <span className="text-sm underline text-[#33b8b8] lg:text-md cursor-pointer">
                                    Forgot password ?
                                </span>
                            </Link>
                        </div>
                        <button type="submit" className="bg-[#33b8b8] p-1 text-white font-light rounded-lg w-[30%] text-center mb-3 lg:p-2 lg:text-xl">
                            Connect
                        </button>
                        <Link to="/register" className="mt-2 underline text-lg text-[#33b8b8] font-light">
                            Register
                        </Link>
                    </form>
                </div>
                <div className="hidden lg:block absolute bottom-80 right-80">
                    <img src="images/4.png" width="100" height="100" alt="canva image" className="rounded-full" />
                </div>
                <div className="hidden lg:block absolute bottom-20 left-20">
                    <img src="images/1.png" width="150" height="150" alt="canva image" className="rounded-xl" />
                </div>
                <div className="absolute bottom-[5%] right-20 lg:hidden">
                    <img src="/images/4.png" alt="money cnava" width="50" height="50" className="rounded-full"/>
                </div>
                <div className="absolute bottom-[6%] left-6 lg:hidden">
                    <img src="/images/3.png" alt="money cnava" width="100" height="100" className="rounded-xl"/>
                </div>
            </motion.div>
        </>

    );
}

export default LogInPage;