

const PageBg2 = ({ children }) => {
    return(
        <>
            <div className="relative w-full h-full flex flex-col lg:flex-row items-center">
                <div className="hidden lg:block absolute top-0 left-[30%] animate-float">
                    <div className="w-[150px] h-[150px] bg-[#FDFAFF] z-5 rounded-full"></div>
                </div>
                { children }
                <div className="hidden lg:block absolute bottom-1 left-[5%] animate-float">
                    <div className="w-[250px] h-[250px] bg-[#FDFAFF] z-5 rounded-full"></div>
                </div>
            </div>
        </>
    )
}

export default PageBg2