
const PageBg4 = ({ children }) => {
    return(
        <>
            <div className="relative w-full h-full flex flex-col lg:flex-row items-center">
                <div className="hidden lg:block absolute top-[70%] left-[41%] animate-float">
                    <div className="w-[100px] h-[100px] bg-[#FDFAFF] z-5 rounded-full"></div>
                </div>
                { children }
                <div className="hidden lg:block absolute top-[10%] left-[50%] animate-float">
                    <div className="w-[81px] h-[81px] bg-[#FDFAFF] z-5 rounded-full"></div>
                </div>
                <div className="hidden lg:block absolute bottom-[10%] left-[4%] animate-float">
                    <div className="w-[280px] h-[280px] bg-[#FDFAFF] z-5 rounded-full"></div>
                </div>
            </div>
        </>
    )
}

export default PageBg4