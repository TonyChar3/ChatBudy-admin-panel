

const PageBg5 = ({ children }) => {
    return(
        <>
            <div className="relative w-full h-full flex flex-col lg:flex-row items-center">
                <div className="hidden lg:block absolute top-[10%] right-[35%] animate-float">
                    <div className="w-[100px] h-[100px] bg-[#FDFAFF] z-5 rounded-full"></div>
                </div>
                { children }
                <div className="hidden lg:block absolute top-[1%] left-[35%] animate-float">
                    <div className="w-[81px] h-[81px] bg-[#FDFAFF] z-5 rounded-full"></div>
                </div>
                <div className="hidden lg:block absolute bottom-[10%] right-[10%] animate-float">
                    <div className="w-[310px] h-[310px] bg-[#FDFAFF] z-5 rounded-full"></div>
                </div>
            </div>
        </>
    )
}

export default PageBg5