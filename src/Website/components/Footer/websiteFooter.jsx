import { Link } from 'react-router-dom';
import FooterBg from '../Backgrounds_effects/footerSectionBg';

const WebsiteFooter = () => {

    return(
        <>
            <div className="h-auto mt-auto py-4 flex flex-col justify-center items-center lg:items-start text-white bg-[#6C2E9C] lg:flex-row">
                <FooterBg>
                    <div className="w-full flex flex-col justify-center items-center text-xl my-6 lg:justify-start lg:my-8">
                        <Link to="/" className="my-2 lg:my-4 active:scale-[0.90] transition-all ease-in-out">Home</Link>
                        <Link to="/terms_conditions#security" className="my-2 lg:my-4 active:scale-[0.90] transition-all ease-in-out">Security</Link>
                        <a href="https://chatbudy-official-docs.vercel.app" className="my-2 lg:my-4 active:scale-[0.90] transition-all ease-in-out">Docs</a>
                    </div>
                    <div className="w-full flex flex-row justify-start items-start p-3 my-4 lg:my-8">
                        <Link to="/terms_conditions" className="text-xl active:scale-[0.90] transition-all ease-in-out">Terms and Conditions</Link>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center text-xl my-4 lg:my-8">
                        <Link to="https://chatbudy-official-docs.vercel.app/getting_started/getting_started.html" target="_blank" className="my-2 lg:my-4 active:scale-[0.90] transition-all ease-in-out">Installation</Link>
                        <Link to="https://chatbudy-official-docs.vercel.app/getting_started/getting_started.html" target="_blank" className="my-2 lg:my-4 active:scale-[0.90] transition-all ease-in-out">Get started</Link>
                        <Link to="https://chatbudy-official-docs.vercel.app/integration.html" target="_blank" className="my-2 lg:my-4 active:scale-[0.90] transition-all ease-in-out">Integration</Link>
                    </div>
                    <div className="w-full lg:flex lg:flex-col lg:justify-center lg:items-center">
                        <div className="w-full flex flex-col justify-center items-center my-4 text-xl lg:my-6">
                            <button className="w-[55%] border-2 border-white p-1 rounded-lg my-2 active:scale-[0.90] transition-all ease duration-100">Contact sales</button>
                            <Link to="/pricing" className={`w-[55%] border-2 ${window.location.pathname === '/pricing'? 'border-[#A881D4] text-[#A881D4]' : 'border-white text-white'} p-1 rounded-lg my-2 text-center active:scale-[0.90] transition-all ease duration-100`}>Pricing</Link>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center p-2 my-4 lg:my-6">
                            <div className="w-full flex flex-row justify-center items-center">
                                <i className="fa-brands fa-linkedin text-4xl active:scale-[0.90] transition-all ease-in-out cursor-pointer"></i>
                            </div>
                            <div className="w-full flex flex-row justify-around items-center text-4xl p-2 lg:p-1">
                                <i className="fa-brands fa-instagram active:scale-[0.90] transition-all ease-in-out cursor-pointer"></i>
                                <i className="fa-brands fa-tiktok active:scale-[0.90] transition-all ease-in-out cursor-pointer"></i>
                            </div>
                        </div>
                    </div>
                </FooterBg>
            </div>
            <div className="w-full flex flex-row justify-center items-center bg-[#A881D4]">
                <span className="text-xs p-2 text-[#6C2E9C]">powered by ChatBüdy.io All rights reserved</span>
            </div>
        </>
    )
}

export default WebsiteFooter;