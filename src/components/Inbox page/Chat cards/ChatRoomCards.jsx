import { Link } from 'react-router-dom';

const ChatRoomCards = () => {
    return(
        <>
            <div className="w-[95%] lg:w-5/6 flex flex-row justify-between items-center bg-white border-[1px] border-[#33b8b8] p-2 m-4 rounded-xl shadow-md shadow-[#33b8b8]">
                <div className="p-2 ml-2 w-1/2">
                    <h2 className="text-lg lg:text-xl">Name of contact</h2>
                </div>
                <div className="w-1/2 flex flex-row justify-around items-center">
                    <i onClick={() => handleOpenChat()} className="fa-regular fa-comment text-xl lg:text-3xl active:scale-[0.90] duration-100 ease-in hidden lg:inline hover:text-[#33b8b8] cursor-pointer"></i>
                    <Link to="/navbar/chatroom"><i className="fa-regular fa-comment text-xl lg:text-3xl active:scale-[0.90] duration-100 ease-in lg:hidden"></i></Link>
                    <i className="fa-regular fa-trash text-xl lg:text-2xl active:scale-[0.90] duration-100 ease-in hover:text-red-500 cursor-pointer"></i>
                </div>
            </div>
        </>
    )
}