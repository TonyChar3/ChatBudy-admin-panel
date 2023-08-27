import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';
import VisitorCard from './visitorCard';
import { useEffect } from 'react';

const VisitorPage = () => {

    const { visitorsArray, setModalOpen, setModalMode, setModalMsg } = UserAuth();

    useEffect(() => {
        if(!visitorsArray){
            setModalOpen(true);
            setModalMode(true);
            setModalMsg('ERROR (500): Unable to load the visitors. Please reload the app or contact support')
        }
    },[])

    return(
        <>
            <motion.div 
                className="w-full h-full flex flex-col justify-start items-center"

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
                        <VisitorCard key={i} id={ppl._id} name={ppl.email || ppl._id} email={ppl.email} browser={ppl.browser} country={ppl.country} time={ppl.createdAt} />
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

