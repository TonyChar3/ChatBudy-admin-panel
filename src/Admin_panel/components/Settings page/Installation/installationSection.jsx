import { motion } from 'framer-motion';
import { UserAuth } from '../../../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { useNavigate } from 'react-router-dom';
import { sanitizeInputValue } from '../../../../context/utils/security';
import { initiateShopifyInstall, widgetScriptTagFetch } from '../../../../context/utils/settingsFunctions';

const InstallationSection = ({ close_page_desktop }) => {

    const { 
        user, 
        setModalOpen, 
        setModalMsg, 
        setModalErrorMode, 
        widget_connected } = UserAuth();

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

    const StartInstallShopify = async() => {
        // check if the input value is set
        if(ui_state.shopify_input_value === ''){
            setModalErrorMode(true);
            setModalOpen(true);
            setModalMsg('Enter your store domain.');
            return;
        }
        // sanitize the input value
        const sanitize_value = sanitizeInputValue(ui_state.shopify_input_value);
        if(!sanitize_value){
            setModalErrorMode(true);
            setModalOpen(true);
            setModalMsg('Invalid shopify domain. Try yourDomain.myshopify.com format.');
            return;
        }
        // initiate the shopift install process
        const install_process = await initiateShopifyInstall(user.accessToken, sanitize_value);
        if(install_process.error){
            setModalErrorMode(true);
            setModalOpen(true);
            setModalMsg(install_process.msg);
            return;
        }
        setUIstate(prevValue => ({
            ...prevValue,
            error_mode: false
        }));
        setModalErrorMode(false);
        setModalOpen(true);
        setModalMsg('Redirecting...');
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
                    <div className={`text-lg ${widget_connected? 'text-[#50C878]' : 'text-[#E94E77]'}`}>
                        {
                            widget_connected?
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
                                    <div onClick={CopyScriptTag} className={`${user.emailVerified? '' : 'hidden'} absolute w-[10%] bottom-0 left-[2%] left-4 p-1 text-center text-lg ${ui_state.error_mode? 'bg-[#E94E77] border-white' : 'bg-white'} border-2 ${ui_state.added_to_clipboard? 'border-[#50C878]' : 'border-[#A881D4]'} active:scale-[0.90] rounded-full cursor-pointer shadow-custom-shadow-input`}>
                                        <i className={`${ui_state.added_to_clipboard? 'fa-solid fa-check text-[#50C878]' : 'fa-regular fa-copy text-[#A881D4]'} ${ui_state.error_mode? 'fa-sharp fa-solid fa-xmark text-white' : 'fa-regular fa-copy'}`}></i>
                                    </div>
                                    <p className="w-full p-1 flex flex-row justify-start break-all text-sm">{ui_state.script_tag}</p>
                                </div>
                            </div>
                            <div className="w-full text-center m-4 p-2 m-3">
                                <i className="fa-regular fa-lightbulb-on text-2xl text-[#A881D4]"></i>
                                <p className="mt-1 text-md">copy the piece of text and paste it just before the <span className="text-[#A881D4]">{'</body>'}</span> tag and you're all set</p>
                            </div>
                        </div>
                    </div>

                    {/* Shopify section */}
                    <div onClick={() => toggleSections('shopify')} className={`flex flex-row justify-around items-center w-[50%] my-3 p-2 border-[1px] border-[#6C2E9C] shadow-custom-shadow-input rounded-lg bg-[#A881D4] text-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-[70%] text-center flex flex-row justify-center items-center ">
                            <span className="text-xl">
                                <i className="fa-brands fa-shopify mr-3 text-xl"></i>
                                Shopify
                            </span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-[10%]">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-2xl ${active_section === 'shopify'? 'rotate-180' : ''} ease transition-all duration-300 cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 justify-center items-center ${active_section === 'shopify'? 'static h-[80%] translate-x-0' : 'absolute h-0 translate-x-[200px] -z-20'} transition-all ease-in-out duration-300`}>
                        <div className={`text-center text-lg ${active_section === 'shopify'? 'static translate-x-0 flex flex-col justify-around items-center w-1/2' : 'relative translate-x-[500px] opacity-0 z-[-10]'} transition-all duration-300 ease`}>
                            {
                                user.emailVerified?
                                (
                                    <>
                                        <div className="flex flex-col justify-center items-center">
                                            <p className="text-lg w-full my-2">
                                                Enter your <span className="text-[#A881D4] underline">shopifyDomain.myshopify.com</span> to embed
                                                ChatBüdy in your store
                                            </p>
                                            <div className="bg-white p-1 my-2 rounded-lg shadow-custom-shadow-input">
                                                <input onChange={(e) => {
                                                    setUIstate(prevValue => ({
                                                        ...prevValue,
                                                        shopify_input_value: e.target.value
                                                    }));
                                                }} 
                                                type="text" 
                                                placeholder=".myshopify.com" 
                                                value={ui_state.shopify_input_value} 
                                                className={`p-3 rounded-lg border-[1px] outline-none 
                                                ${ui_state.error_mode? 'border-[#E94E77]' : 'border-[#A881D4]'}
                                                `}/>
                                            </div>
                                            <button onClick={StartInstallShopify} className="bg-[#6C2E9C] text-white rounded-lg w-[40%] text-center my-2 p-1 text-lg active:scale-[0.90] ease-in-out duration-100">Install</button>
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <div className="flex flex-col justify-center items-center">
                                            <p className="text-[#33b8b8] text-lg w-full my-2">
                                                Verify your email {'🙃'}
                                            </p>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>

                    {/* Magento section */}
                    <div onClick={() => toggleSections('magento')} className={`flex flex-row justify-around items-center w-[50%] my-3 p-2 border-[1px] border-[#6C2E9C] shadow-custom-shadow-input rounded-lg bg-[#A881D4] text-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-[70%] text-center flex flex-row justify-center items-center">
                            <span className="text-xl">
                                <i className="fa-brands fa-magento mr-2 text-xl"></i>
                                Magento
                            </span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-[10%]">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-2xl ${active_section === 'magento'? 'rotate-180' : ''} ease transition-all duration-300 cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row p-2 my-7 justify-center items-center ${active_section === 'magento'? 'static h-full w-full translate-x-0' : 'absolute h-0 translate-x-[200px] opacity-0 z-[-10]'} transition-all ease-in-out duration-300`}>
                        <div className={`text-center text-lg ${active_section === 'magento'? 'translate-x-0 flex flex-col justify-around items-center w-[60%]' : 'translate-x-[500px] w-0'} transition-all ease`}>
                            <p className="text-sm w-full my-2">1.Go to your Magento admin page, then Content {'>'} Design {'>'} Configuration. Find the store view you want to configure and click Edit in the Action column</p>
                            <p className="text-sm w-full my-2">2.Expand the HTML Head section, paste the widget code into the Scripts and Style Sheets field, and then press the “Save configuration” button</p>
                            <div className={`relative w-full my-2 h-[40%] p-2 bg-white border-[1px] rounded-lg ${ui_state.error_mode? 'border-[#E94E77] shadow-[#E94E77]' : 'border-[#A881D4] shadow-custom-shadow-input'}`}>
                                <div className="h-full p-2 bg-[#cfcdcc] rounded-lg">
                                    <div onClick={CopyScriptTag} className={`${user.emailVerified? '' : 'hidden'} absolute w-[10%] bottom-0 left-[2%] left-4 p-1 text-center text-lg ${ui_state.error_mode? 'bg-[#E94E77] border-white' : 'bg-white'} border-2 ${ui_state.added_to_clipboard? 'border-[#50C878]' : 'border-[#A881D4]'} active:scale-[0.90] rounded-full cursor-pointer shadow-custom-shadow-input`}>
                                        <i className={`${ui_state.added_to_clipboard? 'fa-solid fa-check text-[#50C878]' : 'fa-regular fa-copy text-[#A881D4]'} ${ui_state.error_mode? 'fa-sharp fa-solid fa-xmark text-white' : 'fa-regular fa-copy'}`}></i>
                                    </div>
                                    <p className="w-full p-1 flex flex-row justify-start break-all text-sm">{ui_state.script_tag}</p>
                                </div>
                            </div>
                            <p className="text-sm w-full my-3">3.Go to System {'>'} Cache management, select ALL checkboxes, and press the Refresh/Submit button</p>
                            <p className="text-sm w-full my-3">4.Once you save the settings, the chat widget will appear on your website</p>
                        </div>
                    </div>

                    {/* Prestashop */}
                    <div onClick={() => toggleSections('prestashop')} className={`flex flex-row justify-around items-center w-[50%] my-3 p-2 border-[1px] border-[#6C2E9C] shadow-custom-shadow-input rounded-lg bg-[#A881D4] text-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-[70%] text-center flex flex-row justify-center items-center">
                            <span className="text-xl">
                                <i className="fa-sharp fa-solid fa-p mr-2 text-xl"></i>
                                Presta shop
                            </span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-[10%]">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl ${active_section === 'prestashop'? 'rotate-180' : ''} ease transition-all duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row p-2 my-7 justify-center items-center ${active_section === 'prestashop'? 'static h-full w-full translate-x-0' : 'absolute h-0 translate-x-[200px] opacity-0 z-[-10]'} transition-all ease-in-out duration-300`}>
                        <div className={`text-center text-lg ${active_section === 'prestashop'? 'translate-x-0 flex flex-col justify-around items-center w-[60%]' : 'translate-x-[500px] w-0'} transition-all ease`}>
                            <p className="text-sm w-full my-3">1.In your PrestaShop panel, select “Add new module“</p>
                            <p className="text-sm w-full my-3">2.Download the HTMLbox module and add it to your shop by selecting “Choose file”. Then, click “Upload this module”</p>
                            <p className="text-sm w-full my-3">3.Go to Modules {'>'} Modules, find HTMLbox module, and click Install</p>
                            <p className="text-sm w-full my-3">4.After installation of the module, go to “Configure”</p>
                            <p className="text-sm w-full my-3">5.Select “footer” as placement of the code and paste the Tidio code</p>
                            <div className={`relative w-full my-1 h-[40%] p-2 bg-white border-[1px] rounded-lg ${ui_state.error_mode? 'border-[#E94E77] shadow-[#E94E77]' : 'border-[#A881D4] shadow-custom-shadow-input'}`}>
                                <div className="h-full p-2 bg-[#cfcdcc] rounded-lg">
                                    <div onClick={CopyScriptTag} className={`${user.emailVerified? '' : 'hidden'} absolute w-[10%] bottom-0 left-[2%] left-4 p-1 text-center text-lg border-2 ${ui_state.error_mode? 'bg-[#E94E77] border-white' : 'bg-white'} ${ui_state.added_to_clipboard? 'border-[#50C878]' : 'border-[#A881D4]'} active:scale-[0.90] rounded-full cursor-pointer shadow-custom-shadow-input`}>
                                        <i className={`${ui_state.added_to_clipboard? 'fa-solid fa-check text-[#50C878]' : 'fa-regular fa-copy text-[#A881D4]'} ${ui_state.error_mode? 'fa-sharp fa-solid fa-xmark text-white' : 'fa-regular fa-copy'}`}></i>
                                    </div>
                                    <p className="w-full p-1 flex flex-row justify-start break-all text-sm">{ui_state.script_tag}</p>
                                </div>
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