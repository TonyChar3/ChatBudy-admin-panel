import { Link } from 'react-router-dom';
import Scroll from '../../../container/scroll/scroll';
import { motion } from 'framer-motion';
 
const ChatRoomPage = (props) => {

    const handleClose = () => {
        props.closeIt()
    }

    return(
        <>
            <motion.div 
                className="w-full h-full flex flex-col justify-start items-center"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="w-full flex flex-row p-2 justify-start items-center border-2 border-[#33b8b8] shadow-md shadow-[#33b8b8]">
                    <i onClick={handleClose} className="fa-regular fa-circle-xmark text-xl mx-3 text-[#33b8b8] hidden lg:inline cursor-pointer"></i>
                    <Link to="/navbar/inbox"><i className="fa-solid fa-chevron-left text-xl mx-3 text-[#33b8b8] lg:hidden"></i></Link>
                    <h2 className="text-xl text-[#33b8b8]">Name of contact</h2>
                </div>
                <Scroll>
                    <div className="grid grid-cols-1">
                        <div className="max-w-[38%] text-left p-3 bg-gray-300 m-5 break-normal rounded-br-lg rounded-bl-lg rounded-tr-lg">
                            Hey! I would like to know what you have to offer?
                        </div>
                        <div className="max-w-[38%] text-right p-3 bg-[#bbe7f5] m-5 break-normal rounded-br-lg rounded-bl-lg rounded-tl-lg self-end justify-self-end">
                            Yes of course it would be my pleasure!
                        </div>
                        <div className="h-[12vh]"></div>
                    </div>
                </Scroll>
                <div className="absolute bottom-10 lg:static w-full flex flex-row justify-center items-center">
                    <div className="bottom-10 w-5/6 lg:m-4 p-3 bg-[#33b8b8] rounded-xl border-[1px] border-[#33b8b8] flex flex-row justify-center items-center z-20">
                        <input type="text" placeholder="send a chat..." className="w-5/6 p-2 rounded-lg outline-none" />
                        <i className="fa-sharp fa-light fa-paper-plane-top ml-6 text-2xl text-white active:scale-[0.90] focus:scale-[1.1] duration-100"></i>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default ChatRoomPage;