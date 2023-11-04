import { motion } from 'framer-motion';
import { UserAuth } from '../../../context/AuthContext';
import VisitorCard from './visitorCard';
import VisitorScroll from '../../../container/scroll/visitorScroll';
import DataLoadingAnimation from '../../../context/Loader/data_loading/dataLoadingAnimation';

const VisitorPage = () => {

    const { visitors_array } = UserAuth();

    return(
        <>
            <motion.div 
                className="relative w-full h-full flex flex-col items-center"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                {
                    Array.isArray(visitors_array)?
                    <>
                        <VisitorScroll>
                            <div className="w-full flex flex-col justify-center lg:justify-start items-center">
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
                                    <div className="absolute bottom-0 h-full w-full flex flex-row p-5 justify-center items-center">
                                        <div className="flex flex-col justify-center items-center text-[#A881D4]">
                                            <i className="fa-light fa-people text-4xl lg:text-5xl"></i>
                                            <h3 className="text-2xl lg:text-3xl">No visitor</h3>
                                        </div>
                                    </div>
                                }
                                <div className="lg:h-[20px] h-[100px]"></div>
                            </div>
                        </VisitorScroll>
                    </>
                    :
                    <DataLoadingAnimation />
                }
            </motion.div>
        </>
    );
}

export default VisitorPage;

