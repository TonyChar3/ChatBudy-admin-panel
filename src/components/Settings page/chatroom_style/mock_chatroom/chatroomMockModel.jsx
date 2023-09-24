import { useState, useEffect, useRef } from 'react';
import { sanitizeInputValue } from '../../../../utils/security';

const ChatroomMockModel = ({ room_title, greeting_message, shape, main_color }) => {

    const [activate_chat, setActivateChat] = useState(false);
    const [chat_input_value, setChatInputValue] = useState('');
    const [chat_array, setChatArray] = useState([]);

    const chatScrollDownRef = useRef();

    const handleSendChat = () => {
        // function to send a new chat in the mock model
        const santizied_val = sanitizeInputValue(chat_input_value)
        if(santizied_val !== ''){
            // add it to the array
            setChatArray([...chat_array, santizied_val]);
        }
        // clean up the input
        setChatInputValue('')
    }

    useEffect(() => {
        if (chatScrollDownRef.current) {
            chatScrollDownRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [chat_array]);

    return(
        <>
            <div className="absolute bottom-[125px] flex flex-row justify-center items-center">
                <div className="relative bg-[#e4e7ed] w-[305px] h-[520px] rounded-lg">
                    <div className={`absolute w-full h-full transition-transform duration-200 ease-in-out boxShadow-custom-shadow-widget-content custom-scrollbar shadow-lg shadow-black rounded-lg z-20`}>
                        <div style={{ backgroundColor: main_color }} className="p-2 text-[#fff] boxShadow-custom-shadow-widget-header border-b-[1px] border-transparent rounded-t-lg">
                            <div className="p-[.4em] w-full flex flex-row justify-start items-center">
                            <span className="absolute m-1 top-1 right-1 cursor-pointer">
                                <i className="fa-solid fa-arrow-right-from-arc active:scale-[0.90] ease duration-300"></i>
                            </span>
                            </div>
                            <div className="text-md">
                                <h3 className="text-xl font-normal font-Noto mb-[.2em] ml-[.2em]">{room_title}</h3>
                                <p className="text-md">
                                    <i className='fa-solid fa-circle text-[#1af033] mx-[.3em]'></i>
                                    Online
                                </p>
                            </div>
                        </div>
                        <div className="h-[85%] w-full flex flex-col justify-end transition-transform ease duration-300 bg-white rounded-b-lg">
                            <div className="max-h-[95%] w-full overflow-y-scroll grid grid-cols-1 bg-white bg-opacity-10 transiton-all ease-in-out duration-300">
                                <div className={`w-auto h-auto flex flex-col p-1 ${activate_chat? 'hidden' : ''}`}>
                                    <div className="inline_block max-w-[50%] h-auto m-1 p-1 rounded-br-lg bg-[#d6d6d6] rounded-tr-lg rounded-tl-lg self-start justify-self-start">
                                        <span className="text-sm">{greeting_message}</span>
                                    </div>
                                    <div className="inline-block max-w-[55%] h-auto mx-1 mt-1 p-[.5em] border-2 border-[#0c64f2] rounded-t-lg rounded-br-lg">
                                        <input type="text" placeholder="email@adress.com" className="w-full p-[.4em] border-b-[1px] border-[#c9c8c5] focus:border-[#0c64f2] text-sm outline-none"/>
                                    </div>
                                    <div className="flex flex-row justify-between max-w-[59%] h-auto p-[.5em]">
                                        <button onClick={() => setActivateChat(true)} className="p-[.4em] border-[1px] border-[#0c64f2] rounded-lg text-[#0c64f2] text-sm active:border-[#c9c8c5] active:text-[#c9c8c5] active:scale-[0.70] transition-all ease-in-out duration-300">sure 👍</button>
                                        <button onClick={() => setActivateChat(true)} className="p-[.4em] border-[1px] border-[#0c64f2] rounded-lg text-[#0c64f2] text-sm active:border-[#c9c8c5] active:text-[#c9c8c5] active:scale-[0.70] transition-all ease-in-out duration-300">nope 👎</button>
                                    </div>
                                </div>
                                {
                                    chat_array.length ?
                                    (
                                        chat_array.map((chat, i) => (
                                            <div key={i} className="inline-block max-w-[50%] h-auto m-2 rounded-t-lg rounded-bl-lg justify-self-end self-end rounded-t-lg rounded-bl-lg text-white bg-[#0c64f2]">
                                                <span className="inline-block max-w-full p-2 break-words">{chat}</span>
                                                <div ref={chatScrollDownRef}></div>
                                            </div>
                                        ))
                                    )
                                    :
                                    (
                                        <></>
                                    )
                                }
                            </div>
                            <div className={`w-[90%] h-[2px] my-[.1em] mx-auto bg-[#c9c8c5] ${activate_chat? '' : 'hidden'}`}></div>
                            <textarea id="chat-room__input" type="text" placeholder="chat..." onChange={(e) => setChatInputValue(e.target.value)} value={chat_input_value} className={`h-auto max-h-[20%] max-w-[79%] overflow-y-auto p-1 p-2 text-md border-none outline-none resize-none whitespace-pre-wrap break-words ${activate_chat? '' : 'hidden'}`}></textarea>
                            <div className="w-[8%] h-[2px] mx-auto bg-[#c9c8c5]"></div>
                            <div className="w-ful p-1 rounded-b-lg">
                                <div>
                                    <h2 className="text-[0.70rem] text-[#6e6e6e]">powered by ChatBüdy :)</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: main_color }} onClick={() => handleSendChat()} className={`absolute right-[20px] bottom-[2px] w-[50px] h-[50px] flex flex-row justify-center items-center ${shape === 'square'? 'rounded-lg' : 'rounded-full'} shadow-md shadow-black active:scale-[0.90] ease-in-out duration-300 cursor-pointer z-50`}>
                        <i className={`fa-sharp fa-light fa-paper-plane-top text-white text-2xl`}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatroomMockModel;