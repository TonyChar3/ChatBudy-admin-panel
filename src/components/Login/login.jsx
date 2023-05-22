import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LogInPage = () => {
    return(
        <>
            <motion.div 
                className="w-screen h-screen flex lg:flex-row justify-center items-center bg-white"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            > 
                <div className="absolute top-5 right-10 rounded-xl lg:hidden">
                    <img src="/images/1.png" alt="chat canva" width="100" height="100" className="rounded-xl"/>
                </div>
                <div className="absolute top-[10%] left-10 lg:hidden">
                    <img src="/images/4.png" alt="money cnava" width="100" height="100" className="rounded-full"/>
                </div>
                <div className="hidden lg:block absolute top-0 left-10">
                    <img src="images/Increase Your Sales.png" width="150" height="150" alt="canva image" />
                </div>
                <div className="hidden lg:block absolute top-20 right-20">
                    <img src="images/3.png" width="150" height="150" alt="canva image" className="rounded-xl" />
                </div>
                <div className="hidden lg:block absolute top-80 left-80">
                    <img src="images/4.png" width="50" height="50" alt="canva image" className="rounded-full" />
                </div>
                <div className="lg:w-1/2 lg:flex lg:flex-row lg:justify-center">
                    <form className="lg:w-1/2 w-80 p-2 flex flex-col justify-center items-center border-[1px] border-[#33b8b8] bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm shadow-lg shadow-[#33b8b8]">
                        <div className="w-full flex justify-center m-4">
                            <h1 className="text-center text-2xl text-black font-light lg:text-4xl">Access your account</h1>
                        </div>
                        <div className="w-full flex justify-center m-4 lg:m-8">
                            <motion.input whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.90 }} whileFocus={{ scale: 1.05 }} type="text" placeholder='Email' className="p-1 lg:p-3 pl-2 border-[1px] border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md shadow-[#33b8b8] outline-none lg:text-lg"/>
                        </div>
                        <div className="w-full flex justify-center m-4 lg:m-8">
                            <motion.input whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.90 }} whileFocus={{ scale: 1.05 }} type="text" placeholder='Password' className="p-1 lg:p-3 pl-2 border-[1px] border-white w-5/6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm shadow-md shadow-[#33b8b8] outline-none lg:text-lg"/>
                        </div>
                        <Link to="/navbar/visitors" className="bg-[#33b8b8] p-1 text-white font-light rounded-lg w-[30%] text-center m-3 lg:p-2 lg:text-xl">Connect</Link>
                        <Link to="/register" className="m-2 underline text-lg text-[#33b8b8] font-light">Register</Link>
                    </form>
                </div>
                <div className="hidden lg:block absolute bottom-80 right-80">
                    <img src="images/4.png" width="100" height="100" alt="canva image" className="rounded-full" />
                </div>
                <div className="hidden lg:block absolute bottom-20 left-20">
                    <img src="images/1.png" width="150" height="150" alt="canva image" className="rounded-xl" />
                </div>
                <div className="absolute bottom-[5%] right-20 lg:hidden">
                    <img src="/images/4.png" alt="money cnava" width="50" height="50" className="rounded-full"/>
                </div>
                <div className="absolute bottom-[10%] left-10 lg:hidden">
                    <img src="/images/3.png" alt="money cnava" width="100" height="100" className="rounded-xl"/>
                </div>
            </motion.div>
        </>

    );
}

export default LogInPage;