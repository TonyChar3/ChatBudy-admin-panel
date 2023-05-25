import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';
import { auth } from '../../firebase_setup/firebase_conf';
import { updateProfile } from 'firebase/auth';

const RegisterPage = () => {

    const navigate = useNavigate();

    const  { Register }  = UserAuth();

    const [passwrd, setPasswrd] = useState();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();

    const handleEmail = (e) => {
        setEmail(e.trim())
    }

    const handleUsername = (e) => {
        setUsername(e.trim())
    }

    const handlePassword = (e) => {
        setPasswrd(e.trim())
    }

    const handleRegister = async(e) => {
        e.preventDefault();
        try{
            const register = await Register(email, passwrd)

            if(register){
                await updateProfile(auth.currentUser, { displayName: username });
                navigate("/navbar/visitors")
            }
        } catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <motion.div 
                className="w-screen h-screen flex flex-col lg:flex-row justify-center lg:justify-between items-center"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            > 
                <div className="absolute top-5 left-10 rounded-xl lg:hidden">
                    <img src="/images/1.png" alt="chat canva" width="100" height="100" className="rounded-xl"/>
                </div>
                <div className="lg:w-1/2 lg:flex lg:flex-row lg:justify-center">
                    <div className="lg:block lg:absolute lg:top-0 lg:left-8 hidden">
                        <img src="/images/Increase Your Sales.png" alt="canva logo" width="150" height="150" />
                    </div>
                    <form onSubmit={handleRegister} className="w-80 lg:w-2/4 p-2 flex flex-col justify-center items-center border-[1px] border-[#33b8b8] bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-lg shadow-[#33b8b8]">
                        <div className="w-full flex justify-center m-4">
                            <h1 className="text-center text-2xl text-black font-light lg:text-4xl">Register</h1>
                        </div>
                        <div className="w-full flex justify-center m-3 lg:m-5">
                            <motion.input whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.90 }} whileFocus={{ scale: 1.05 }} type="text" placeholder='Full name' onChange={(e) => handleUsername(e.target.value)} className="p-1 lg:p-3 pl-2 border-[1px] border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md shadow-[#33b8b8] outline-none"/>
                        </div>
                        <div className="w-full flex justify-center m-3 lg:m-5">
                            <motion.input whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.90 }} whileFocus={{ scale: 1.05 }} type="email" placeholder='Email' onChange={(e) => handleEmail(e.target.value)} className="p-1 lg:p-3 pl-2 border-[1px] border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md shadow-[#33b8b8] outline-none"/>
                        </div>
                        <div className="w-full flex justify-center m-3 lg:m-5 lg:mt-8 mt-4">
                            <motion.input whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.90 }} whileFocus={{ scale: 1.05 }} type="password" placeholder='Password' onChange={(e) => handlePassword(e.target.value)} className="p-1 lg:p-3 pl-2 border-[1px] border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md shadow-[#33b8b8] outline-none"/>
                        </div>
                        <div className="w-full flex justify-center m-2">
                            <motion.input whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.90 }} whileFocus={{ scale: 1.05 }} type="text" placeholder='Website URL' className="p-3 lg:p-6 pl-2 border-[1px] border-white w-4/6 rounded-2xl bg-[#33b8b8] bg-opacity-10 backdrop-filter backdrop-blur-sm outline-none"/>
                        </div>
                        <button type="submit" className="bg-[#33b8b8] p-1 lg:p-2 text-white text-lg lg:text-2xl font-light rounded-lg w-[30%] text-center m-3">Sign-up</button>
                        <Link to="/" className="m-2 underline text-lg text-[#33b8b8] font-light">already registered ?</Link>
                    </form>
                </div>
                <div className="absolute bottom-10 right-10 lg:hidden">
                    <img src="/images/2.png" alt="chat canva" width="150" height="150" className="rounded-xl"/>
                </div>
                <div className="hidden lg:block lg:h-screen lg:w-1/2">
                    <img src="images/increase_sales.png" width="800" height="800" alt="canva image" className="h-full w-full" />
                </div>
            </motion.div>
        </>
    );    
}

export default RegisterPage;