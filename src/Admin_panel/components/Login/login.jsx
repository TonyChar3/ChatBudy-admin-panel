import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import { sanitizeInputValue } from '../../../context/utils/security';

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
                className="relative w-full h-screen flex lg:flex-row justify-center items-center bg-white"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            > 
                <div className="hidden lg:block absolute top-0 left-0 h-[13%] w-[10%] mx-6 my-3 flex flex-row justify-center items-center">
                    <img src="https://res.cloudinary.com/dskpbps9l/image/upload/v1698064004/ChatBudy.io/Increase_Your_Sales_5_wv9ifc.png" alt="main logo chatbudy" w="100" h="100" />
                </div>
                <div className="absolute h-[30%] w-[90%] top-0 left-0 bg-login-mobile-top-left lg:top-0 lg:left-auto lg:h-[50%] lg:w-[30%] lg:right-[0] lg:bg-login-top-right bg-cover"></div>
                <div className="absolute bg-[#6C2E9C] lg:w-[65px] lg:h-[65px] w-[35px] h-[35px] top-20 right-[13%] lg:right-[27%] rounded-full"></div>
                <div className="hidden lg:block absolute bg-[#6C2E9C] w-[51px] h-[51px] top-40 left-[12%] rounded-full"></div>
                <div className="hidden lg:block absolute bg-[#6C2E9C] w-[20px] h-[20px] top-60 left-[17%] rounded-full"></div>
                <div className="lg:w-1/2 lg:flex lg:flex-row lg:justify-center">
                    <form onSubmit={SignUpUser} className={`lg:w-1/2 md:w-96 w-80 p-2 flex flex-col justify-center items-center bg-white bg-opacity-30 backdrop-filter`}>
                        <div className="w-full flex flex-col justify-center items-center my-1 text-[#A881D4]">
                            <h1 className="text-center text-4xl font-light md:text-3xl lg:text-5xl">
                                Welcome!
                            </h1>
                            <h2 className="text-sm p-1">
                                Connect to continue
                            </h2>
                        </div>
                        <div className="w-full flex justify-center m-4 md:m-6 lg:m-8">
                            <input 
                            type="text" 
                            name='email'
                            id="email"
                            placeholder='Email'
                            autoComplete='email' 
                            onChange={(e) => InputChange('email',e.target.value)} 
                            className="p-3 md:p-3 lg:p-3 pl-2 border-[1px] border-[#6C2E9C] w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-custom-shadow-input rounded-xl outline-none md:text-lg lg:text-lg"
                            />
                        </div>
                        <div className="relative w-full flex flex-col justify-center items-center mt-4">
                            <input 
                            type={`${ui_state.show_password? 'text' : 'password'}`} 
                            name="password"
                            id='password'
                            placeholder='Password' 
                            autoComplete='password'
                            value={`${user_data.password}`} 
                            onChange={(e) => InputChange('password',e.target.value)} 
                            className="p-3 md:p-3 lg:p-3 pl-2 border-[1px] border-[#6C2E9C] w-full bg-white bg-opacity-10 shadow-custom-shadow-input rounded-xl outline-none md:text-lg lg:text-lg"
                            />
                            <span className="absolute p-1 right-[5%] lg:p-2 lg:right-[4%] cursor-pointer">
                                <i onClick={ShowPassword} className={`fa-light fa-eye${ui_state.show_password? '' : '-slash'}`}></i>
                            </span>
                        </div>
                        <div className="w-full p-1 mt-2 mb-4">
                            <Link to="/forgot-password-form">
                                <span className="text-sm underline text-[#A881D4] lg:text-md cursor-pointer">
                                    Forgot password ?
                                </span>
                            </Link>
                        </div>
                        <button type="submit" className="bg-[#6C2E9C] p-2 text-lg text-white font-light rounded-xl w-[30%] lg:w-[40%] text-center mb-3 lg:text-xl">
                            Connect
                        </button>
                        <span className="mt-2">
                            No account yet ?
                            <Link to="/register" className="p-2 underline text-lg text-[#A881D4] font-light">
                                Register here
                            </Link>
                        </span>
                    </form>
                </div>
                <div className="absolute bg-[#6C2E9C] w-[101px] h-[101px] bottom-[8%] right-[-5%] lg:w-[61px] lg:h-[61px] lg:bottom-40 lg:right-[15%] rounded-full"></div>
                <div className="absolute bg-[#6C2E9C] w-[20px] h-[20px] bottom-[16%] right-[50%] lg:bottom-[16%] lg:right-[21%] rounded-full"></div>
                <div className="lg:hidden absolute bg-[#6C2E9C] w-[61px] h-[61px] bottom-[3%] left-[21%] rounded-full"></div>
                <div className="hidden lg:block lg:absolute lg:h-[50%] lg:w-[30%] lg:bottom-0 lg:left-[-2%] lg:bg-login-bottom-left lg:bg-cover z-20"></div>
            </motion.div>
        </>

    );
}

export default LogInPage;