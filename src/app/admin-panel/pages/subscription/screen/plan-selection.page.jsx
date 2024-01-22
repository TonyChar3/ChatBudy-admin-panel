import { motion } from "framer-motion";
import { checkoutPlusPlan } from "../../../../../utils/manageAuth";

import VisitorScroll from "../../../../../components/scroll/visitorScroll";

import { ModalState } from "../../../../service/modals/modals.context";
import { UserAuth } from "../../../../service/authentication/authentication.context";

const PlanSelectionPage = () => {
  const { user, setShowLoader } = UserAuth();
  const { setModalOpen, setModalMsg, setModalErrorMode } = ModalState();

  const PlusCheckout = async () => {
    try {
      setShowLoader(true);
      const checkout = await checkoutPlusPlan(
        "logged_client",
        user.accessToken
      );
      if (checkout.error) {
        setShowLoader(false);
        setModalOpen(true);
        setModalErrorMode(true);
        setModalMsg("ERROR starting checkout. Please try again.");
      }
    } catch (err) {
      setShowLoader(false);
      setModalOpen(true);
      setModalErrorMode(true);
      setModalMsg("ERROR starting checkout. Please try again.");
    }
  };

  return (
    <>
      <VisitorScroll>
        <motion.div
          className="w-full lg:h-full flex flex-col justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <div className="h-[15%] w-[30%] my-8 border-b-4 border-[#A881D4] hidden lg:block"></div>
          <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center">
            <div className="w-full h-[20px] lg:hidden"></div> {/** Divider */}
            <div className="w-[90%] lg:w-[35%] h-[600px] p-2 flex flex-col justify-around items-center border-2 border-[#6C2E9C] rounded-xl">
              <div className="w-[75%] flex flex-row justify-center items-center p-2 border-b-4 border-[#6C2E9C] my-1">
                <h2 className="text-3xl text-[#A881D4]">Standard deal</h2>
              </div>
              <div className="w-full flex flex-row justify-center items-center p-4 my-1">
                <span className="text-6xl text-[#6C2E9C]">FREE*</span>
              </div>
              <p className="w-[90%] text-[#A881D4] text-lg">
                Try it for free, the standard deal is there to help you
                integrate ChatBüdy into your everyday tasks :)
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
              <div className="w-[55%] border-2 text-center p-2 rounded-lg my-1 text-xl text-[#A881D4] border-[#A881D4] scale-[1.01] cursor-pointer">
                Current Plan
              </div>
            </div>
            <div className="w-[60%] h-[4px] bg-[#A881D4] m-4 lg:hidden"></div>{" "}
            {/** Divider */}
            <div className="lg:block mx-4 hidden">
              <img
                src="https://res.cloudinary.com/dskpbps9l/image/upload/v1700051888/ChatBudy.io/Increase_Your_Sales_6_apvrde.png"
                alt="brand logo image"
                width="150"
                height="150"
              />
            </div>
            <div className="w-[90%] lg:w-[35%] h-[600px] p-2 flex flex-col justify-around items-center border-2 border-[#6C2E9C] rounded-xl">
              <div className="w-[75%] flex flex-row justify-center items-center p-2 border-b-4 border-[#6C2E9C] my-1">
                <h2 className="text-3xl text-[#A881D4]">Plus+ deal</h2>
              </div>
              <div className="w-full flex flex-row justify-center items-center p-4 my-1">
                <span className="text-6xl text-[#6C2E9C]">15$</span>
                <span className="text-xl text-[#6C2E9C]">/month</span>
              </div>
              <p className="w-[90%] text-[#A881D4] text-lg">
                The plus deal is letting you use ChatBüdy at full speed.
                Recommended for small to big businesses :)
              </p>
              <div className="w-[90%] flex flex-col justify-center items-center my-2 p-1 text-[#A881D4] text-xl">
                <div className="w-full flex flex-row justify-start items-center my-4">
                  <i className="fa-light fa-circle-check mr-2 text-green-500"></i>
                  <span>Unlimited open chatrooms</span>
                </div>
                <div className="w-full flex flex-row justify-start items-center my-1">
                  <i className="fa-light fa-circle-check mr-2 text-green-500"></i>
                  <span>Connect up to 8 user to the admin account</span>
                </div>
                <div className="w-full flex flex-row justify-start items-center my-1">
                  <i className="fa-light fa-circle-check mr-2 text-green-500"></i>
                  <span>Customize your widget like you want ;)</span>
                </div>
              </div>
              <div
                onClick={PlusCheckout}
                className="w-[55%] border-2 border-[#6C2E9C] text-[#6C2E9C] text-center p-2 rounded-lg my-1 text-xl active:scale-[0.90] hover:text-[#A881D4] hover:border-[#A881D4] hover:scale-[1.01] transition-transform ease duration-100 cursor-pointer"
              >
                Get Plus+
              </div>
            </div>
            <div className="w-[60%] h-[4px] bg-[#A881D4] mt-4 mb-10 lg:hidden"></div>{" "}
            {/** Divider */}
          </div>
          <div className="h-[4%] w-[30%] my-8 border-b-4 border-[#A881D4] hidden lg:block"></div>
        </motion.div>
        <div className="w-full h-[45px] lg:hidden"></div>
      </VisitorScroll>
    </>
  );
};

export default PlanSelectionPage;
