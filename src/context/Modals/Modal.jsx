import { UserAuth } from "../AuthContext";

const Modal = () => {
    const { isModalOpen, setModalOpen, isVisible, modalMsg } = UserAuth();

    const handleClosingModal = () => {
        setModalOpen(false);
    }

    return isVisible ? (
        <>
            <div className={`absolute bottom-[16%] left-[3%] lg:left-auto lg:bottom-[90%] lg:right-[3%] w-auto bg-white shadow-lg shadow-[#33b8b8] m-2 rounded-lg ${isModalOpen ? '' : 'translate-x-[-200px] opacity-0 lg:translate-x-[200px]'} duration-700`}>
                <div className="w-full flex flex-row justify-around items-center p-2">
                    <i onClick={handleClosingModal} className="hidden lg:block fa-solid fa-xmark mx-2 text-[#33b8b8] text-xl cursor-pointer"></i>
                    <span className="text-lg p-1 mx-2">{modalMsg}</span>
                    <i onClick={handleClosingModal} className="fa-solid fa-xmark mx-2 text-[#33b8b8] text-xl cursor-pointer lg:hidden"></i>
                </div>
            </div>
        </>
    ) : null;
}

export default Modal