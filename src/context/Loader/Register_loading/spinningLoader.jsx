import { motion } from 'framer-motion';
import { UserAuth } from '../../AuthContext';

const SpinningLoaderPage = () => {

    const { show_loader } = UserAuth();

    return (
        <>
            <motion.div 
                className={`absolute z-50 flex items-center justify-center h-screen w-screen bg-white transition-all ease ${show_loader? '' : 'hidden'}`}

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.6 } }}
            >
                <div className="absolute top-[5%] right-10 lg:right-60 lg:top-[10%]">
                    <div className="w-[40px] h-[40px] bg-[#6C2E9C] rounded-full"></div>
                </div>
                <div className="absolute top-[10%] left-10 lg:top-[20%] lg:left-20">
                    <div className="w-[100px] h-[100px] bg-[#6C2E9C] rounded-full"></div>
                </div>
                <div className="w-[70%] h-[33%] lg:w-[20%] lg:h-[40%] border-t-2 border-[#33b8b8] border-solid rounded-full animate-spin"></div>
                <div className="absolute flex flex-col justify-center items-center animate-growAndShrink duration-2000 ease-in-out infinite">
                    <i className="fa-light fa-comments text-6xl lg:text-8xl text-[#33b8b8]"></i>
                </div>
                <div className="absolute bottom-[5%] right-10 lg:bottom-[10%] lg:right-[15%]">
                    <div className="w-[60px] h-[60px] bg-[#6C2E9C] rounded-full"></div>
                </div>
                <div className="absolute bottom-20 left-10 lg:left-[10%] lg:bottom-[15%] rounded-xl">
                    <img src="https://res.cloudinary.com/dskpbps9l/image/upload/v1698260563/ChatBudy.io/Increase_Your_Sales_16_mfgnnp.png" width="150" height="150" alt="canva image" className="rounded-xl" />
                </div>
            </motion.div>
        </>
    )
}

export default SpinningLoaderPage;