import { motion } from 'framer-motion';
import { UserAuth } from '../../context/AuthContext';

const VisitorPage = () => {

    const { user } = UserAuth();

    console.log(user)

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
                <div className="w-[95%] flex flex-row justify-around p-3 m-2 border-[1px] border-[#33b8b8] rounded-xl shadow-md shadow-[#33b8b8]">
                    <div className="w-1/2 flex flex-row justify-between">
                        <h2 className="lg:text-lg">Name of contact</h2>
                        <div className="hidden lg:w-[30%] lg:flex lg:flex-row lg:justify-around lg:items-center lg:mx-auto">
                            <i className="fa-brands fa-chrome text-2xl"></i>
                            <i className="fa-light fa-globe text-2xl"></i>
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-row justify-around items-center">
                        <h2 className="lg:text-lg">Just now...</h2>
                        <i className="fa-regular fa-comment text-xl lg:text-2xl hover:text-[#33b8b8] active:scale-[0.90] duration-100 ease-in cursor-pointer"></i>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default VisitorPage;