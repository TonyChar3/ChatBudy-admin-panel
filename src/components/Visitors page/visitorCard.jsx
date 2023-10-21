import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const VisitorCard = ({ id, name, email, browser, country, time }) => {
    const [browser_icon, setIcon] = useState('');
    const [time_entered, setTime] = useState('');
    const [open_actions, setActions] = useState(false);

    const { 
        setDeskTopChatRoom, 
        setMobileChatRoom, 
        setDeleteModalOpen, 
        setDeleteModalInfo 
    } = UserAuth();

    const navigate = useNavigate();

    const handleBrowserIcon = (name_browser) => {
        switch(name_browser) {
            case "Safari":
                setIcon(<i className="fa-brands fa-safari text-lg lg:text-3xl"></i>)
                break;
            case "Firefox":
                setIcon(<i className="fa-brands fa-firefox-browser text-lg lg:text-3xl"></i>)
                break;
            case "Google Chrome":
                setIcon(<i className="fa-brands fa-chrome text-lg lg:text-3xl"></i>)
                break;
            case "Internet Explorer":
                setIcon(<i className="fa-brands fa-internet-explorer text-lg lg:text-3xl"></i>)
                break;    
            case "Microsoft Edge":
                setIcon(<i className="fa-brands fa-edge text-lg lg:text-3xl"></i>)
                break;
            case "Opera":
                setIcon(<i className="fa-brands fa-opera text-lg lg:text-3xl"></i>)
                break;
            default:
                setIcon(null);
                break;    
        }
    }

    const visitorTimeEntered = (time_entered) => {
        const currentDate = new Date();
        const visitorCreatedAt = new Date(time_entered);

        visitorCreatedAt.toLocaleDateString() === currentDate.toLocaleDateString()? 
        setTime('Today')
        : 
        setTime(`${visitorCreatedAt.toLocaleDateString()}`);
    }

    const deleteVisitor = (visitr_id, visitr_email) => {
        setActions(false);
        setDeleteModalOpen(true);
        setDeleteModalInfo({
            id: visitr_id,
            email: visitr_email
        });
    }

    const openVisitorChat_DESKTOP = () => {
        setDeskTopChatRoom({
            visitor_id: id,
            visitor_name: email
        });
        navigate("/navbar/inbox");
    }

    const openVisitorChat_MOBILE = () => {
        setMobileChatRoom({
            visitor_id: id,
            visitor_name: email
        });
        navigate("/navbar/chatroom")
    }

    useEffect(() => {
        handleBrowserIcon(browser);
        visitorTimeEntered(time);
    },[id])

    return(
        <>
            <div className="w-[95%] relative flex flex-row justify-around p-3 lg:p-4 my-4 border-[1px] border-[#33b8b8] rounded-xl shadow-md shadow-[#33b8b8] bg-white">
                <div className="w-1/2 flex flex-row lg:justify-between items-center">
                    <h2 className="lg:text-2xl mr-10">{name}</h2>
                    <div className="hidden lg:w-[30%] lg:flex lg:flex-row lg:justify-around lg:items-center lg:mx-auto">
                        {browser_icon}
                        <span className={`flag-icon flag-icon-${country.toLowerCase()} text-3xl`}></span>
                    </div>
                    <div className="flex flex-row justify-between w-[45%] lg:hidden">
                        {browser_icon}
                        <span className={`flag-icon flag-icon-${country.toLowerCase()} text-lg`}></span>
                    </div>
                </div>

                <div className="w-1/2 flex flex-row justify-around items-center">
                    <div className="flex flex-row justify-end w-1/2">
                        <h2 className="lg:text-xl mr-2">{time_entered === 'Invalid Date'? 'Today' : time_entered}</h2>
                    </div>
                    <div className="flex flex-row justify-end w-1/2">
                        <i onClick={() => setActions(open_actions => !open_actions)} className={`${open_actions? 'fa-solid fa-xmark' : 'fa-solid fa-ellipsis-vertical'} text-lg lg:text-2xl active:scale-[0.90] cursor-pointer duration-300 ${open_actions? 'rotate-180' : ''}`}></i>
                    </div>
                </div>
                <div className={`absolute z-10 right-[8%] top-1 lg:right-[6%] lg:top-2 p-2 flex flex-row items-center justify-between w-[20%] lg:w-[8%] text-sm text-center ${open_actions? '':'scale-0'} duration-300`}>
                    <i onClick={() => deleteVisitor(id, email)} className="fa-sharp fa-light fa-delete-left text-xl lg:text-2xl text-red-500 active:scale-[0.90] cursor-pointer bg-white"></i>
                    <i onClick={() => openVisitorChat_DESKTOP()} className="fa-sharp fa-light fa-comment text-xl lg:text-2xl hidden lg:inline-block text-[#33b8b8] active:scale-[0.90] cursor-pointer bg-white"></i>
                    <i onClick={() => openVisitorChat_MOBILE()} className="fa-sharp fa-light fa-comments text-xl lg:text-2xl lg:hidden text-[#33b8b8] active:scale-[0.90] cursor-pointer bg-white"></i>
                </div>
            </div>
        </>
    );
}

export default VisitorCard;