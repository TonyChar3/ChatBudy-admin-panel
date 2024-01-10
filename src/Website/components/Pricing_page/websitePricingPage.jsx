import { memo } from "react";
import RevealOnScroll from "../../../container/scroll/revealOnScroll";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UserAuth } from "../../../context/AuthContext";

const WebsitePricingPage = memo(() => {

    const { setNewPlanProspect } = UserAuth();
    return (
        <>
            <motion.div 
            className="w-full lg:h-full flex flex-col justify-center items-center"

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="h-[15%] w-[30%] my-8 border-b-4 border-[#A881D4] hidden lg:block"></div>
                <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center">
                    <div className="w-full h-[50px] flex flex-row justify-end items-center p-2 mr-2 mt-1 lg:hidden">
                        <img src="https://res.cloudinary.com/dskpbps9l/image/upload/v1700051888/ChatBudy.io/Increase_Your_Sales_6_apvrde.png" alt="brand logo image" width="60" height="60" />
                    </div>
                    <div className="w-[60%] h-[4px] bg-[#A881D4] my-4 lg:hidden"></div> {/** Divider */}
                    <div className="w-[90%] lg:w-[35%] h-[600px] p-2 flex flex-col justify-around items-center border-2 border-[#6C2E9C] rounded-xl">
                        <div className="w-[75%] flex flex-row justify-center items-center p-2 border-b-4 border-[#6C2E9C] my-1">
                            <h2 className="text-3xl text-[#A881D4]">Standard deal</h2>
                        </div>
                        <div className="w-full flex flex-row justify-center items-center p-4 my-1">
                            <span className="text-6xl text-[#6C2E9C]">FREE*</span>
                        </div>
                        <p className="w-[90%] text-[#A881D4] text-lg">
                            Try it for free, the standard deal is there to help you integrate 
                            ChatBüdy into your everyday tasks :)
                        </p>
                        <div className="w-[90%] flex flex-col justify-center items-center my-2 p-1 text-[#A881D4] text-xl">
                            <div className="w-full flex flex-row justify-start items-center my-4">
                                <i className="fa-light fa-circle-check mr-2 text-green-500"></i>
                                <span>2 open chatroom at once</span>
                            </div>
                            <div className="w-full flex flex-row justify-start items-center my-1">  
                                <i className="fa-light fa-circle-check mr-2 text-green-500"></i>
                                <span>1 admin allowed</span>
                            </div>
                            <div className="w-full flex flex-row justify-start items-center my-1">
                                <i className="fa-light fa-circle-check mr-2 text-green-500"></i>
                                <span>Limited chat mode to only live chat</span>
                            </div>
                        </div>
                        <Link to="/register" onClick={() => setNewPlanProspect(true)} className="w-[55%] border-2 border-[#6C2E9C] text-[#6C2E9C] text-center p-2 rounded-lg my-1 text-xl active:scale-[0.90] hover:text-[#A881D4] hover:border-[#A881D4] hover:scale-[1.01] transition-transform ease duration-100">
                            Start for free
                        </Link>
                    </div>
                    <div className="w-[60%] h-[4px] bg-[#A881D4] m-4 lg:hidden"></div> {/** Divider */}
                    <div className="lg:block mx-4 hidden">
                        <img src="https://res.cloudinary.com/dskpbps9l/image/upload/v1700051888/ChatBudy.io/Increase_Your_Sales_6_apvrde.png" alt="brand logo image" width="150" height="150" />
                    </div>
                    <div className="w-[90%] lg:w-[35%] h-[600px] p-2 flex flex-col justify-around items-center border-2 border-[#6C2E9C] rounded-xl">
                        <div className="w-[75%] flex flex-row justify-center items-center p-2 border-b-4 border-[#6C2E9C] my-1">
                            <h2 data-testid="plus-card-title" className="text-3xl text-[#A881D4]">Plus+ deal</h2>
                        </div>
                        <div className="w-full flex flex-row justify-center items-center p-4 my-1">
                            <span data-testid="plus-card-price" className="text-6xl text-[#6C2E9C]">15$</span>
                            <span data-testid="plus-card-month" className="text-xl text-[#6C2E9C]">/month</span>
                        </div>
                        <p data-testid="plus-descrip" className="w-[90%] text-[#A881D4] text-lg">
                            The plus deal is letting you use ChatBüdy at full speed. 
                            Recommended for small to big businesses :)
                        </p>
                        <div className="w-[90%] flex flex-col justify-center items-center my-2 p-1 text-[#A881D4] text-xl">
                            <div data-testid="plus-plan-option" className="w-full flex flex-row justify-start items-center my-4">
                                <i className="fa-light fa-circle-check mr-2 text-green-500"></i>
                                <span>Unlimited open chatrooms</span>
                            </div>
                            <div data-testid="plus-plan-option" className="w-full flex flex-row justify-start items-center my-1">  
                                <i className="fa-light fa-circle-check mr-2 text-green-500"></i>
                                <span>Connect up to 8 user to the admin account</span>
                            </div>
                            <div data-testid="plus-plan-option" className="w-full flex flex-row justify-start items-center my-1">
                                <i className="fa-light fa-circle-check mr-2 text-green-500"></i>
                                <span>Customize your widget like you want ;)</span>
                            </div>
                        </div>
                        <Link data-testid="plus-getstarted" to="/register" onClick={() => setNewPlanProspect(true)} className="w-[55%] border-2 border-[#6C2E9C] text-[#6C2E9C] text-center p-2 rounded-lg my-1 text-xl active:scale-[0.90] hover:text-[#A881D4] hover:border-[#A881D4] hover:scale-[1.01] transition-transform ease duration-100">
                            Get Plus+
                        </Link>
                    </div>
                    <div className="w-[60%] h-[4px] bg-[#A881D4] mt-4 mb-10 lg:hidden"></div> {/** Divider */}
                </div>
                <div className="h-[4%] w-[30%] my-8 border-b-4 border-[#A881D4] hidden lg:block"></div>
            </motion.div>
            {/** Desktop list of company names that the user might join if he signs up */}
            <div className="hidden w-full p-5 lg:flex flex-col items-center bg-website-company-section">
                <RevealOnScroll>
                    <div className="w-full flex flex-row justify-center items-center p-1 lg:mb-20">
                        <h2 className="text-4xl text-[#A881D4] border-b-2 border-[#A881D4]">Join them and all the others.</h2>
                    </div>
                    <div className="w-full h-full lg:h-auto flex flex-col lg:flex-row justify-around items-center text-[#B1B0B0]">
                        <div className="w-full flex flex-col justify-center items-center">
                            <i className="fa-regular fa-arrow-up-left-from-circle text-xl"></i>
                            <span className="text-2xl">Mock company</span>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center">
                            <i className="fa-regular fa-arrow-up-left-from-circle text-xl"></i>
                            <span className="text-2xl">Mock company</span>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center">
                            <i className="fa-regular fa-arrow-up-left-from-circle text-xl"></i>
                            <span className="text-2xl">Mock company</span>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </>
    );
})

export default WebsitePricingPage;