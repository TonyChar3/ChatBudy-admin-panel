
const PageBg1 = ({children}) => {
    return(
        <>
            <div className="relative w-full h-full flex flex-col lg:flex-row items-center">
                <div className="hidden absolute lg:block lg:top-[-8%] lg:left-[-5%] right-20 animate-float">
                    <div className="w-[200px] h-[200px] bg-[#6C2E9C] rounded-full"></div>
                </div>
                <div className="hidden absolute lg:block lg:top-[-8%] lg:left-auto lg:right-0 z-5 animate-float">
                    <div className="w-[200px] h-[200px] bg-[#A881D4] rounded-full"></div>
                </div>
                <div className="absolute top-[10%] left-[5%] lg:top-[-5%] lg:left-[48%] z-5 animate-float">
                    <div className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] bg-[#6C2E9C] lg:bg-[#A881D4] rounded-full"></div>
                </div>
                <div className="absolute top-[5%] right-[30%] lg:top-[55%] lg:left-auto lg:right-[58%] animate-float">
                    <div className="w-[31px] h-[31px] lg:w-[100px] lg:h-[100px] bg-[#A881D4] rounded-full"></div>
                </div>
                <div className="absolute bottom-[20%] left-[5%] animate-float">
                    <div className="w-[50px] h-[50px] bg-[#A881D4] rounded-full"></div>
                </div>
                {children}
                <div className="absolute bottom-[45%] right-[10%] lg:bottom-[9%] lg:left-[20%] animate-float">
                    <div className="w-[50px] h-[50px] bg-[#6C2E9C] rounded-full"></div>
                </div>
                <div className="absolute top-[25%] left-[33%] animate-float hidden lg:block">
                    <div className="w-[50px] h-[50px] bg-[#6C2E9C] rounded-full"></div>
                </div>
                <div className="absolute top-[6%] right-[3%] lg:top-auto lg:bottom-[50%] lg:right-[10%] animate-float">
                    <div className="w-[50px] h-[50px] bg-[#6C2E9C] rounded-full"></div>
                </div>
                <div className="absolute bottom-[15%] right-[32%] animate-float hidden lg:block">
                    <div className="w-[50px] h-[50px] bg-[#A881D4] rounded-full"></div>
                </div>
                <div className="absolute bottom-[2%] right-[3%] animate-float">
                    <div className="w-[200px] h-[200px] bg-[#A881D4] rounded-full"></div>
                </div>
            </div>
        </>
    )
}

export default PageBg1