import {motion} from 'framer-motion';
import {useState, useEffect} from 'react';
import { getAuth, checkActionCode } from 'firebase/auth';
import { UserAuth } from '../../context/AuthContext';
import { FirebaseErrorhandler } from '../../context/utils/manageAuth';
import EmailVerifyComponent from './VerifyEmail/emailVerification';
import PasswordResetComponent from './Password/passwordReset';

const ResetAndVerifyPage = () => {

    const auth = getAuth();

    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get('oobCode');
    const mode = urlParams.get('mode');

    const { 
        setModalOpen, 
        setModalErrorMode, 
        setModalMsg } = UserAuth(); 

    const [isOobCodeValid, setOobCodeValid] = useState(false);
    const [page_version, setPageVersion] = useState({
        email_verification: false,
        password_reset: false
    });

    useEffect(() => {
        if(oobCode){
            checkActionCode(auth, oobCode).then(() => {
                setOobCodeValid(true)
            })
            .catch((err) => {
                const error_message = FirebaseErrorhandler(err.code)
                setModalErrorMode(true);
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
                    setPageVersion(prevValue => ({
                        ...prevValue,
                        password_reset: true
                    }));
                    break;
                case "verifyEmail":
                    setPageVersion(prevValue => ({
                        ...prevValue,
                        email_verification: true
                    }));
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
                            <PasswordResetComponent active={page_version.password_reset} auth={auth} oobCode={oobCode} />

                            <EmailVerifyComponent active={page_version.email_verification} auth={auth} oobCode={oobCode} />
                        </>
                        :
                        <>
                            <div className="w-full text-center">
                                <h2 className="text-xl text-red-500">Session has expired please send a new request</h2>
                            </div>
                        </>
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

export default ResetAndVerifyPage;