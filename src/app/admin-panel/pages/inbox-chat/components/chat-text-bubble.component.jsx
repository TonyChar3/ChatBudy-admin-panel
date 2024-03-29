import { useState, useEffect, useRef } from "react";

const ChatTextBubble = ({ text, sender_type }) => {
  const [chat_type, setType] = useState("");
  const messagesEndRef = useRef(null); // Ref for the last sent message

  useEffect(() => {
    if (sender_type) {
      switch (sender_type) {
        case "visitor":
          setType("rounded-tr-lg justify-self-start bg-[#B5A8CF] ");
          break;
        case "agent":
          setType("rounded-tl-lg justify-self-end bg-[#A881D4] text-white ");
          break;
        case "...":
          setType("rounded-tr-lg justify-self-start bg-[#B5A8CF] ");
          break;
        default:
          break;
      }
    }
    setTimeout(() => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [sender_type]);

  return (
    <>
      <div
        className={`max-w-[38%] md:text-lg text-left p-3 m-5 break-normal rounded-br-lg rounded-bl-lg ${chat_type}`}
      >
        <span>{text}</span>
      </div>
      <div ref={messagesEndRef}></div>
    </>
  );
};

export default ChatTextBubble;
