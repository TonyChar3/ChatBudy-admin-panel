import { useState } from 'react';
import { motion } from 'framer-motion';

const AccountSection = () => {

    const [editMode, setMode] = useState(false);

    const handleEditMode = () => {
        setMode(editMode => !editMode)
    }

    return(
        <>
            <motion.div 
                className="w-full h-screen flex flex-col justify-center items-center"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <form className="w-[90%] lg:w-[70%] p-1 border-2 border-[#33b8b8] rounded-xl shadow-md shadow-[#33b8b8]">
                    <div className="w-full flex justify-center p-2 my-2">
                        <h1 className="text-2xl lg:text-3xl">Your account<i className="fa-regular fa-user ml-2"></i></h1>
                    </div>
                    <div className="w-full flex justify-center p-2">
                        <input type="text" placeholder="Username" className="w-[70%] p-1 lg:p-2 hover:scale-[1.1] active:scale-[0.90] focus:scale-[1.05] border-[1px] border-[#33b8b8] outline-none duration-200 ease-in-out rounded-lg"/>
                    </div>
                    <div className="w-full flex justify-center p-2">
                        <input type="text" placeholder="Email" className="w-[70%] p-1 lg:p-2 hover:scale-[1.1] active:scale-[0.90] focus:scale-[1.05] border-[1px] border-[#33b8b8] outline-none duration-200 ease-in-out rounded-lg"/>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center p-2 mt-2">
                        <input type="text" placeholder="Change password" className="w-[70%] p-1 lg:p-2 m-2 hover:scale-[1.1] active:scale-[0.90] focus:scale-[1.05] border-[1px] border-[#33b8b8] outline-none duration-200 ease-in-out rounded-lg"/>
                        <input type="text" placeholder="Confirm password" className="w-[70%] p-1 lg:p-2 m-2 hover:scale-[1.1] active:scale-[0.90] focus:scale-[1.05] border-[1px] border-[#33b8b8] outline-none duration-200 ease-in-out rounded-lg"/>
                    </div>
                    <div className={`w-full flex ${editMode? 'flex-col' : 'flex-row'} justify-center items-center`}>
                        <button onClick={() => handleEditMode()} type="button" className={`${editMode? 'hidden' : ''} w-[30%] lg:w-[15%] p-1 m-1 text-md text-white bg-[#33b8b8] rounded-xl active:scale-[0.90] duration-200 ease-in-out`}>Edit</button>
                        <button type="button" className={`${editMode? '' : 'hidden'} w-[30%] lg:w-[15%] p-1 m-1 text-md text-white bg-[#19e392] rounded-xl active:scale-[0.90] duration-200 ease-in-out`}>Save</button>
                        <button onClick={() => handleEditMode()} type="button" className={`${editMode? '' : 'hidden'} w-[30%] lg:w-[15%] p-1 m-1 text-md text-white bg-[#f53722] rounded-xl active:scale-[0.90] duration-200 ease-in-out`}>Cancel</button>
                    </div>
                </form> 
            </motion.div>
        </>
    );
}

export default AccountSection;