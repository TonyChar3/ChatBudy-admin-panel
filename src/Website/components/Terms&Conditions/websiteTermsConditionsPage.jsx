import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const WebsiteTermsConditionsPage = () => {

    const location = useLocation();
    const securitySectionRef = useRef(null);

    const [security_highlight, setSecurityHighLight] = useState(false);

    useEffect(() => {
        if(location.hash === '#security' && securitySectionRef.current){
            // Scroll to the middle of the "Security" section with smooth behavior
            securitySectionRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center', // You can change this to 'center' if needed
                inline: 'nearest', // You can change this as well
            });

            setSecurityHighLight(true);
        } else {
            setSecurityHighLight(false)
        }
    },[location])

    return (
        <>
            {/**
             * Welcome message from ChatBüdy
             */}
            <div className="w-full h-[5%] mt-10 lg:mt-12 flex flex-row justify-center items-center">
                <div className="w-[30%] h-[4px] bg-[#A881D4]"></div>
            </div>
            <div className="w-full lg:w-[70%] lg:mx-auto flex flex-row justify-center items-center">
                <p className="w-[85%] text-center lg:text-lg">
                    Thank you for choosing ChatBudy, 
                    a leading embeddable widget that provides users with live chat support and lead generation capabilities. 
                    We are committed to delivering a seamless and secure experience to our users. 
                    This policy outlines our terms and conditions, including privacy, security, and usage guidelines, 
                    to ensure a positive experience for all ChatBudy SAAS users.
                </p>
            </div>
            <div className="w-full h-[5%] flex flex-row justify-center items-center lg:mb-2">
                <div className="w-[30%] h-[4px] bg-[#A881D4]"></div>
            </div>

            {/** Acceptance of Terms */}
            <div className="w-full lg:w-[50%] lg:mx-auto h-auto flex flex-col items-center my-2 lg:my-4">
                <div className="w-full flex flex-col justify-start py-1 pl-2">
                    <h2 className="text-2xl p-1 lg:text-3xl">Acceptance of Terms</h2>
                    <div className="w-[75%] h-[4px] bg-[#A881D4] rounded-lg"></div>{/** Divider */}
                </div>
                <p className="p-4 lg:text-lg">
                    By using ChatBudy SAAS, you agree to abide by and be bound by the terms and conditions set forth in this policy. 
                    If you do not agree with any part of this policy, 
                    please discontinue the use of our services.
                </p>
            </div>

            {/** Free Standard deal and plus deal */}
            <div className="w-full lg:w-[50%] lg:mx-auto h-auto flex flex-col items-center my-2 lg:my-4">
                <div className="w-full flex flex-col justify-start py-1 pl-2">
                    <h2 className="text-2xl p-1 w-[60%] lg:text-3xl">Free Standard Deal and Plus Deal</h2>
                    <div className="w-[75%] h-[4px] bg-[#A881D4] rounded-lg"></div>{/** Divider */}
                </div>
                <div className="p-4 lg:text-lg">
                    <p>ChatBüdy offers two subscription plans:</p>
                    <ul className="p-4 list-disc">
                        <li className="font-bold">Free Standard Deal:</li>
                        <span>This plan is available to all users at no cost and includes basic live chat support and lead generation features.</span>
                        <li className="mt-2 font-bold">Plus Deal: </li>
                        <span>This plan is available for a monthly payment of $15. 
                            It includes enhanced features and functionalities, providing a more comprehensive solution for your live chat support and lead generation needs.</span>
                    </ul>
                </div>
            </div>

            {/** Payment and Billing */}
            <div className="w-full lg:w-[50%] lg:mx-auto h-auto flex flex-col items-center my-2 lg:my-4">
                <div className="w-full flex flex-col justify-start py-1 pl-2">
                    <h2 className="text-2xl p-1 w-[60%] lg:text-3xl">Payment and Billing</h2>
                    <div className="w-[75%] h-[4px] bg-[#A881D4] rounded-lg"></div>{/** Divider */}
                </div>
                <p className="p-4 lg:text-lg">
                    For users on the Plus Deal, 
                    the monthly subscription fee of $15 will be billed to the payment method you provide during the registration process. 
                    Billing will begin on the date of registration and will continue monthly until you cancel your subscription.
                </p>
            </div>

            {/** Cancellation and Refunds */}
            <div className="w-full lg:w-[50%] lg:mx-auto h-auto flex flex-col items-center my-2 lg:my-4">
                <div className="w-full flex flex-col justify-start py-1 pl-2">
                    <h2 className="text-2xl p-1 w-[60%] lg:text-3xl">Cancellation and Refunds</h2>
                    <div className="w-[75%] h-[4px] bg-[#A881D4] rounded-lg"></div>{/** Divider */}
                </div>
                <p className="p-4 lg:text-lg">
                    You can cancel your Plus Deal subscription at any time. 
                    To do so, please visit your account settings or contact our customer support. 
                    Refunds are not provided for unused portions of your subscription. 
                    After canceling, you will continue to have access to the Plus Deal features until the end of your current billing cycle.
                </p>
            </div>

            {/** Privacy and Data Handling */}
            <div className={`w-full lg:w-[50%] lg:mx-auto h-auto flex flex-col items-center my-2 lg:my-4 ${security_highlight? 'lg:scale-[1.05]' : ''}`}>
                <div className="w-full flex flex-col justify-start py-1 pl-2">
                    <h2 className={`p-1 w-[60%] ${security_highlight? 'text-3xl lg:text-4xl text-[#A881D4]' : 'text-2xl lg:text-3xl'}`}>Privacy and Data Handling</h2>
                    <div className="w-[75%] h-[4px] bg-[#A881D4] rounded-lg"></div>{/** Divider */}
                </div>
                <p ref={securitySectionRef} className="p-4 lg:text-lg">
                    ChatBüdy takes user privacy seriously. 
                    We collect and process data in accordance with our Privacy Policy, which you can review separately. 
                    We use industry-standard security measures to protect your data, 
                    but it's essential to be cautious with sensitive information shared through our service.
                </p>
            </div>

            {/** Responsible Use */}
            <div className="w-full lg:w-[50%] lg:mx-auto h-auto flex flex-col items-center my-2 lg:my-4">
                <div className="w-full flex flex-col justify-start py-1 pl-2">
                    <h2 className="text-2xl p-1 w-[60%] lg:text-3xl">Responsible Use</h2>
                    <div className="w-[75%] h-[4px] bg-[#A881D4] rounded-lg"></div>{/** Divider */}
                </div>
                <p className="p-4 lg:text-lg">
                    By using ChatBüdy SAAS, you agree not to use the service for any illegal, abusive, or unethical purposes. 
                    You are responsible for all the content you generate through the ChatBüdy widget and must comply with all applicable laws and regulations.
                </p>
            </div>

            {/** Support and Maintenance */}
            <div className="w-full lg:w-[50%] lg:mx-auto h-auto flex flex-col items-center my-2 lg:my-4">
                <div className="w-full flex flex-col justify-start py-1 pl-2">
                    <h2 className="text-2xl p-1 w-[60%] lg:text-3xl">Support and Maintenance</h2>
                    <div className="w-[75%] h-[4px] bg-[#A881D4] rounded-lg"></div>{/** Divider */}
                </div>
                <p className="p-4 lg:text-lg">
                    ChatBüdy aims to provide a high level of support and maintenance for our SAAS. 
                    We will make reasonable efforts to ensure the service is available and operational, 
                    but we cannot guarantee uninterrupted access.
                </p>
            </div>

            {/** Changes to Policy */}
            <div className="w-full lg:w-[50%] lg:mx-auto h-auto flex flex-col items-center my-2 lg:my-4">
                <div className="w-full flex flex-col justify-start py-1 pl-2">
                    <h2 className="text-2xl p-1 w-[60%] lg:text-3xl">Changes to Policy</h2>
                    <div className="w-[75%] h-[4px] bg-[#A881D4] rounded-lg"></div>{/** Divider */}
                </div>
                <p className="p-4 lg:text-lg">
                    ChatBüdy reserves the right to update and modify this policy at any time. 
                    Users will be notified of any significant changes. 
                    It is your responsibility to review this policy periodically to ensure compliance with the latest terms and conditions.
                </p>
            </div>

            {/** Contact Information */}
            <div className="w-full lg:w-[50%] lg:mx-auto h-auto flex flex-col items-center mt-2 mb-10 lg:mt-4 lg:mb-20">
                <div className="w-full flex flex-col justify-start py-1 pl-2">
                    <h2 className="text-2xl p-1 w-[60%] lg:text-3xl">Contact Information</h2>
                    <div className="w-[75%] h-[4px] bg-[#A881D4] rounded-lg"></div>{/** Divider */}
                </div>
                <p className="p-4 lg:text-lg">
                    If you have questions or concerns regarding this policy or the use of ChatBüdy SAAS, 
                    please contact our support team at chatbudysupport@email.com
                </p>
                <p className="p-4 lg:text-lg">
                    By using ChatBudy SAAS, you acknowledge that you have read and understood this policy and agree to abide by its terms and conditions. 
                    Thank you for choosing ChatBudy as your live chat support and lead generation solution.
                </p>
            </div>
        </>
    )
}

export default WebsiteTermsConditionsPage;