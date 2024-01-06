import { motion } from 'framer-motion';
import { UserAuth } from '../../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { useNavigate } from 'react-router-dom';
import { widgetScriptTagFetch } from '../../../../context/utils/settingsFunctions';

const InstallationSection = ({ close_page_desktop }) => {

    const { 
        user, 
        setModalOpen, 
        setModalMsg, 
        setModalErrorMode, 
        widget_connected_status } = UserAuth();

    const [active_section, setActiveSection] = useState(null);
    const [ui_state, setUIstate] = useState({
        script_tag: '',
        added_to_clipboard: false,
        error_mode: false,
        shopify_input_value: ''
    });
  
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    const isMobileView = windowWidth <= 820;

    const CopyScriptTag = async() => {
        try {
            await navigator.clipboard.writeText(ui_state.script_tag);
            setUIstate(prevValue => ({
                ...prevValue,
                added_to_clipboard: true,
                error_mode: false
            }));
            setModalErrorMode(false)
            setModalOpen(true);
            setModalMsg('Added to clipboard...')
            
        } catch(err) {
            // set error mode
            setUIstate(prevValue => ({
                ...prevValue,
                error_mode: true
            }));
            setModalErrorMode(true);
            setModalOpen(true);
            setModalMsg('ERROR: try again...');
        }
    };

    const toggleSections = (section) => {
        // check if the shopify input needs to be reset
        if(active_section !== 'shopify'){
            setUIstate(prevValue => ({
                ...prevValue,
                shopify_input_value: ''
            }));
        }
        if(active_section === section){
            setActiveSection(null);
        } else {
            setActiveSection(section);
        }
    }

    const fetchInstallScriptTag = async() => {
        if(!user.emailVerified){
            // just set the script tag with a message to the user
            setUIstate(prevValue => ({
                ...prevValue,
                script_tag: 'Verify your email in the account section 🙃'
            }));
            return;
        }
        const script_tag = await widgetScriptTagFetch(user.accessToken);
        if(script_tag.error){
            setUIstate(prevValue => ({
                ...prevValue,
                error_mode: true
            }));
            setModalErrorMode(true);
            setModalOpen(true);
            setModalMsg(ui_state.script_tag.msg || 'ERROR (500): please refresh the page or contact support');
            return;
        }
        setUIstate(prevValue => ({
            ...prevValue,
            script_tag: script_tag.msg
        }));
        return;
    }

    useEffect(() => {
        if(user.accessToken){
            fetchInstallScriptTag();
        }
    },[user])

    useEffect(() => {
        if(!isMobileView){
            navigate('/navbar/setting')
        }
    },[isMobileView])

    return(
        <>
            <motion.div 
                className="relative w-full h-full flex flex-col justify-center items-center bg-white bg-settings-section-bg bg-cover bg-no-repeat"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="absolute top-0 left-0 w-[20px] p-3 m-3 text-center text-[#A881D4] rounded-3xl active:scale-[0.90] ease duration-300 cursor-pointer">
                    <i onClick={() => close_page_desktop('')} className="fa-regular fa-circle-xmark text-3xl"></i>
                </div>
                <div className="w-full flex flex-col justify-center items-center">
                    <div className={`text-lg ${widget_connected_status? 'text-[#50C878]' : 'text-[#E94E77]'}`}>
                        {
                            widget_connected_status?
                            <>
                                <i className="fa-regular fa-circle-check mr-2 text-xl"></i>Widget is installed
                            </>
                            :
                            <>
                                <i className="fa-regular fa-diamond-exclamation mr-2 text-xl"></i>Widget not installed properly
                            </>
                        }
                    </div>
                    <div className="w-[15%] h-[2px] mt-2 bg-[#A881D4] bg-opacity-40"></div>
                    
                    {/* Javascript section */}
                    <div onClick={() => toggleSections('js')} className={`flex flex-row justify-around items-center w-[50%] my-3 p-2 border-[1px] border-[#6C2E9C] shadow-custom-shadow-input rounded-lg bg-[#A881D4] text-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-[70%] text-center flex flex-row justify-center items-center">
                            <span className="text-xl">
                                <i className="fa-brands fa-square-js mr-3 text-xl"></i>
                                JavaScript
                            </span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-[10%]">
                            <i className={`fa-sharp fa-solid fa-chevron-up ${active_section === 'js'? 'rotate-180' : ''} ease transition-all duration-300 text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row p-2 justify-center items-center ${active_section === 'js'? 'static h-full w-full translate-x-0' : 'absolute h-0 translate-x-[200px] opacity-0 z-[-10]'} transition-all ease-in-out duration-300`}>
                        <div className={`text-center text-lg ${active_section === 'js'? 'translate-x-0 flex flex-col justify-around items-center w-[60%]' : 'translate-x-[200px]'} transition-all duration-300 ease`}>
                            <div className={`relative w-full h-[40%] p-2 bg-white border-[1px] rounded-lg ${ui_state.error_mode? 'border-red-500 shadow-red-500' : 'border-[#6C2E9C] shadow-custom-shadow-input'}`}>
                                <div className="h-full p-2 bg-[#cfcdcc] rounded-lg">
                                    <div onClick={CopyScriptTag} className={`${user.emailVerified? '' : 'hidden'} absolute w-[10%] 2xl:w-[8%] lg:w-[10%] bottom-0 left-[2%] left-4 p-1 text-center text-lg ${ui_state.error_mode? 'bg-[#E94E77] border-white' : 'bg-white'} border-2 ${ui_state.added_to_clipboard? 'border-[#50C878]' : 'border-[#A881D4]'} active:scale-[0.90] rounded-full cursor-pointer shadow-custom-shadow-input`}>
                                        <i className={`${ui_state.added_to_clipboard? 'fa-solid fa-check text-[#50C878]' : 'fa-regular fa-copy text-[#A881D4]'} ${ui_state.error_mode? 'fa-sharp fa-solid fa-xmark text-white' : 'fa-regular fa-copy'}`}></i>
                                    </div>
                                    <p className="w-full p-1 flex flex-row justify-start break-all text-sm">{user.email === "randomprojectemail395@gmail.com" ? "Visit: https://fit-shop.tony-char3.com" : ui_state.script_tag}</p>
                                </div>
                            </div>
                            <div className="w-full text-center m-4 p-2 m-3">
                                <i className="fa-regular fa-lightbulb-on text-2xl text-[#A881D4]"></i>
                                <p className="mt-1 text-md">copy the piece of text and paste it just before the <span className="text-[#A881D4]">{'</body>'}</span> tag and you're all set</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-[15%] h-[2px] bg-[#A881D4] bg-opacity-40"></div>
                </div>
            </motion.div>
        </>
    );
}

export default InstallationSection;