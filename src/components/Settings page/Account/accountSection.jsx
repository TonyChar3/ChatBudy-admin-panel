import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserAuth } from '../../../context/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import { FirebaseErrorhandler } from '../../../context/utils/manageAuth';
import { generateCSVfile, saveNewProfileInfo } from '../../../context/utils/settingsFunctions';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { useNavigate } from 'react-router-dom';

const AccountSection = () => {

    const { 
        user, 
        setPasswordAuthModalOpen, 
        setModalOpen, 
        setModalMsg, 
        setModalErrorMode } = UserAuth();

    const [editMode, setMode] = useState(false);
    const [profile_info, setProfileInfo] = useState({
        user_name: '',
        user_email: ''
    });

    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    const isMobileView = windowWidth <= 768;

    const CancelEditMode = (e) => {
        e.preventDefault();
        setMode(editMode => !editMode);
        setProfileInfo(prevValue => ({
            ...prevValue,
            user_name: '',
            user_email: ''
        }));
    }

    const InputChange = (name, value) => {
        setProfileInfo(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    const SaveUpdatedInfo = async(e) => {
        e.preventDefault();
        if( profile_info.user_email === '' && profile_info.user_name === ''){
            // do nothing...
            return;
        }
        // save the new data
        const saving = await saveNewProfileInfo(profile_info.user_name || user.displayName, profile_info.user_email || user.email, user.accessToken);
        if(saving.error){
            setModalOpen(true);
            setModalErrorMode(true);
            setModalMsg(saving.msg)
        }
        CancelEditMode(e)
    }

    const DownLoadCSV = async() => {
        const generate_csv = await generateCSVfile(user.accessToken);
        if(generate_csv.error){
            setModalErrorMode(true);
            setModalOpen(true);
            setModalMsg(generate_csv.msg);
        }
    }

    useEffect(() => {
        if(user){
            setProfileInfo(prevValue => ({
                ...prevValue,
                user_name: profile_info.user_name,
                user_email: profile_info.user_email
            }));
        }
    },[profile_info.user_name, profile_info.user_email])

    useEffect(() => {
        if(!isMobileView){
            navigate('/navbar/setting')
        }
    },[isMobileView])

    return(
        <>
            <motion.div 
                className="w-full h-full flex flex-col justify-center items-center"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <form onSubmit={SaveUpdatedInfo} className="w-[90%] lg:w-[70%] xl:w-[65%] p-1 border-2 border-[#33b8b8] rounded-xl shadow-md shadow-[#33b8b8]">
                    <div className="w-full flex justify-center p-2 my-2">
                        <h1 className="text-2xl lg:text-3xl">Your account<i className="fa-regular fa-user ml-2"></i></h1>
                    </div>
                    <div className="w-full flex justify-center p-2">
                        <input 
                            type="text" 
                            name="username"
                            value={profile_info.user_name}
                            autoComplete='new-name'
                            disabled={editMode? '' : 'disabled'}
                            placeholder={user.displayName} 
                            className="w-[70%] p-1 lg:p-2 hover:scale-[1.02] focus:scale-[1.05] border-[1px] border-[#33b8b8] outline-none duration-200 ease-in-out rounded-lg"
                            onChange={(e) => InputChange('user_name', e.target.value)}
                        />
                    </div>
                    <div className="w-full flex justify-center p-2">
                        <input 
                            type="text" 
                            name="email"
                            value={profile_info.user_email}
                            autoComplete='new-email'
                            disabled={editMode? '' : 'disabled'}
                            placeholder={user.email}
                            className="w-[70%] p-1 lg:p-2 hover:scale-[1.02] focus:scale-[1.05] border-[1px] border-[#33b8b8] outline-none duration-200 ease-in-out rounded-lg"
                            onChange={(e) => InputChange('user_email', e.target.value)}
                        />
                    </div>
                    <div className={`${editMode? 'hidden' : ''} w-full flex justify-center text-md text-[#33b8b8] p-1`}>
                        <h3 onClick={() => setPasswordAuthModalOpen(true)} className="cursor-pointer">Update Password ?</h3>
                    </div>
                    <div className={`w-full flex flex-row justify-center items-center`}>
                        <button onClick={() => setMode(editMode => !editMode)} type="button" className={`${editMode? 'hidden' : ''} w-[30%] lg:w-[15%] p-1 m-1 text-md text-white bg-[#33b8b8] rounded-xl active:scale-[0.90] duration-200 ease-in-out`}>Edit</button>
                        <button type="submit" className={`${editMode? '' : 'hidden'} w-[30%] lg:w-[15%] p-1 m-1 text-md text-white bg-[#19e392] rounded-xl active:scale-[0.90] duration-200 ease-in-out`}>Save</button>
                        <button onClick={(e) => CancelEditMode(e)} type="button" className={`${editMode? '' : 'hidden'} w-[30%] lg:w-[15%] p-1 m-1 text-md text-white bg-[#f53722] rounded-xl active:scale-[0.90] duration-200 ease-in-out`}>Cancel</button>
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
                                <button onClick={ () => {
                                    sendEmailVerification(user)
                                    .then(() => {
                                        setModalErrorMode(false)
                                        setModalOpen(true)
                                        setModalMsg('Email sent')
                                    })
                                    .catch((err) => {
                                        const error_message = FirebaseErrorhandler(err.code)
                                        setModalErrorMode(true)
                                        setModalOpen(true)
                                        setModalMsg(`ERROR: ${error_message}`)
                                    })
                                }
                                } 
                                type="button" 
                                className="my-4 ml-2 lg:ml-3 w-[30%] lg:w-[25%] p-1 text-md text-[#33b8b8] bg-white border-[1px] border-[#33b8b8] rounded-xl active:scale-[0.90] duration-200 ease-in-out">
                                    Send email
                                </button>
                            </div>
                                
                        }
                    </div>
                </form>
                <div className="w-[90%] xl:w-[70%] my-5 flex flex-col">
                    <div className="w-[35%] xl:w-[30%] p-1 flex flex-row justify-center border-2 border-[#33b8b8] rounded-xl shadow-md shadow-[#33b8b8] transform-all active:scale-[0.90] ease-in-out">
                        <span onClick={() => DownLoadCSV()} className="cursor-pointer">visitors.csv<i className="fa-light fa-file-arrow-down ml-1 lg:ml-2 text-[#33b8b8]"></i></span>
                    </div> 
                </div>
            </motion.div>
        </>
    );
}

export default AccountSection;