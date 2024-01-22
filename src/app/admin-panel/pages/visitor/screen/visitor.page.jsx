import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import VisitorCard from "../components/visitor-card.component";
import VisitorScroll from "../../../../../components/scroll/visitorScroll";
import DataLoadingAnimation from "../../../../../components/Loader/data_loading/dataLoadingAnimation";

import { AppData } from "../../../../service/data/app-data.context";

const VisitorSection = () => {
  const { visitors_array, notification_array } = AppData();

  const [visitor_page_array, setPageArray] = useState(null);

  useEffect(() => {
    if (Array.isArray(visitors_array) && Array.isArray(notification_array)) {
      const updatedInboxArray = visitors_array.map((visitor) => {
        let visitor_unread_chat = notification_array.filter(
          (notif) => notif.sent_from.toString() === visitor._id.toString()
        );
        return {
          ...visitor,
          unread_chat_count: visitor_unread_chat.length,
        };
      });
      setPageArray(updatedInboxArray);
    }
  }, [visitors_array, notification_array]);

  return (
    <>
      <motion.div
        className="relative w-full h-full flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        {Array.isArray(visitor_page_array) ? (
          <>
            <VisitorScroll>
              <div className="w-full flex flex-col justify-center lg:justify-start items-center">
                <div className="h-[20px]"></div>
                {visitor_page_array.length ? (
                  visitor_page_array.map((ppl, i) => (
                    <VisitorCard
                      key={i}
                      id={ppl._id}
                      name={ppl.email || ppl._id}
                      email={ppl.email}
                      browser={ppl.browser}
                      country={ppl.country}
                      time={ppl.createdAt}
                      visitor_mode={ppl.mode}
                      unread_chat_count={ppl.unread_chat_count}
                    />
                  ))
                ) : (
                  <div className="absolute bottom-0 h-full w-full flex flex-row p-5 justify-center items-center">
                    <div className="flex flex-col justify-center items-center text-[#A881D4]">
                      <i className="fa-light fa-people text-4xl lg:text-5xl"></i>
                      <h3 className="text-2xl lg:text-3xl">No visitor</h3>
                    </div>
                  </div>
                )}
                <div className="lg:h-[20px] h-[100px]"></div>
              </div>
            </VisitorScroll>
          </>
        ) : (
          <DataLoadingAnimation />
        )}
      </motion.div>
    </>
  );
};

export default VisitorSection;
