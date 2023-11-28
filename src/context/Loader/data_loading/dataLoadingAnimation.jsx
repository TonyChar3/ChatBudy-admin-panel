import { useLocation } from "react-router-dom";

const DataLoadingAnimation = () => {

    const location = useLocation();

    return (
        <>
            <div className="w-full h-full flex flex-row justify-center items-center">
                <div className={`w-[17%] h-[10%] border-t-2 border-[#A881D4] border-solid rounded-full animate-spin 
                ${location.pathname === '/navbar/inbox'? 'lg:w-[20%] lg:h-[19%]' : ''}
                ${location.pathname === '/navbar/visitors' ? 'lg:w-[10%] lg:h-[18%]' : ''}`}></div>
            </div>
        </>
    )
}

export default DataLoadingAnimation;