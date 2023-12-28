import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import WebsiteFooter from "../Footer/websiteFooter";


const WebSiteNavbar = () => {

    const [ui_state, setUIstate] = useState({
        open_mobile_nav: false,
        user_scroll: false
    });
    
    const outletRef = useRef(null);

    const handleScroll = () => {
        if (outletRef.current.scrollTop > 0) {
            setUIstate(prevValue => ({
                ...prevValue,
                user_scroll: true
            }));
        } else {
            setUIstate(prevValue => ({
                ...prevValue,
                user_scroll: false
            }));
        }
      };
    
      useEffect(() => {
        if (outletRef.current) {
          outletRef.current.addEventListener('scroll', handleScroll);
          return () => {
            if(outletRef.current){
                outletRef.current.removeEventListener('scroll', handleScroll);
            }
          };
        }
      }, [outletRef]);


    return(
        <>
            <div className="flex flex-col min-h-full bg-white">
                <div className="absolute ml-4 md:ml-6 mt-2 md:mt-3 self-start z-20 lg:hidden">
                    <i 
                    onClick={() => setUIstate(prevValue => ({ ...prevValue, open_mobile_nav: !ui_state.open_mobile_nav }))} 

                    className={`
                    text-5xl 
                    ${ui_state.open_mobile_nav? 'text-[#6C2E9C]' : 'text-[#A881D4]'}
                    fa-solid fa-${ui_state.open_mobile_nav? 'xmark' : 'bars'} 
                    ${ui_state.open_mobile_nav? 'rotate-180' : ''} duration-300`}
                    ></i>
                </div>
                <div className={`${ui_state.open_mobile_nav ? 'translate-x-0' : '-translate-x-full'} absolute w-full h-full bg-black bg-opacity-20`}></div>
                <nav className={`
                ${ui_state.open_mobile_nav ? 'translate-x-0 left-2 bg-white' : '-translate-x-full left-0 lg:translate-x-0'}
                absolute h-80 w-[65%] p-2 top-[8%] flex flex-col justify-around bg-transparent z-20 border-2 border-[#6C2E9C] rounded-xl transition-all ease duration-300
                md:w-[50%]
                lg:top-0 lg:left-0 lg:right-0 lg:h-auto lg:w-full lg:flex-row lg:rounded-none lg:border-none
                ${ui_state.user_scroll ? 'lg:bg-white lg:p-3 lg:shadow-md lg:shadow-[#A881D4]' : ''}`}>
                    <div className="flex flex-col lg:flex-row lg:justify-around lg:w-1/2 items-center">
                        <NavLink to="/" className="text-2xl lg:text-2xl mb-6 lg:mb-0 active:scale-[0.90] transition-all ease">
                            {({isActive}) => (
                                <span data-testid="navbtn-home" className={`${isActive? 'underline text-[#A881D4]' : 'text-[#6C2E9C]'}`}>
                                    Home
                                </span>
                            )}
                        </NavLink>
                        <NavLink to="/pricing" className="text-2xl lg:text-2xl mb-6 lg:mb-0 active:scale-[0.90] transition-all ease">
                            {({isActive}) => (
                                <span data-testid="navbtn-pricing" className={`${isActive? 'underline text-[#A881D4]' : 'text-[#6C2E9C]'}`}>
                                    Pricing
                                </span>
                            )}
                        </NavLink>
                        <NavLink to="https://chatbudy-official-docs.vercel.app" target="_blank" className="text-2xl lg:text-2xl active:scale-[0.90] transition-all ease">
                            {({isActive}) => (
                                <span data-testid="navbtn-docs" className={`${isActive? 'underline text-[#A881D4]' : 'text-[#6C2E9C]'}`}>
                                    Docs
                                </span>
                            )}
                        </NavLink>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:justify-around lg:items-center lg:w-1/4 lg:h-auto ml-2 justify-around h-20">
                        <NavLink to="/login" data-testid="nav-login" className="text-lg lg:text-xl mb-4 lg:mb-0 text-[#A881D4] active:scale-[0.90] transition-all ease">Login</NavLink>
                        <NavLink to="/register" data-testid="nav-getstarted" className="hidden lg:block bg-[#6C2E9C] p-2 lg:text-xl text-white font-light rounded-xl w-[50%] text-center active:scale-[0.90] transition-all ease">Get started</NavLink>
                    </div>
                </nav>
                <div ref={outletRef} className="w-full h-full bg-[#FFFFFF] flex-grow overflow-y-auto">
                    <Outlet />
                    <WebsiteFooter />
                </div>
            </div>
        </>
    )
}

export default WebSiteNavbar;