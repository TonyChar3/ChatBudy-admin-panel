import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import VisitorCard from './visitorCard';
import axios from 'axios';

const VisitorPage = () => {

    const { user, user_hash, visitorsArray} = UserAuth();

    const [visitor_array, setArray] = useState([]);

    const removeVisitor = async(visitr_id) => {
        try{
            const response = await axios.delete('http://localhost:8080/visitor/delete-visitor',{
                data: {
                    u_hash: user_hash ,
                    visitor_id: visitr_id
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(response){
                const updatedVisitors = visitor_array.filter(visitor => visitor._id !== visitr_id);
                if(updatedVisitors.length === 0){
                    const data = {
                        message: "No visitor"
                    }
                    updatedVisitors.push(data)
                    setArray({message: "No visitors"})
                } else {
                    setArray(updatedVisitors)
                }
            }
        } catch(err){
            console.log(err)
        }
    }

    const handleVisitorArray = data => {
        console.log("visitors", data)
    }

    return(
        <>
            <motion.div 
                className="w-screen flex flex-col justify-center lg:justify-start items-center"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className={`w-[95%] flex flex-row justify-between items-center p-2 mt-4 text-white bg-[#33b8b8] rounded-t-2xl ${visitorsArray.length <= 0? 'hidden' : ''}`}>
                    <div className="lg:ml-2 flex flex-row justify-start w-1/2 lg:w-[6%]">
                        <h2 className="lg:text-2xl">Name</h2>
                    </div>
                    <div className="hidden lg:flex lg:flex-row ml-[4em] justify-around w-[16%]">
                        <h2 className="lg:text-2xl">Browser</h2>
                        <h2 className="lg:text-2xl">Country</h2>
                    </div>
                    <div className="flex flex-row justify-center w-1/2"> 
                        <h2 className="lg:text-2xl lg:mr-0 mr-10">Entered?</h2>
                    </div>
                </div>
                {
                    visitorsArray.length ?
                    visitorsArray.map((ppl, i) => (
                        <VisitorCard key={i} id={ppl._id} name={ppl.email || ppl._id} email={ppl.email} browser={ppl.browser} country={ppl.country} time={ppl.createdAt} onRemoveVisitor={removeVisitor}/>
                    ))
                    :
                    <div className="h-full w-full flex flex-row p-5 justify-center items-center">
                        <h3 className="text-xl lg:text-3xl">No visitor</h3>
                    </div>
                }
            </motion.div>
        </>
    );
}

export default VisitorPage;

