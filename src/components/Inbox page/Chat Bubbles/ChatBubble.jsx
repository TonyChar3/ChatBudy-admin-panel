import { useState, useEffect } from 'react';

const ChatBubble = ({ text, sender_type }) => {

    const [chat_type, setType] = useState('');

    useEffect(() => {
        if(sender_type){
            switch (sender_type){
                case "visitor":
                    setType('rounded-tl-lg justify-self-end')
                    break;
                case "agent":
                    setType('rounded-tr-lg')
                    break;
                default:
                    break;
            }
        }
    },[sender_type])

    return(
        <>
            <div className={`max-w-[38%] text-left p-3 bg-gray-300 m-5 break-normal rounded-br-lg rounded-bl-lg ${chat_type}`}>
                <span>{text}</span>
            </div>
        </>
    )
}

export default ChatBubble;