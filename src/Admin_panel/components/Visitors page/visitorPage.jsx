import { motion } from 'framer-motion';
import { UserAuth } from '../../../context/AuthContext';
import VisitorCard from './visitorCard';
import VisitorScroll from '../../../container/scroll/visitorScroll';

const VisitorPage = () => {

    const { visitors_array } = UserAuth();

    return(
        <>
            <motion.div 
                className="w-full h-full flex flex-col justify-start items-center"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <VisitorScroll>
                    <div className="w-full flex flex-col justify-centerx lg:justify-start items-center">
                        <div className="h-[20px]"></div>
                        {
                            visitors_array.length ?
                            visitors_array.map((ppl, i) => (
                                <VisitorCard 
                                    key={i} 
                                    id={ppl._id} 
                                    name={ppl.email || ppl._id} 
                                    email={ppl.email} 
                                    browser={ppl.browser} 
                                    country={ppl.country} 
                                    time={ppl.createdAt} 
                                />
                            ))
                            :
                            <div className="h-full w-full flex flex-row p-5 justify-center items-center">
                                <h3 className="text-xl lg:text-3xl">No visitor</h3>
                            </div>
                        }
                        <div className="lg:h-[20px] h-[100px]"></div>
                    </div>
                </VisitorScroll>
            </motion.div>
        </>
    );
}

export default VisitorPage;

