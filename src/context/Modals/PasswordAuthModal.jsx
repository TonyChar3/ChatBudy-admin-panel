import { UserAuth } from "../AuthContext";
import { useState } from 'react';
import { reauthenticateWithCredential, EmailAuthProvider, getAuth, sendPasswordResetEmail } from "firebase/auth";
import { FirebaseErrorhandler } from "../utils/manageAuth";

const PasswordAuthModal = () => {

    const { setPasswordAuthModalOpen, isPasswordAuthModalOpen, setModalOpen, setModalMsg, setModalMode } = UserAuth();

    const auth = getAuth()

    const [seePassword, setSeePassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error_mode, setErrorMode] = useState(false);

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const passwordRegex = /^[^<>&"'\`]+$/ ;

    const handleUserEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleUserPassword = (e) => {
        setPassword(e.target.value)
    }

    const handlePasswordAuthCancel = () => {
        setErrorMode(false);
        setEmail('');
        setPassword('');
        setPasswordAuthModalOpen(false);
    }

    const handleSeePassword = () => {
        setSeePassword(seePassword => !seePassword)
    }

    const handlePasswordUpdateAuth = async() => {
        try{
            if(email === '' || password === ''){
                setErrorMode(true);
                setModalOpen(true);
                setModalMode(true);
                setModalMsg('Please make sure to not leave any field empty');
            } else if(emailRegex.test(email) && passwordRegex.test(password)){
                const credentials = EmailAuthProvider.credential(email, password)
                const re_auth = await reauthenticateWithCredential(auth.currentUser, credentials)
                if(re_auth){
                    setErrorMode(false)
                    setModalOpen(false)
                    setEmail('')
                    setPassword('')
                    setPasswordAuthModalOpen(false)
                    sendPasswordResetEmail(auth, auth.currentUser.email)
                    .then(() => {
                        setModalMode(false)
                        setModalOpen(true)
                        setModalMsg('Email sent')
                    })
                    .catch((error) => {
                        const error_message = FirebaseErrorhandler(error.code)
                        setModalOpen(true)
                        setModalMode(true)
                        setModalMsg(`ERROR: ${error_message}`)
                    });
                } else if(!re_auth){
                    setModalOpen(true)
                    setModalMode(true)
                    setModalMsg('ERROR: unable to re-authenticate. Please verify your credentials.')
                }
            }
        } catch(err){
            setModalOpen(true)
            setModalMode(true)
            setModalMsg('ERROR: unable to re-authenticate. Please verify your credentials.')
        }
    }

    return(
        <>
            <div className={`${isPasswordAuthModalOpen? 'absolute' : 'hidden'} z-50 left-0 right-0 w-full h-full flex flex-row justify-center items-center bg-black bg-opacity-20`}>
                <div className={`w-[90%] lg:w-[20%] flex flex-col justify-center items-center text-center p-2 rounded-lg bg-white shadow-lg border-2 ${error_mode? 'shadow-red-500 border-red-500' : 'shadow-black border-[#33b8b8]'}`}>    
                    <h3 className="text-2xl text-[#33b8b8] my-2">Authenticate to update your password</h3>
                    <form className="flex flex-col justify-center items-center w-full">
                        <input type="text" name="email" placeholder="Email" value={email} autoComplete="email" onChange={(e) => handleUserEmail(e)} className="w-80 p-2 my-2 outline-none border-[#33b8b8] border-[1px] rounded-lg" />
                        <input type={`${seePassword? 'text' : 'password'}`} name="password" placeholder="Password" value={password} autoComplete="current-password" onChange={(e) => handleUserPassword(e)} className="w-80 p-2 my-2 outline-none border-[#33b8b8] border-[1px] rounded-lg" />
                        <div className="w-full flex flex-row justify-start p-1">
                            <i onClick={handleSeePassword} className={`fa-light fa-eye${seePassword? '' : '-slash'} text-sm cursor-pointer`}></i>
                        </div>
                    </form>
                    <button type="button" onClick={handlePasswordUpdateAuth} className="w-[30%] p-1 my-1 text-md text-white bg-[#33b8b8] rounded-xl active:scale-[0.90] duration-200 ease-in-out">Authenticate</button>
                    <button type="button" className="w-[30%] p-1 m-1 text-md text-red-500 bg-white border-red-500 border-[1px] rounded-xl active:scale-[0.90] duration-200 ease-in-out" onClick={handlePasswordAuthCancel}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default PasswordAuthModal;