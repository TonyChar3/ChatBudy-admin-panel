import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';
import { auth } from '../../firebase_setup/firebase_conf';
import { updateProfile } from 'firebase/auth';
import { FirebaseErrorhandler, calculatePasswordStrength, passwordStrengthSpanMessage } from '../../context/utils/manageAuth';

const RegisterPage = () => {

    const navigate = useNavigate();

    const  { Register, setModalOpen, setModalMsg, setModalMode, setShowLoader }  = UserAuth();

    const [passwrd, setPasswrd] = useState('');
    const [show_passwrd, setShowPasswrd] = useState(false);
    const [password_strength, setStrength] = useState(0);
    const [show_bar, setShowBar] = useState(false);
    const [progress_bar_msg, setBarMsg] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [websiteUrl, setUrl] = useState('');
    const [error_mode, setErrorMode] = useState(false);

    const url_regex = /^https:\/\/(?:www\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}[^ ]*$/
    const passwrd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const username_regex = /^[a-zA-Z0-9]+([\s._][a-zA-Z0-9]+)?$/


    const handleEmail = (e) => {
        setEmail(e)
    }

    const handleUsername = (e) => {
        setUsername(e)
    }

    const handlePassword = (e) => {
        setPasswrd(e.trim())
    }

    const handleShowPassword = () => {
        setShowPasswrd(show_passwrd => !show_passwrd)
    }

    const handleWebsiteUrl = (e) => {
        setUrl(e.trim())
    }

    const handleRegister = async(e) => {
        e.preventDefault();
        try{
            if(username === "" || email === "" || passwrd === "" || websiteUrl === ""){
                setErrorMode(true);
                setModalMode(true);
                setModalOpen(true);
                setModalMsg('ERROR: Please make sure to fill in all the fields.');
            } else {
                // sanitize with regex
                if(!email_regex.test(email)){
                    setErrorMode(true);
                    setModalMode(true);
                    setModalOpen(true);
                    setModalMsg('ERROR: Invalid email address');
                }

                if(!passwrd_regex.test(passwrd)){
                    setErrorMode(true);
                    setModalMode(true);
                    setModalOpen(true);
                    setModalMsg('ERROR: Invalid password');
                }

                if(!username_regex.test(username)){
                    setErrorMode(true);
                    setModalMode(true);
                    setModalOpen(true);
                    setModalMsg('ERROR: Invalid username');
                }

                if(!url_regex.test(websiteUrl)){
                    setErrorMode(true);
                    setModalMode(true);
                    setModalOpen(true);
                    setModalMsg('ERROR: Invalid website url');
                }
                
                if(url_regex.test(websiteUrl) && username_regex.test(username) && passwrd_regex.test(passwrd) && email_regex.test(email)){
                    // else if no error send it to the backend
                    setErrorMode(false);
                    setShowLoader(true);
                    const register = await Register(username, email, passwrd, websiteUrl);
                    if(register){
                        await updateProfile(auth.currentUser, { displayName: username });
                        setShowLoader(false);
                        navigate("/navbar/visitors");
                    } else if(!register){
                        setErrorMode(true);
                        setUsername('');
                        setEmail('');
                        setPasswrd('');
                        setUrl('');
                    }
                }
            }
        } catch(err){
            const error_message = FirebaseErrorhandler(err.code);
            setErrorMode(true);
            setModalMode(true);
            setModalOpen(true);
            setModalMsg(`ERROR: ${error_message}`);
        }
    }

    const handleShowProgressBar = () => {
        setShowBar(show_bar => !show_bar)
    }

    useEffect(() => {
        const set_strength = calculatePasswordStrength(passwrd);
        setStrength(set_strength);
        const set_bar_msg = passwordStrengthSpanMessage(set_strength);
        setBarMsg(set_bar_msg);
    },[passwrd])

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
                    <form className={`w-80 lg:w-2/4 p-2 my-4 flex flex-col justify-center items-center border-[1px] bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-lg ${error_mode? 'shadow-red-500 border-red-500' : 'shadow-[#33b8b8] border-[#33b8b8]'}`}>
                        <div className="w-full flex justify-center m-4">
                            <h1 className="text-center text-2xl text-black font-light lg:text-3xl">Start for <span className="text-[#33b8b8] underline">FREE</span></h1>
                        </div>
                        <div className="w-full flex justify-center m-3 lg:m-5">
                            <input type="text" placeholder='Business name' value={`${username}`} autoComplete='username' onChange={(e) => handleUsername(e.target.value)} className="p-2 lg:p-3 pl-2 border-[1px] border-[#33b8b8] lg:border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md shadow-[#33b8b8] outline-none"/>
                        </div>
                        <div className="w-full flex justify-center m-3 lg:m-5">
                            <input type="email" placeholder='Email' value={`${email}`} autoComplete='email' onChange={(e) => handleEmail(e.target.value)} className="p-2 lg:p-3 pl-2 border-[1px] border-[#33b8b8] lg:border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md shadow-[#33b8b8] outline-none"/>
                        </div>
                    </form>
                    <form onSubmit={handleRegister} className={`relative w-80 lg:w-2/4 p-2 my-4 flex flex-col justify-center items-center border-[1px] bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-lg ${error_mode? 'shadow-red-500 border-red-500' : 'shadow-[#33b8b8] border-[#33b8b8]'}`}>
                        <div className="w-full flex justify-center m-3 lg:m-5 lg:mt-8 mt-4">
                            <input onFocus={handleShowProgressBar} onBlur={handleShowProgressBar} type={`${show_passwrd? 'text' : 'password'}`} placeholder='Password' value={`${passwrd}`} autoComplete='password' onChange={(e) => handlePassword(e.target.value)} className={`p-2 lg:p-3 pl-2 border-[1px] border-[#33b8b8] lg:border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md shadow-[#33b8b8] outline-none`}/>
                            <span className="absolute p-1 top-[14%] right-10 lg:p-2 lg:right-[12%] lg:top-[16%]"><i onClick={handleShowPassword} className={`fa-light fa-eye${show_passwrd? '' : '-slash'}`}></i></span>
                        </div>
                        <div className={`w-[80%] flex flex-row justify-start items-center ${show_bar? '' : 'h-0'} duration-500`}>
                            <div className={`w-1/2 h-1 rounded-xl bg-neutral-200 ${show_bar? '' : 'translate-y-[-20px] opacity-0 lg:translate-y-[20px]'} duration-500`}>
                                <div className={`h-1 ${progress_bar_msg.bg_color} rounded-xl`} style={{ width: `${password_strength}%` }}></div>
                            </div>
                            <span className={`text-sm mx-1 ${progress_bar_msg.text_color} ${show_bar? '' : 'translate-y-[-20px] opacity-0 lg:translate-y-[20px]'} duration-300`}>{progress_bar_msg.msg}</span>
                        </div>
                        <div className="w-full flex justify-center m-2">
                            <input type="text" placeholder='Website URL' value={`${websiteUrl}`} autoComplete="url" onChange={(e) => handleWebsiteUrl(e.target.value)} className="p-3 lg:p-6 pl-2 border-[1px] border-white w-4/6 rounded-2xl bg-[#33b8b8] bg-opacity-10 backdrop-filter backdrop-blur-sm outline-none"/>
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