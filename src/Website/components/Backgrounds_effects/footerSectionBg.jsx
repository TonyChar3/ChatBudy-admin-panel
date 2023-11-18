
const FooterBg = ({ children }) => {
    return(
        <>
            <div className="relative w-full h-full flex flex-col lg:flex-row items-center">
                <div className="hidden lg:block absolute top-[2%] left-[20%] animate-float">
                    <div className="w-[100px] h-[100px] bg-[#A881D4] z-5 rounded-full"></div>
                </div>
                { children }
                <div className="hidden lg:block absolute top-[25%] right-[25%] animate-float">
                    <div className="w-[61px] h-[61px] bg-[#A881D4] z-5 rounded-full"></div>
                </div>
                <div className="hidden lg:block absolute bottom-[10%] left-[2%] animate-float">
                    <div className="w-[100px] h-[100px] bg-[#A881D4] z-5 rounded-full"></div>
                </div>
            </div>
        </>
    )
}

export default FooterBg