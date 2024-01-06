import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserAuth } from '../../../../context/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import { FirebaseErrorhandler } from '../../../../context/utils/manageAuth';
import { saveNewProfileInfo, startStripePortalSession } from '../../../../context/utils/settingsFunctions';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { useNavigate } from 'react-router-dom';

const AccountSection = ({ close_page_desktop }) => {

    const { 
        user, 
        setPasswordAuthModalOpen, 
        setModalOpen, 
        setModalMsg, 
        setModalErrorMode,
        setDeleteModalOpen, 
        setDeleteModalUser,
        setShowLoader,
        user_current_plan } = UserAuth();

    const [editMode, setMode] = useState(false);
    const [profile_info, setProfileInfo] = useState({
        user_name: '',
        user_email: ''
    });

    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    const isMobileView = windowWidth <= 820;

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

    const RemoveAccount = () => {
        // Show the Delete modal
        setDeleteModalOpen(true);
        // Set the modal to delete user account
        setDeleteModalUser(true);
    }

    const StartPortalSession = async() => {
        setShowLoader(true);
        // function to start portal session
        const start_session = await startStripePortalSession(user.accessToken);
        if(start_session.error){
            setShowLoader(false);
            setModalErrorMode(true);
            setModalOpen(true);
            setModalMsg(start_session.error_msg);
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
            navigate('/navbar/setting');
        }
    },[isMobileView])
    
    return(
        <>
            <motion.div 
                className="relative w-full h-full flex flex-col justify-center items-center bg-settings-section-bg bg-cover bg-no-repeat"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="absolute top-0 left-0 w-[20px] p-3 m-3 text-center text-[#A881D4] rounded-3xl active:scale-[0.90] ease duration-300 cursor-pointer">
                    <Link to="/navbar/setting" className="lg:hidden">
                        <i className="fa-solid fa-chevron-left text-3xl"></i>
                    </Link>
                    <i onClick={() => close_page_desktop('')} className="fa-regular fa-circle-xmark hidden lg:inline-block text-3xl"></i>
                </div>
                <button onClick={RemoveAccount} className={`${user.email === 'randomprojectemail395@gmail.com'? "hidden" : ""} absolute top-0 right-0 w-[80px] p-3 m-3 bg-[#A881D4] text-[#6C2E9C] rounded-3xl active:scale-[0.90] ease duration-300`}>
                    <i className="fa-solid fa-user-minus text-xl"></i>
                </button>
                <form onSubmit={SaveUpdatedInfo} className="w-[90%] md:w-[65%] lg:w-[70%] xl:w-[65%] p-1 border-[1px] border-[#6C2E9C] bg-white rounded-xl shadow-custom-shadow-input">
                    <div className="w-full flex justify-center items-center my-5">
                        <input 
                            type="text" 
                            name="username"
                            id="username"
                            value={profile_info.user_name}
                            autoComplete='new-name'
                            disabled={editMode? '' : 'disabled'}
                            placeholder={user.displayName} 
                            className={`w-[70%] p-2 lg:p-3 hover:scale-[1.02] focus:scale-[1.05] border-[1px] border-[#6C2E9C] outline-none rounded-2xl
                            ${editMode? 'shadow-custom-shadow-input' : ''}
                            duration-200 ease`}
                            onChange={(e) => InputChange('user_name', e.target.value)}
                        />
                    </div>
                    <div className="w-full flex justify-center items-center">
                        <input 
                            type="text" 
                            name="email"
                            id="email"
                            value={profile_info.user_email}
                            autoComplete='new-email'
                            disabled={editMode? '' : 'disabled'}
                            placeholder={user.email}
                            className={`w-[70%] p-2 lg:p-3 hover:scale-[1.02] focus:scale-[1.05] border-[1px] border-[#6C2E9C] outline-none rounded-2xl
                            ${editMode? 'shadow-custom-shadow-input' : ''}
                            duration-200 ease`}
                            onChange={(e) => InputChange('user_email', e.target.value)}
                        />
                    </div>
                    <div className={`w-full flex flex-row justify-center items-center mt-3`}>
                        <button onClick={() => setMode(editMode => !editMode)} type="button" className={`${editMode? 'hidden' : ''} w-[35%] lg:w-[30%] p-1 m-1 text-lg text-white bg-[#6C2E9C] rounded-xl active:scale-[0.90] duration-200 ease-in-out`}>Edit</button>
                        <button type="submit" className={`${editMode? '' : 'hidden'} w-[30%] lg:w-[15%] p-1 m-1 text-md text-white bg-[#19e392] rounded-xl active:scale-[0.90] duration-200 ease-in-out`}>Save</button>
                        <button onClick={(e) => CancelEditMode(e)} type="button" className={`${editMode? '' : 'hidden'} w-[30%] lg:w-[15%] p-1 m-1 text-md text-white bg-[#f53722] rounded-xl active:scale-[0.90] duration-200 ease-in-out`}>Cancel</button>
                    </div>
                    <div className={`${editMode? 'hidden' : ''} w-full flex justify-center text-sm text-[#A881D4] underline p-2`}>
                        <h3 onClick={() => setPasswordAuthModalOpen(true)} className="cursor-pointer">Update Password ?</h3>
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
                                className="my-4 ml-2 lg:ml-3 w-[30%] lg:w-[25%] p-1 text-md text-[#A881D4] bg-white border-[1px] border-[#A881D4] rounded-xl active:scale-[0.90] duration-200 ease-in-out">
                                    Send email
                                </button>
                            </div>
                                
                        }
                    </div>
                </form>
                <div className={`${user.email === 'randomprojectemail395@gmail.com'? "hidden" : ""} w-[90%] lg:w-[68%] p-2 lg:p-3 flex flex-row justify-start items-center text-[#A881D4]`}>
                    {
                        user_current_plan === 'plus'?
                        <>
                            <div onClick={StartPortalSession} className="w-[45%] lg:w-[35%] bg-white p-2 border-[1px] border-[#6C2E9C] text-center rounded-xl cursor-pointer active:scale-[0.90] transform-all ease duration-300">
                                Manage billing
                            </div>
                        </>
                        :
                        user_current_plan === 'pending_removal'?
                        <>
                            <div onClick={StartPortalSession} className="w-[45%] lg:w-[35%] bg-white p-2 border-[1px] border-[#6C2E9C] text-center rounded-xl cursor-pointer active:scale-[0.90] transform-all ease duration-300">
                                Manage billing
                            </div>
                        </>
                        :
                        <>
                            <Link to="/navbar/plan_selection" className="w-[45%] lg:w-[35%] bg-white p-2 border-[1px] border-[#6C2E9C] text-center rounded-xl cursor-pointer active:scale-[0.90] transform-all ease duration-300">
                                Upgrade to plus +
                            </Link>
                        </>
                    }
                </div>
            </motion.div>
        </>
    );
}

export default AccountSection;


//TODO: for the future
{/* <div className="w-[90%] md:w-[65%] xl:w-[70%] my-5 flex flex-col">
        <div className="w-[35%] xl:w-[30%] p-1 flex flex-row justify-center border-2 border-[#33b8b8] rounded-xl shadow-md shadow-[#33b8b8] transform-all active:scale-[0.90] ease-in-out">
            <span onClick={() => DownLoadCSV()} className="cursor-pointer">visitors.csv<i className="fa-light fa-file-arrow-down ml-1 lg:ml-2 text-[#33b8b8]"></i></span>
        </div> 
    </div> */}

    // const DownLoadCSV = async() => {
    //     const generate_csv = await generateCSVfile(user.accessToken);
    //     if(generate_csv.error){
    //         setModalErrorMode(true);
    //         setModalOpen(true);
    //         setModalMsg(generate_csv.msg);
    //     }
    // }