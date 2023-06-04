import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import VisitorCard from './visitorCard';
import axios from 'axios';

const VisitorPage = () => {

    const { user, user_hash } = UserAuth();

    const [visitor_array, setArray] = useState([]);
    const [sse_link, setSse] = useState('');

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

    const setSSEconnection = async() => {
        try{
            const response = await axios.get('http://localhost:8080/connection/auth-sse',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.accessToken
                }
            });

            if(response){
                setSse('http://localhost:8080/connection/sse')
            }
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        if(user){
            const eventSource = new EventSource(sse_link);
    
            eventSource.addEventListener('open', () => {
                console.log('SSE connection has started');
            });
            
            eventSource.addEventListener('message', (event) => {
                const updatedVisitors = JSON.parse(event.data);
                setArray(updatedVisitors)
            });
    
            return () => {
                if (eventSource) {
                  eventSource.close();
                  console.log('SSE connection has been closed');
                }
            };
        }
    },[sse_link])
    
    useEffect(() => {
        if(user.uid){
            setSSEconnection()
            axios.post('http://localhost:8080/visitor/all-visitor',{},{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ user.accessToken
                }
            })
            .then(resp => {
                if(resp.data){
                    setArray(resp.data);
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
                <div className={`w-[95%] flex flex-row justify-between items-center p-2 mt-4 text-white bg-[#33b8b8] rounded-t-2xl ${visitor_array.message? 'hidden' : ''}`}>
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
                    visitor_array.length ?
                    visitor_array.map((ppl, i) => (
                        <VisitorCard key={i} id={ppl._id} name={ppl.email || ppl._id} browser={ppl.browser} country={ppl.country} time={ppl.createdAt} onRemoveVisitor={removeVisitor}/>
                    ))
                    :
                    <div className="h-full w-full flex flex-row p-5 justify-center items-center">
                        <h3 className="text-xl lg:text-3xl">{visitor_array.message}</h3>
                    </div>
                }
                
            </motion.div>
        </>
    );
}

export default VisitorPage;

