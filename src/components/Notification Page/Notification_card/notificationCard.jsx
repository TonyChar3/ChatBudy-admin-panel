import { useState } from 'react';

const NotificationCard = () => {

    const [isChecked, setIsChecked] = useState(false);

    const handleRadioChange = () => {
      setIsChecked(!isChecked);
    };

    return(
        <>
            <div className="p-2 m-2 lg:my-4 bg-gray-500 bg-opacity-10 rounded-lg">
                <p className="font-normal my-1 lg:text-lg">Here's a test notification for the frontend...</p>
                <div className="w-[45%] lg:w-[20%] flex flex-row justify-start p-2 m-1 bg-white rounded-xl hover:scale-[1.1] cursor-pointer">
                    <input
                    type="radio"
                    id="radioButton"
                    className="hidden"
                    name="radioButton"
                    checked={isChecked}
                    onChange={handleRadioChange}
                    onClick={handleRadioChange}
                    />
                    <label
                        htmlFor="radioButton"
                        className="w-4 h-4 border border-gray-500 rounded-sm mr-2 cursor-pointer"
                    >
                    {isChecked && (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="black"
                        className="w-3 h-3"
                        >
                        <path
                        fillRule="evenodd"
                        d="M17.707,3.293C18.098,3.684,18.098,4.316,17.707,4.707L9,13.414l-3.707-3.707c-0.391-0.391-1.024-0.391-1.414,0L2.293,10.293c-0.391,0.391-0.391,1.024,0,1.414l6,6C8.488,17.902,8.744,18,9,18s0.512-0.098,0.707-0.293l10-10C20.098,4.316,20.098,3.684,19.707,3.293z"
                        />
                        </svg>
                    )}
                    </label>
                    <h3 className="text-sm">Mark as read</h3>
                </div>         
            </div>
        </>
    )
}

export default NotificationCard;