import { useState, useEffect } from 'react';


const VisitorCard = ({ name, browser, country, time}) => {

    const [browser_icon, setIcon] = useState('');

    const handleBrowserIcon = (name_browser) => {
        switch(name_browser) {
            case "Safari":
                setIcon(<i className="fa-brands fa-safari text-lg lg:text-3xl"></i>)
                break;
            case "Firefox":
                setIcon(<i className="fa-brands fa-firefox-browser text-lg lg:text-3xl"></i>)
                break;
            case "Chrome":
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

    const handleTimeEntered = (time_entered) => {
        console.log(time_entered)
    }

    useEffect(() => {
        handleBrowserIcon(browser);
        handleTimeEntered(time)
    },[])

    return(
        <>
            <div className="w-[95%] flex flex-row justify-around p-3 m-2 border-[1px] border-[#33b8b8] rounded-xl shadow-md shadow-[#33b8b8]">
                <div className="w-1/2 flex flex-row lg:justify-between items-center">
                    <h2 className="lg:text-2xl mr-10">#{name}</h2>
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
                    <h2 className="lg:text-lg">Today</h2>
                    <i className="fa-regular fa-comment text-xl lg:text-2xl hover:text-[#33b8b8] active:scale-[0.90] duration-100 ease-in cursor-pointer"></i>
                </div>
            </div>
        </>
    );
}

export default VisitorCard;