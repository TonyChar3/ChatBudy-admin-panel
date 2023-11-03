import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
    return (
        <>
             <motion.div 
                 className="w-full h-full flex lg:flex-col justify-center items-center bg-white"
 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0, transition: { duration: 0.1 } }}
             > 
                 <div className="absolute top-5 left-10 rounded-xl lg:hidden">
                    <div className="w-[100px] h-[100px] bg-[#6C2E9C] rounded-full"></div>
                 </div>
                 <div className="hidden lg:block absolute top-0 left-10">
                     <img src="https://res.cloudinary.com/dskpbps9l/image/upload/v1698064004/ChatBudy.io/Increase_Your_Sales_5_wv9ifc.png" width="150" height="150" alt="canva image" />
                 </div>
                 <div className="hidden lg:block absolute top-20 right-20">
                     <img src="https://res.cloudinary.com/dskpbps9l/image/upload/v1698074702/ChatBudy.io/Increase_Your_Sales_9_pkfjm8.png" width="150" height="150" alt="canva image" className="rounded-xl" />
                 </div>
                 <div className="hidden lg:block absolute top-80 left-80">
                    <div className="w-[50px] h-[50px] bg-[#6C2E9C] rounded-full"></div>
                 </div>
                 <div className="lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:items-center">
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="text-4xl my-1 text-red-500">ERROR 404!!!</h3>
                        <h2 className="my-2 text-2xl text-[#33b8b8]">Page Not found</h2>
                        <Link to="/navbar/visitors" className="bg-[#33b8b8] p-2 my-1 text-white text-lg font-light rounded-lg text-center mb-3 lg:p-2 lg:text-xl">Return to safety</Link>
                    </div>
                 </div>
                 <div className="hidden lg:block absolute bottom-80 right-80">
                    <div className="w-[100px] h-[100px] bg-[#6C2E9C] rounded-full"></div>
                 </div>
                 <div className="hidden lg:block absolute bottom-20 left-20">
                     <img src="https://res.cloudinary.com/dskpbps9l/image/upload/v1698260563/ChatBudy.io/Increase_Your_Sales_16_mfgnnp.png" width="150" height="150" alt="canva image" className="rounded-xl" />
                 </div>
                 <div className="absolute bottom-[5%] right-20 lg:hidden">
                    <div className="w-[50px] h-[50px] bg-[#6C2E9C] rounded-full"></div>
                 </div>
             </motion.div>
         </>
    )
}

export default NotFoundPage;