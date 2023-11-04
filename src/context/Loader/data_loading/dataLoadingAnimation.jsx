import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DataLoadingAnimation = () => {

    const location = useLocation();

    useEffect(() => {
        console.log(location)
    },[location])

    return (
        <>
            <div className="w-full h-full flex flex-row justify-center items-center">
                <div className={`w-[17%] h-[10%] ${location.pathname === '/navbar/visitors' ? 'lg:w-[10%] lg:h-[18.5%]' : 'lg:w-[20%] lg:h-[18%]'} border-t-2 border-[#A881D4] border-solid rounded-full animate-spin`}></div>
            </div>
        </>
    )
}

export default DataLoadingAnimation;