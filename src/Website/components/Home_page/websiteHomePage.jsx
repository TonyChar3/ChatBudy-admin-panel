import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import RevealOnScroll from '../../../container/scroll/revealOnScroll';
import { useSwipeable } from 'react-swipeable';
import { useState } from 'react';

const WebsiteHomePage = () => {
    const [current_review_index, setCurrentReviewIndex] = useState(0);
    const [swiping_direction, setSwipeDirection] = useState(null);

    const reviews = [
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-[300px] h-[310px] flex flex-col justify-between items-center border-2 border-[#6C2E9C] rounded-xl">
                <p className="w-[90%] text-xl p-1 mt-2">
                    "ChatBudy proves to be an indispensable tool for live customer interaction; 
                    it's user-friendly and integrates seamlessly into our website."
                </p>
                <h3 className="w-full ml-2 p-2 text-2xl">- Roger.B</h3>
            </div>
            <div className="w-[90%] flex flex-row justify-around items-center p-3">
                <i className="fa-solid fa-star text-2xl"></i>
                <i className="fa-solid fa-star text-2xl"></i>
                <i className="fa-solid fa-star text-2xl"></i>
                <i className="fa-solid fa-star text-2xl"></i>
                <i className="fa-solid fa-star-half-stroke text-2xl"></i>
            </div>
        </div>,
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-[300px] h-[310px] flex flex-col justify-between items-center border-2 border-[#6C2E9C] rounded-xl">
                <p className="w-[90%] text-xl p-1 mt-2">
                    "Its reliable performance and easy navigation for users make it an excellent 
                    addition to our service platform.”
                </p>
                <h3 className="w-full ml-2 p-2 text-2xl">- Jeff. K</h3>
            </div>
            <div className="w-[90%] flex flex-row justify-around items-center p-3">
                <i className="fa-solid fa-star text-2xl"></i>
                <i className="fa-solid fa-star text-2xl"></i>
                <i className="fa-solid fa-star text-2xl"></i>
                <i className="fa-solid fa-star text-2xl"></i>
                <i className="fa-solid fa-star text-2xl"></i>
            </div>
        </div>  ,
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-[300px] h-[310px] flex flex-col justify-between items-center border-2 border-[#6C2E9C] rounded-xl">
              <p className="w-[90%] text-xl p-1 mt-2">
                "From installation to interaction, ChatBüdy delivers a stellar performance. 
                It's not just a chat widget."
              </p>
              <h3 className="w-full ml-2 p-2 text-2xl">- Mathew. G</h3>
          </div>
          <div className="w-[90%] flex flex-row justify-around items-center p-3">
              <i className="fa-solid fa-star text-2xl"></i>
              <i className="fa-solid fa-star text-2xl"></i>
              <i className="fa-solid fa-star text-2xl"></i>
              <i className="fa-solid fa-star-half-stroke text-2xl"></i>
              <i className="fa-regular fa-star text-2xl"></i>
          </div>
        </div>            
    ]

    const PreviousReview = () => {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
      );
      setSwipeDirection('right');
    };
  
    const NextReview = () => {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
      setSwipeDirection('left');
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: NextReview,
        onSwipedRight: PreviousReview,
    });

    return (
        <>
            <motion.div 
            className="w-full h-full flex flex-col items-center lg:flex-row"

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="w-full mt-5 flex flex-row justify-center items-center">
                    <img 
                    src="https://res.cloudinary.com/dskpbps9l/image/upload/v1699734263/ChatBudy.io/Increase_Your_Sales_jkhqx6.png" 
                    width="300" 
                    height="300" 
                    alt="chatbudy website logo"
                    className="lg:w-[500px] lg:h-[500px]"
                    />
                </div>
                <div className="flex flex-col justify-center items-center w-[90%] h-[15%] text-[#A881D4]">
                    <h2 className="hidden lg:block text-7xl lg:w-full lg:mb-10">Chat Büdy :)</h2>
                    <h2 className="text-4xl mb-4 lg:w-full">Live support chat 24/7</h2>
                    <div className="w-full flex justify-start items-center">
                        <h3 className="text-2xl ml-6 border-b-2 border-[#A881D4]">Lead generation ++</h3>
                    </div>
                    <Link to="/register" 
                    className="bg-[#6C2E9C] p-3 mt-20 text-2xl text-white rounded-xl w-[55%] text-center border-2 border-[#A881D4] active:scale-[0.90] transition-all ease
                    lg:hidden">
                        Get started
                    </Link>
                </div>
            </motion.div>
            <div className="h-[60%] lg:h-[40%] w-full p-1 flex flex-col items-center bg-website-company-section">
                <RevealOnScroll>
                    <div className="w-full flex flex-row justify-center items-center p-1 lg:mb-20">
                        <h2 className="text-3xl lg:text-5xl text-[#A881D4] border-b-2 border-[#A881D4]">They trust us.</h2>
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
            <div className="w-full h-[70%] p-2 flex flex-col items-center text-[#A881D4]">
                <RevealOnScroll>
                    <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center">
                        <img src="https://res.cloudinary.com/dskpbps9l/image/upload/v1699736567/ChatBudy.io/Increase_Your_Sales_2_ve3pjd.png" 
                        width="300" 
                        height="300" 
                        alt="little cartoon guy on a computer" 
                        className="mt-2 lg:order-2 lg:w-[550px] lg:h-[550px]"
                        />
                        <div className="flex flex-col justify-center items-center lg:order-1 lg:w-[40%]">
                            <h2 className="text-3xl border-b-2 border-[#A881D4] lg:text-5xl lg:mb-6">Live Chat Assistance.</h2>
                            <p className="w-[70%] p-1 text-lg lg:text-xl">
                                Provide exceptional customer service with ChatBüdy, 
                                your round-the-clock chat companion.
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
            <div className="w-full h-[75%] p-2 flex flex-col justify-center items-center text-[#A881D4]">
                <RevealOnScroll>
                    <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center">
                        <img src="https://res.cloudinary.com/dskpbps9l/image/upload/v1699736901/ChatBudy.io/Increase_Your_Sales_5_od0xba.png" 
                        width="250" 
                        height="250" 
                        alt="little cartoon guy on a computer" 
                        className="lg:w-[400px] lg:h-[400px]"
                        />
                        <div className="flex flex-col justify-center items-center mt-2">
                            <div className="w-full lg:w-[70%] flex flex-row justify-center lg:justify-start items-center">
                                <h2 className="text-3xl text-center lg:text-left lg:text-5xl">
                                    Convert Visitors Into 
                                    <p className="underline">
                                        Valuable Leads.
                                    </p>
                                </h2>
                            </div>
                            <p className="w-[70%] p-1 mt-2 text-lg text-center lg:text-left lg:text-xl">
                                Unlock the full potential of your website traffic with ChatBüdy's 
                                Lead Generation mode.
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
            <div className="w-full h-[90%] lg:h-[80%] p-2 flex flex-col justify-center items-center text-[#A881D4]">
                <RevealOnScroll>
                    <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center">
                        <div className="w-[71%] h-[90%] lg:w-[35%] lg:h-[85%] my-1 flex flex-row justify-center items-center rounded-full bg-[#FDFAFF] lg:order-2">
                            <img src="https://res.cloudinary.com/dskpbps9l/image/upload/v1699737624/ChatBudy.io/DALL_E_2023-11-08_13.08.58_-_Create_a_cartoon-style_image_of_an_e-commerce_shop_featuring_a_shopping_cart_and_chat_bubbles_ensuring_all_elements_are_set_against_a_solid_white_bac_mxn4dq.png" 
                            width="200" 
                            height="200" 
                            alt="little cartoon guy on a computer" 
                            className="lg:w-[350px] lg:h-[350px]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center mt-3 lg:order-1">
                            <div className="w-full flex flex-row justify-center items-center">
                                <h2 className="text-3xl text-center lg:text-left lg:text-4xl">
                                    Elevate Your Online Store
                                    <p className="underline">
                                        Experience.
                                    </p>
                                </h2>
                            </div>
                            <p className="w-[70%] p-1 mt-2 text-lg text-center lg:text-left lg:w-[50%]">
                                Boost conversions and foster customer loyalty with a chat solution built 
                                for e-commerce excellence.
                            </p>
                            <Link to="/register" 
                            className="bg-white p-3 my-4 text-2xl text-[#A881D4] rounded-xl w-[55%] text-center border-4 border-[#6C2E9C] active:scale-[0.90] transition-all ease
                            lg:w-[35%] lg:my-8">
                                Get started
                            </Link>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
            <div className="relative w-full h-[80%] p-2 flex flex-col justify-center items-center text-[#A881D4]">
                <RevealOnScroll>
                    <div className="w-full h-full flex justify-center lg:justify-center items-center">
                        <motion.div
                        key={current_review_index}
                        className="w-full h-full flex flex-col justify-center items-center lg:hidden"
                        {...swipeHandlers}
                        initial={{ opacity: 0, x: 0 }}
                        animate={{
                            opacity: 1,
                            x: swiping_direction === 'left' ? [-10, -50, -500, -1000, 1000, 500, 50, 0] : swiping_direction === 'right' ?[ 10, 50, 500, 1000, -1000, -500, -50, 0] : 0,
                        }}
                        exit={{ opacity: 0, x: 0 }}
                        transition={{ ease: 'linear', duration: 0.3 }}
                        style={{ transform: swiping_direction === 'left' ? 'translateX(-50%)' : 'translateX(50)' }}
                        >
                            {reviews[current_review_index]}
                        </motion.div>
                        <div className="absolute bottom-5 flex flex-row justify-around items-center w-[35%] mb-2 lg:hidden">
                            <div className="flex flex-row justify-center items-center mr-2" onClick={PreviousReview}>
                                <i className="fa-solid fa-chevron-left text-2xl cursor-pointer active:scale-[0.90] ease duration-300"></i>
                            </div>
                            {reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className={`text-${index === current_review_index? '[#6C2E9C]' : '[#A881D4]'} flex flex-row justify-center items-center`}
                                >
                                    <i className="fa-duotone fa-circle text-sm"></i>
                                </div>
                            ))}
                            <div className="flex flex-row justify-center items-center ml-2" onClick={NextReview}>
                                <i className="fa-solid fa-chevron-right text-2xl cursor-pointer active:scale-[0.90] ease duration-300"></i>
                            </div>
                        </div>
                        <div className="hidden lg:flex flex-row w-full h-full items-center justify-around">
                            {reviews.map((review, index) => (
                                <div key={index} className="w-full lg:w-[300px]">
                                {review}
                                </div>
                            ))}
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </>
    );
}

export default WebsiteHomePage;