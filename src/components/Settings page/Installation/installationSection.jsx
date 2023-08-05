import { motion } from 'framer-motion';
import { UserAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

const InstallationSection = () => {

    const { user } = UserAuth();

    const [scriptTag, setScriptTag] = useState('');

    useEffect(() => {
        const fetch = async() => {
            try{
                const response = await axios.get('http://localhost:8080/widget/link',{
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
                console.log(err)
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
                <div className="w-[95%] h-[40%] p-3 lg:p-5 bg-white border-[1px] border-[#33b8b8] rounded-lg shadow-md shadow-[#33b8b8]">
                    <div className="h-full p-2 bg-[#cfcdcc] rounded-lg">
                        <div className="w-[9%] lg:w-[4%] relative left-0 p-1 text-center bg-[#878787] rounded-full">
                            <i className="fa-regular fa-copy text-white"></i>
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