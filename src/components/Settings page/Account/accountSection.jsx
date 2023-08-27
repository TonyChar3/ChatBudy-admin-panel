import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserAuth } from '../../../context/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import { FirebaseErrorhandler } from '../../../context/utils/manageAuth';
import axios from 'axios';

const AccountSection = () => {

    const { user, setPasswordAuthModalOpen, setModalOpen, setModalMsg, setModalMode } = UserAuth();

    const [editMode, setMode] = useState(false);
    const [user_name, setUserName] = useState('');
    const [user_email, setUserEmail] = useState('');
    const [change_passwrd, setChangePasswrd] = useState('');
    const [confrm_passwrd, setConfrmPasswrd] = useState('');

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const userNameRegex = /^[a-zA-Z0-9_]*$/;

    const handleEditMode = () => {
        setMode(editMode => !editMode)
    }

    const handleCancelEditMode = (e) => {
        e.preventDefault();
        setMode(editMode => !editMode);
        setUserName('');
        setUserEmail('');
        setChangePasswrd('');
        setConfrmPasswrd('');
    }

    const handleUserEmail = (e) => {
        setUserEmail(e.target.value)
    }

    const handleUserName = (e) => {
        const value = e.target.value
        if(userNameRegex.test(value)){
            setUserName(value)
        }
    }

    const handleUpdatePassword = () => {
        setPasswordAuthModalOpen(true);
    }

    const handleSaveUpdates = async(e) => {
        e.preventDefault();
        try{
            if( user_email === '' && user_name === ''){
                // do nothing...
            } else if (emailRegex.test(user_email)){
                const response = await axios.put('http://localhost:8080/user/update-profile',{
                    new_name: user_name,
                    new_email: user_email
                },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  `Bearer ${user.accessToken}`
                }
                });
                if(response){
                    window.location.reload();
                } else if (!response){
                    setModalMode(true);
                    setModalOpen(true);
                    setModalMsg('ERROR: Unable to save updates');
                }
            } else if ( !emailRegex.test(user_email)) {
                setModalMode(true);
                setModalOpen(true);
                setModalMsg('ERROR: Invalid email.')
            }
        } catch(err){
            setModalMode(true);
            setModalOpen(true);
            setModalMsg('ERROR: Unable to save and update the profile. Please try again or contact support.')
        }
        handleCancelEditMode(e)
    }

    const handleVerificationEmail = () => {
        sendEmailVerification(user)
            .then(() => {
                setModalMode(false)
                setModalOpen(true)
                setModalMsg('Email sent')
            })
            .catch((err) => {
                const error_message = FirebaseErrorhandler(err.code)
                setModalMode(true)
                setModalOpen(true)
                setModalMsg(`ERROR: ${error_message}`)
            })
    }

    useEffect(() => {
        if(user){
            setUserName(user_name)
            setUserEmail(user_email)
            setChangePasswrd(change_passwrd)
            setConfrmPasswrd(confrm_passwrd)
        }
    },[user_name, user_email, change_passwrd, confrm_passwrd])

    return(
        <>
            <motion.div 
                className="w-full h-full flex flex-col justify-center items-center"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <form onSubmit={handleSaveUpdates} className="w-[90%] lg:w-[70%] p-1 border-2 border-[#33b8b8] rounded-xl shadow-md shadow-[#33b8b8]">
                    <div className="w-full flex justify-center p-2 my-2">
                        <h1 className="text-2xl lg:text-3xl">Your account<i className="fa-regular fa-user ml-2"></i></h1>
                    </div>
                    <div className="w-full flex justify-center p-2">
                        <input 
                            type="text" 
                            name="username"
                            value={user_name}
                            autoComplete='new-name'
                            disabled={editMode? '' : 'disabled'}
                            placeholder={user.displayName} 
                            className="w-[70%] p-1 lg:p-2 hover:scale-[1.02] focus:scale-[1.05] border-[1px] border-[#33b8b8] outline-none duration-200 ease-in-out rounded-lg"
                            onChange={handleUserName}
                        />
                    </div>
                    <div className="w-full flex justify-center p-2">
                        <input 
                            type="text" 
                            name="email"
                            value={user_email}
                            autoComplete='new-email'
                            disabled={editMode? '' : 'disabled'}
                            placeholder={user.email}
                            className="w-[70%] p-1 lg:p-2 hover:scale-[1.02] focus:scale-[1.05] border-[1px] border-[#33b8b8] outline-none duration-200 ease-in-out rounded-lg"
                            onChange={handleUserEmail}
                        />
                    </div>
                    <div className={`${editMode? 'hidden' : ''} w-full flex justify-center text-md text-[#33b8b8] p-1`}>
                        <h3 onClick={handleUpdatePassword} className="cursor-pointer">Update Password ?</h3>
                    </div>
                    <div className={`w-full flex flex-row justify-center items-center`}>
                        <button onClick={() => handleEditMode()} type="button" className={`${editMode? 'hidden' : ''} w-[30%] lg:w-[15%] p-1 m-1 text-md text-white bg-[#33b8b8] rounded-xl active:scale-[0.90] duration-200 ease-in-out`}>Edit</button>
                        <button type="submit" className={`${editMode? '' : 'hidden'} w-[30%] lg:w-[15%] p-1 m-1 text-md text-white bg-[#19e392] rounded-xl active:scale-[0.90] duration-200 ease-in-out`}>Save</button>
                        <button onClick={(e) => handleCancelEditMode(e)} type="button" className={`${editMode? '' : 'hidden'} w-[30%] lg:w-[15%] p-1 m-1 text-md text-white bg-[#f53722] rounded-xl active:scale-[0.90] duration-200 ease-in-out`}>Cancel</button>
                    </div>
                    <div className={`${editMode? 'hidden' : ''} w-full flex justify-center`}>
                        {
                            user.emailVerified? 
                                <div className="flex flex-row w-full justify-start items-center p-2">
                                    <div className="my-4 text-green-500 underline">
                                        Verified<i className="fa-solid fa-check ml-1"></i>
                                    </div>
                                </div>
                      
                            :
                            <div className="flex flex-row w-full justify-start items-center p-2">
                                <div className="my-4 text-red-500 underline">
                                    Not verified<i className="fa-solid fa-xmark ml-1"></i>
                                </div>
                                <button onClick={handleVerificationEmail} type="button" className="my-4 ml-2 w-[30%] lg:w-[15%] p-1 text-md text-[#33b8b8] bg-white border-[1px] border-[#33b8b8] rounded-xl active:scale-[0.90] duration-200 ease-in-out">Send email</button>
                            </div>
                                
                        }
                        
                    </div>
                </form> 
            </motion.div>
        </>
    );
}

export default AccountSection;