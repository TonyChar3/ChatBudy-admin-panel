import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import VisitorCard from './visitorCard';
import axios from 'axios';

const VisitorPage = () => {

    const { user } = UserAuth();

    const [visitor_array, setArray] = useState([]);

    useEffect(() => {
        if(user.uid){
            const data_array = [];

            axios.post('http://localhost:8080/visitor/all-visitor',{
                u_uid: user.uid
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => {
                if(resp.data){
                    data_array.push(resp.data)
                    setArray(data_array)
                }
            })
            .catch(err => {
                console.log(err)
            })
            
        }
    },[user])
    
    return(
        <>
            <motion.div 
                className="w-screen flex flex-col justify-center lg:justify-start items-center"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="w-[95%] flex flex-row justify-between items-center p-2 mt-4 text-white bg-[#33b8b8] rounded-t-2xl">
                    <div className="ml-2">
                        <h2 className="lg:text-2xl">Name</h2>
                    </div>
                    <div className="hidden lg:flex lg:flex-row ml-[4em] justify-around w-[16%]">
                        <h2 className="lg:text-2xl">Browser</h2>
                        <h2 className="lg:text-2xl">Country</h2>
                    </div>
                    <div className="flex flex-row justify-around w-1/2"> 
                        <h2 className="lg:text-2xl">Entered?</h2>
                        <h2 className="lg:text-2xl">Chat</h2>
                    </div>
                </div>
                {
                    visitor_array.length ?
                    visitor_array.map((ppl, i) => (
                        
                        <VisitorCard key={i} name={ppl.email || ppl._id} browser={ppl.browser} country={ppl.country} time={ppl.createdAt} />
                    ))
                    :
                    <div></div>
                }
                
            </motion.div>
        </>
    );
}

export default VisitorPage;