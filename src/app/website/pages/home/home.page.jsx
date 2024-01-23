import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

import RevealOnScroll from "../../../../components/scroll/reveal-animation.component";
import MainPaintBubbleBackground from "../../components/background/main-paint-bubble-background.component";
import BubbleBackground2 from "../../components/background/bubble-background2.component";
import BubbleBackground3 from "../../components/background/bubble-background3.component";
import { reviews } from "../../../service/reviews/reviews";

const WebsiteHomePage = memo(() => {
  const [current_review_index, setCurrentReviewIndex] = useState(0);
  const [swiping_direction, setSwipeDirection] = useState(null);

  const PreviousReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
    setSwipeDirection("right");
  };

  const NextReview = () => {
    setCurrentReviewIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
    setSwipeDirection("left");
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: NextReview,
    onSwipedRight: PreviousReview,
  });

  return (
    <>
      <motion.div
        className="w-full h-full flex flex-col lg:flex-row items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <MainPaintBubbleBackground>
          <div className="w-full mt-5 flex flex-row justify-center items-center z-10">
            <img
              data-testid="welcome_logo"
              src="https://ik.imagekit.io/bqofr3ncj/tr:w-800/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_jkhqx6.png?updatedAt=1704919570192"
              width="300"
              height="300"
              alt="chatbudy website logo"
              className="lg:w-[500px] lg:h-[500px]"
            />
          </div>
          <div className="flex flex-col justify-center items-center w-[90%] h-[15%] text-[#A881D4] z-10">
            <h2 className="hidden lg:block text-7xl lg:w-full lg:mb-10">
              Chat Büdy 💬
            </h2>
            <h2 className="text-4xl mb-4 lg:w-full">Live support chat 24/7</h2>
            <div className="w-full flex justify-start items-center">
              <h3 className="text-2xl ml-6 border-b-2 border-[#A881D4]">
                Lead generation ++
              </h3>
            </div>
            <Link
              to="/register"
              data-testid="welcome_getstarted"
              className="bg-[#6C2E9C] p-3 mt-20 text-2xl text-white rounded-xl w-[55%] text-center border-2 border-[#A881D4] active:scale-[0.90] transition-all ease
                        lg:hidden"
            >
              Get started
            </Link>
          </div>
        </MainPaintBubbleBackground>
      </motion.div>
      <div
        data-testid="listed_comp_div"
        className="h-[60%] lg:h-[40%] w-full p-1 flex flex-col items-center bg-website-company-section"
      >
        <RevealOnScroll>
          <div className="w-full flex flex-row justify-center items-center p-1 lg:mb-20">
            <h2 className="text-3xl lg:text-5xl text-[#A881D4] border-b-2 border-[#A881D4]">
              They trust us.
            </h2>
          </div>
          <div className="w-full h-full lg:h-auto flex flex-col lg:flex-row justify-around items-center text-[#B1B0B0]">
            <div
              data-testid="company-1"
              className="w-full flex flex-col justify-center items-center"
            >
              <i className="fa-regular fa-arrow-up-left-from-circle text-xl"></i>
              <span className="text-2xl">Mock company</span>
            </div>
            <div
              data-testid="company-2"
              className="w-full flex flex-col justify-center items-center"
            >
              <i className="fa-regular fa-arrow-up-left-from-circle text-xl"></i>
              <span className="text-2xl">Mock company</span>
            </div>
            <div
              data-testid="company-3"
              className="w-full flex flex-col justify-center items-center"
            >
              <i className="fa-regular fa-arrow-up-left-from-circle text-xl"></i>
              <span className="text-2xl">Mock company</span>
            </div>
          </div>
        </RevealOnScroll>
      </div>
      <div className="w-full h-[70%] p-2 flex flex-col items-center text-[#A881D4]">
        <RevealOnScroll>
          <BubbleBackground2
            style={{
              first_bubble_container: "top-0 left-[30%]",
              second_bubble_container: "bottom-1 left-[5%]",
              first_bubble: "w-[150px] h-[150px]",
              second_bubble: "w-[250px] h-[250px]",
            }}
          >
            <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center">
              <img
                src="https://ik.imagekit.io/bqofr3ncj/tr:w-500/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_2_ve3pjd.png?updatedAt=1704919570749"
                width="300"
                height="300"
                alt="little cartoon guy on a computer"
                className="mt-2 lg:order-2 lg:w-[550px] lg:h-[550px]"
              />
              <div className="flex flex-col justify-center items-center lg:order-1 lg:w-[40%] z-10">
                <h2 className="text-3xl border-b-2 border-[#A881D4] lg:text-5xl lg:mb-6">
                  Live Chat Assistance.
                </h2>
                <p
                  data-testid="promotion-copy-1"
                  className="w-[70%] p-1 text-lg lg:text-xl"
                >
                  Provide exceptional customer service with ChatBüdy, your
                  round-the-clock chat companion.
                </p>
              </div>
            </div>
          </BubbleBackground2>
        </RevealOnScroll>
      </div>
      <div className="w-full h-[75%] p-2 flex flex-col justify-center items-center text-[#A881D4] z-10">
        <RevealOnScroll>
          <BubbleBackground2
            style={{
              first_bubble_container: "top-[50%] right-[45%]",
              second_bubble_container: "bottom-15 right-[5%]",
              first_bubble: "w-[150px] h-[150px]",
              second_bubble: "w-[250px] h-[250px]",
            }}
          >
            <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center">
              <img
                src="https://ik.imagekit.io/bqofr3ncj/tr:w-500/ChatBudy.io_2024-01-10_15_24/Increase_Your_Sales_5_od0xba.png?updatedAt=1704919570583"
                width="250"
                height="250"
                alt="cartoon computer"
                className="lg:w-[400px] lg:h-[400px]"
              />
              <div className="flex flex-col justify-center items-center mt-2 z-10">
                <div className="w-full lg:w-[70%] flex flex-row justify-center lg:justify-start items-center">
                  <h2
                    data-testid="promotion-h2-1"
                    className="text-3xl text-center lg:text-left lg:text-5xl"
                  >
                    Convert Visitors Into
                    <p className="underline">Valuable Leads.</p>
                  </h2>
                </div>
                <p
                  data-testid="promotion-copy-2"
                  className="w-[70%] p-1 mt-2 text-lg text-center lg:text-left lg:text-xl"
                >
                  Unlock the full potential of your website traffic with
                  ChatBüdy's Lead Generation mode.
                </p>
              </div>
            </div>
          </BubbleBackground2>
        </RevealOnScroll>
      </div>
      <div className="w-full h-[90%] lg:h-[80%] p-2 flex flex-col justify-center items-center text-[#A881D4] z-10">
        <RevealOnScroll>
          <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center">
            <BubbleBackground3
              style={{
                first_bubble_container: "top-[70%] left-[41%]",
                seconde_bubble_container: "top-[10%] left-[50%]",
                third_bubble_container: "bottom-[10%] left-[4%]",
                first_bubble: "w-[100px] h-[100px]",
                seconde_bubble: "w-[81px] h-[81px]",
                third_bubble: "w-[280px] h-[280px]",
              }}
            >
              <div className="w-[71%] h-[90%] lg:w-[35%] lg:h-[85%] my-1 flex flex-row justify-center items-center rounded-full bg-[#FDFAFF] lg:order-2">
                <img
                  src="https://ik.imagekit.io/bqofr3ncj/tr:w-500/ChatBudy.io_2024-01-10_15_24/DALL_E_2023-11-08_13.08.58_-_Create_a_cartoon-style_image_of_an_e-commerce_shop_featuring_a_shopping_cart_and_chat_bubbles_ensuring_all_elements_are_set_against_a_solid_white_bac_mxn4dq.png?updatedAt=1704919570371"
                  width="200"
                  height="200"
                  alt="shop cartoon style"
                  className="lg:w-[350px] lg:h-[350px]"
                />
              </div>
              <div className="flex flex-col justify-center items-center mt-3 lg:order-1 z-10">
                <div className="w-full flex flex-row justify-center items-center">
                  <h2
                    data-testid="promotion-h2-2"
                    className="text-3xl text-center lg:text-left lg:text-4xl"
                  >
                    Elevate Your Online Store
                    <p className="underline">Experience.</p>
                  </h2>
                </div>
                <p
                  data-testid="promotion-copy-3"
                  className="w-[70%] p-1 mt-2 text-lg text-center lg:text-left lg:w-[50%]"
                >
                  Boost conversions and foster customer loyalty with a chat
                  solution built for e-commerce excellence.
                </p>
                <Link
                  to="/register"
                  data-testid="promotion-div-getstarted"
                  className="bg-white p-3 my-4 text-2xl text-[#A881D4] rounded-xl w-[55%] text-center border-4 border-[#6C2E9C] active:scale-[0.90] transition-all ease
                                lg:w-[35%] lg:my-8"
                >
                  Get started
                </Link>
              </div>
            </BubbleBackground3>
          </div>
        </RevealOnScroll>
      </div>
      <div className="relative w-full h-[80%] p-2 flex flex-col justify-center items-center text-[#A881D4] z-10">
        <RevealOnScroll>
          <BubbleBackground3
            style={{
              first_bubble_container: "top-[10%] right-[35%]",
              seconde_bubble_container: "top-[1%] left-[35%]",
              third_bubble_container: "bottom-[10%] right-[10%]",
              first_bubble: "w-[100px] h-[100px]",
              seconde_bubble: "w-[81px] h-[81px]",
              third_bubble: "w-[310px] h-[310px]",
            }}
          >
            <div className="w-full h-full flex justify-center lg:justify-center items-center">
              <motion.div
                key={current_review_index}
                className="w-full h-full flex flex-col justify-center items-center lg:hidden"
                {...swipeHandlers}
                initial={{ opacity: 0, x: 0 }}
                animate={{
                  opacity: 1,
                  x:
                    swiping_direction === "left"
                      ? [-10, -50, -500, -1000, 1000, 500, 50, 0]
                      : swiping_direction === "right"
                      ? [10, 50, 500, 1000, -1000, -500, -50, 0]
                      : 0,
                }}
                exit={{ opacity: 0, x: 0 }}
                transition={{ ease: "linear", duration: 0.3 }}
                style={{
                  transform:
                    swiping_direction === "left"
                      ? "translateX(-50%)"
                      : "translateX(50)",
                }}
              >
                {reviews[current_review_index]}
              </motion.div>
              <div className="absolute bottom-5 flex flex-row justify-around items-center w-[35%] mb-2 lg:hidden">
                <div
                  data-testid="previous-review-arrow"
                  className="flex flex-row justify-center items-center mr-2"
                  onClick={PreviousReview}
                >
                  <i className="fa-solid fa-chevron-left text-2xl cursor-pointer active:scale-[0.90] ease duration-300"></i>
                </div>
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    data-testid={`feedback-dots-${index}`}
                    className={`text-${
                      index === current_review_index ? "[#6C2E9C]" : "[#A881D4]"
                    } flex flex-row justify-center items-center`}
                  >
                    <i className="fa-duotone fa-circle text-sm"></i>
                  </div>
                ))}
                <div
                  data-testid="next-review-arrow"
                  className="flex flex-row justify-center items-center ml-2"
                  onClick={NextReview}
                >
                  <i className="fa-solid fa-chevron-right text-2xl cursor-pointer active:scale-[0.90] ease duration-300"></i>
                </div>
              </div>
              <div className="hidden lg:flex flex-row w-full h-full items-center justify-around z-10">
                {reviews.map((review, index) => (
                  <div key={index} className="w-full lg:w-[300px]">
                    {review}
                  </div>
                ))}
              </div>
            </div>
          </BubbleBackground3>
        </RevealOnScroll>
      </div>
    </>
  );
});

export default WebsiteHomePage;
