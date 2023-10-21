import { UserAuth } from "../AuthContext";

const Modal = () => {
    const { 
        is_modal_open, 
        setModalOpen, 
        is_modal_visible, 
        modal_message, 
        modal_error_mode 
    } = UserAuth();

    return is_modal_visible ? (
        <>
            <div 
            className={`absolute z-[100] bottom-[16%] left-[3%] lg:left-auto lg:bottom-[90%] lg:right-[3%] w-auto bg-white shadow-lg 
            ${modal_error_mode? 'shadow-red-500' : 'shadow-[#33b8b8]'} 
            m-2 rounded-lg 
            ${is_modal_open ? '' : 'translate-x-[-200px] opacity-0 lg:translate-x-[200px]'} 
            duration-700`}
            >
                <div className={`w-full flex flex-row justify-around items-center p-2 ${modal_error_mode? 'text-red-500' : ''}`}>
                    <i onClick={() => setModalOpen(false)} className={`hidden lg:block fa-solid fa-xmark mx-2 text-xl cursor-pointer ${modal_error_mode? 'text-red-500' : 'text-[#33b8b8]'}`}></i>
                    <span className="text-lg p-1 mx-2">{modal_message}</span>
                    <i onClick={() => setModalOpen(false)} className={`fa-solid fa-xmark mx-2 text-xl cursor-pointer lg:hidden ${modal_error_mode? 'text-red-500' : 'text-[#33b8b8]'}`}></i>
                </div>
            </div>
        </>
    ) : null;
}

export default Modal