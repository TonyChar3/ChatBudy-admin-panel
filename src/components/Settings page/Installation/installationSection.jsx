import { motion } from 'framer-motion';
import { UserAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

const InstallationSection = () => {

    const { user, setModalOpen, setModalMsg, setModalMode } = UserAuth();

    const [scriptTag, setScriptTag] = useState('');
    const [added_to_clipboard, setCopy] = useState(false);
    const [error, setError] = useState(false);

    const handleCopyScriptTag = async() => {
        try {
            await navigator.clipboard.writeText(scriptTag);
            setCopy(true)
            setModalMode(false)
            setModalOpen(true);
            setModalMsg('Added to clipboard...')
            setError(false);
        } catch(err) {
            console.log(err);
            // set error mode
            setError(true);
            setModalMode(true);
            setModalOpen(true);
            setModalMsg('ERROR: try again...');
        }
    };

    useEffect(() => {
        const fetch = async() => {
            try{
                const response = await axios.get('http://localhost:8080/code/link',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.accessToken
                    }
                });

                if(response){
                    console.log(response.data.link)
                    setScriptTag(response.data.link)
                } 
            } catch(err){
                console.log(err);
                // set error mode
                setError(true);
                setModalMode(true);
                setModalOpen(true);
                setModalMsg('ERROR (500): please refresh the page or contact support');
                
            }
        }
        fetch();
    },[])

    return(
        <>
            <motion.div 
                className="w-full h-full flex flex-col justify-center items-center bg-[#c3fffc] lg:bg-white"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className={`w-[95%] h-[40%] p-3 lg:p-5 bg-white border-[1px] rounded-lg shadow-md ${error? 'border-red-500 shadow-red-500' : 'border-[#33b8b8] shadow-[#33b8b8]'}`}>
                    <div className="h-full p-2 bg-[#cfcdcc] rounded-lg">
                        <div onClick={handleCopyScriptTag} className={`w-[9%] lg:w-[4%] relative left-0 p-1 text-center ${error? 'bg-red-500' : 'bg-[#878787]'} rounded-full active:scale-[0.90] cursor-pointer`}>
                            <i className={`${added_to_clipboard? 'fa-solid fa-check text-green-500' : 'fa-regular fa-copy text-white'} ${error? 'fa-sharp fa-solid fa-xmark' : 'fa-regular fa-copy'}`}></i>
                        </div>
                        <p className="w-full p-1 flex flex-row justify-start break-all">{scriptTag}</p>
                    </div>
                </div>
                <div className="w-80 lg:w-full lg:text-center lg:m-4 p-2 m-3">
                    <i className="fa-regular fa-lightbulb-on text-xl lg:text-2xl text-[#33b8b8]"></i>
                    <p className="mt-1 text-lg lg:text-xl">copy the piece of text and paste it right after the "body" tags and you're all set !!</p>
                </div>
            </motion.div>
        </>
    );
}

export default InstallationSection;