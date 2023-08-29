import {motion} from 'framer-motion';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, checkActionCode, confirmPasswordReset, applyActionCode} from 'firebase/auth';
import { UserAuth } from '../../../../context/AuthContext';
import { FirebaseErrorhandler } from '../../../../context/utils/manageAuth';

const PasswordUpdate = () => {

    const auth = getAuth();
    const navigate = useNavigate();

    const { setModalOpen, setModalMode, setModalMsg } = UserAuth(); 

    const [new_password, setNewPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [length, setLength] = useState(false);
    const [uppercase, setUppercase] = useState(false);
    const [lowercase, setLowercase] = useState(false);
    const [number, setNumber] = useState(false);
    const [specialChar, setSpecialChar] = useState(false);
    const [whitespace, setWhitespace] = useState(false);
    const [isOobCodeValid, setOobCodeValid] = useState(false);
    const [password_reset_mode, setPasswordResetMode] = useState(false);
    const [email_verification_mode, setVerificationMode] = useState(false);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get('oobCode');
    const mode = urlParams.get('mode');
 
    const handleNewPassword = (e) => {
        setNewPassword(e)
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e)
    }

    const handleChangePassword = async(e) => {
        e.preventDefault()
        // compare both new + confirm password if they're the same
        if(new_password.toString() === confirm_password.toString()){
            // if every conditions are true with checkPassword() + test with Regex and sanitize the input
            if(length && uppercase && lowercase && number && specialChar && whitespace && passwordRegex.test(new_password)){
                try{
                    // update the password with the new one
                    confirmPasswordReset(auth, oobCode, new_password).then(() => {
                        navigate('/password-update-result', { state: { passwordUpdated: true }});
                      }).catch((error) => {
                        navigate('/password-update-result', { state: { passwordUpdated: false }});
                        const error_message = FirebaseErrorhandler(error.code)
                        setModalMode(true);
                        setModalOpen(true);
                        setModalMsg(`ERROR: ${error_message}`)
                      });
                    
                } catch(err){
                    setModalMode(true);
                    setModalOpen(true);
                    setModalMsg(`ERROR:${ err.message || err }`)
                }
            }
        } else {
            setModalMode(true);
            setModalOpen(true);
            setModalMsg('ERROR: Passwords do not match...')
        }
    }

    const handleEmailVerification = async() => {
        applyActionCode(auth, oobCode).then((resp) => {
            navigate('/password-update-result', { state: { emailVerified: true }});
        })
        .catch((error) => {
            navigate('/password-update-result', { state: { emailVerified: false }});
            const error_message = FirebaseErrorhandler(error.code)
            setModalMode(true);
            setModalOpen(true);
            setModalMsg(`ERROR: ${error_message}`)
        });
    }

    const checkPassword = (password) => {
        setLength(password.length >= 8);
        setUppercase(/[A-Z]/.test(password));
        setLowercase(/[a-z]/.test(password));
        setNumber(/[0-9]/.test(password));
        setSpecialChar(/[!@#$%^&*]/.test(password));
        setWhitespace(!/\s/.test(password));
    };

    useEffect(() => {
        if(new_password){
            checkPassword(new_password)
        }
    },[new_password])

    useEffect(() => {
        if(oobCode){
            checkActionCode(auth, oobCode).then((info) => {
                setOobCodeValid(true)
            })
            .catch((err) => {
                const error_message = FirebaseErrorhandler(err.code)
                setModalMode(true);
                setModalOpen(true);
                setModalMsg(`ERROR: ${error_message}`)
                setOobCodeValid(false)
            })
        }
    },[oobCode])

    useEffect(() => {
        if(mode){
            switch (mode){
                case "resetPassword" :
                    setPasswordResetMode(true);
                    break;
                case "verifyEmail":
                    setVerificationMode(true);
                    break;
                default:
                    break;
            }
        }
    },[mode])

    return (
        <>
            <motion.div 
                className="w-full h-full flex lg:flex-col justify-center items-center bg-white"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            > 
                <div className="absolute top-5 left-10 rounded-xl lg:hidden">
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
                <div className="lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:items-center">
                    {
                        isOobCodeValid?
                        <>
                        <form onSubmit={handleChangePassword} className={`${password_reset_mode? '' : 'hidden'} lg:w-1/2 w-80 p-2 flex flex-col justify-center items-center border-[1px] border-[#33b8b8] bg-white lg:bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-lg shadow-[#33b8b8]`}>
                            <div className="w-full flex justify-center m-4">
                                <h1 className="text-center text-2xl text-black font-light lg:text-4xl">Update your password</h1>
                            </div>
                            <div className="w-full flex justify-center m-4 lg:m-8">
                                <input type="text" placeholder='New password' onChange={(e) => handleNewPassword(e.target.value)} className="p-1 lg:p-3 pl-2 border-[1px] border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md shadow-[#33b8b8] outline-none lg:text-lg"/>
                            </div>
                            <div className="w-full flex justify-center m-4 lg:m-8">
                                <input type="text" placeholder='Confirm password' onChange={(e) => handleConfirmPassword(e.target.value)} className="p-1 lg:p-3 pl-2 border-[1px] border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md shadow-[#33b8b8] outline-none lg:text-lg"/>
                            </div>
                            <button type="submit" className="bg-[#33b8b8] p-1 text-white font-light rounded-lg w-[30%] text-center m-3 lg:p-2 lg:text-xl">Change</button>
                            <div className="my-2 h-5 w-[70%] lg:w-80 border-t-2 opacity-30 border-[#cfd0d1]"></div>
                            <ul className='p-2'>
                                <li className={`my-[0.2em] ${length? 'text-[#33b8b8]' : 'text-red-500'}`}>- The password must be at least 8 characters long.</li>
                                <li className={`my-[0.2em] ${uppercase? 'text-[#33b8b8]' : 'text-red-500'}`}>- It must contain at least one uppercase letter.</li>
                                <li className={`my-[0.2em] ${lowercase? 'text-[#33b8b8]' : 'text-red-500'}`}>- It must contain at least one lowercase letter.</li>
                                <li className={`my-[0.2em] ${number? 'text-[#33b8b8]' : 'text-red-500'}`}>- It must contain at least one number.</li>
                                <li className={`my-[0.2em] ${specialChar? 'text-[#33b8b8]' : 'text-red-500'}`}>- It must contain at least one special character (e.g., !, @, #, $, %, ^, &, *).</li>
                                <li className={`my-[0.2em] ${whitespace? 'text-[#33b8b8]' : 'text-red-500'}`}>- It must not contain any whitespace characters.</li>
                            </ul>
                        </form>

                        <div className={`${email_verification_mode? '' : 'hidden'} lg:w-1/2 w-80 p-2 flex flex-col justify-center items-center border-[1px] border-[#33b8b8] bg-white lg:bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-lg shadow-[#33b8b8] rounded-xl`}>
                            <div className="w-full flex justify-center m-4">
                                <button onClick={handleEmailVerification} className="bg-[#33b8b8] p-1 text-white font-light rounded-lg w-[50%] text-center m-3 lg:p-2 lg:text-xl">Verify your email</button>
                            </div>
                        </div>
                        </>
                        :
                        <div className="w-full text-center">
                            <h2 className="text-xl text-red-500">Session has expired please send a new request</h2>
                        </div>
                    }
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
            </motion.div>
        </>
    )
}

export default PasswordUpdate;