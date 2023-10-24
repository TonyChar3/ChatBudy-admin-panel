import { motion } from 'framer-motion';
import { UserAuth } from '../../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { useNavigate } from 'react-router-dom';
import { sanitizeInputValue } from '../../../../context/utils/security';
import { initiateShopifyInstall, widgetScriptTagFetch } from '../../../../context/utils/settingsFunctions';

const InstallationSection = () => {

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
        }
        // sanitize the input value
        const sanitize_value = sanitizeInputValue(ui_state.shopify_input_value);
        if(!sanitize_value){
            setModalErrorMode(true);
            setModalOpen(true);
            setModalMsg('Invalid shopify domain. Try yourDomain.myshopify.com format.');
        }
        // initiate the shopift install process
        const install_process = await initiateShopifyInstall(user.accessToken, sanitize_value);
        if(install_process.error){
            setModalErrorMode(true);
            setModalOpen(true);
            setModalMsg(install_process.msg);
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
                className="w-full h-full flex flex-col justify-center items-center bg-[#c3fffc] lg:bg-white"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div className="w-full h-80 flex flex-col justify-center items-center">
                    <span className={`text-lg ${widget_connected? 'text-green-500' : 'text-red-500'}`}>
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
                        </span>
                    <div onClick={() => toggleSections('js')} className={`flex flex-row w-80 my-3 p-1 md:p-2 border-2 border-[#33b8b8] rounded-lg lg:w-2/4 bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]"><i className="fa-brands fa-square-js mr-2 text-xl"></i>JavaScript</span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${active_section === 'js'? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 my-2 justify-center items-center ${active_section === 'js'? 'static h-full translate-x-0 z-0 duration-300' : 'absolute translate-x-[200px] -z-20'}`}>
                        <div className={`text-center text-lg ${active_section === 'js'? 'static translate-x-0 w-full flex flex-col justify-around items-center z-0 duration-100 lg:w-1/2' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                            <div className={`w-full md:w-96 h-[40%] p-3 lg:p-2 bg-white border-[1px] rounded-lg shadow-md ${ui_state.error_mode? 'border-red-500 shadow-red-500' : 'border-[#33b8b8] shadow-[#33b8b8]'}`}>
                                <div className="h-full p-2 bg-[#cfcdcc] rounded-lg">
                                    <div onClick={CopyScriptTag} className={`${user.emailVerified? '' : 'hidden'} absolute md:w-[5%] md:top-[33%] md:left-[23%] lg:w-[9%] lg:top-[29%] lg:left-[2%] w-[10%] top-[20%] left-4 p-1 text-center text-lg ${ui_state.error_mode? 'bg-red-500' : 'bg-[#cfcdcc]'} border-2 ${ui_state.added_to_clipboard? 'border-green-500' : 'border-white'} active:scale-[0.90] rounded-full cursor-pointer lg:shadow-md lg:shadow-[#33b8b8]`}>
                                        <i className={`${ui_state.added_to_clipboard? 'fa-solid fa-check text-green-500' : 'fa-regular fa-copy text-white'} ${ui_state.error_mode? 'fa-sharp fa-solid fa-xmark' : 'fa-regular fa-copy'}`}></i>
                                    </div>
                                    <p className="w-full p-1 flex flex-row justify-start break-all text-sm lg:text-md">{ui_state.script_tag}</p>
                                </div>
                            </div>
                            <div className="w-full lg:text-center lg:m-4 p-2 m-3">
                                <i className="fa-regular fa-lightbulb-on text-2xl lg:text-2xl lg:text-[#33b8b8] text-white"></i>
                                <p className="mt-1 text-lg">copy the piece of text and paste it just before the <span className="text-[#33b8b8]">{'</body>'}</span> tag and you're all set</p>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => toggleSections('shopify')} className={`flex flex-row w-80 my-3 p-1 md:p-2 border-2 border-[#33b8b8] rounded-lg lg:w-2/4 bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]">
                                <i className="fa-brands fa-shopify mr-2 text-xl"></i>
                                Shopify
                            </span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${active_section === 'shopify'? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 justify-center items-center ${active_section === 'shopify'? 'static h-[80%] translate-x-0 z-0 duration-300' : 'absolute translate-x-[200px] -z-20'}`}>
                        <div className={`text-center text-lg ${active_section === 'shopify'? 'static translate-x-0 w-full flex flex-col justify-around items-center z-0 duration-300 lg:w-1/2' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                            {
                                user.emailVerified?
                                (
                                    <>
                                        <div className="flex flex-col justify-center items-center">
                                            <p className="text-sm lg:text-lg lg:w-full w-[80%] my-2">
                                                Enter your <span className="text-[#33b8b8] underline">shopifyDomain.myshopify.com</span> to embed
                                                ChatBüdy in your store
                                            </p>
                                            <div className="bg-white p-1 rounded-lg lg:shadow-md lg:shadow-[#33b8b8]">
                                                <input onChange={(e) => {
                                                    setUIstate(prevValue => ({
                                                        ...prevValue,
                                                        shopify_input_value: e.target.value
                                                    }));
                                                }} 
                                                type="text" 
                                                placeholder=".myshopify.com" 
                                                value={ui_state.shopify_input_value} 
                                                className={`p-3 rounded-lg border-[1px] lg:text-sm outline-none 
                                                ${ui_state.error_mode? 'border-red-500' : 'border-[#e0e0de]'}
                                                `}/>
                                            </div>
                                            <button onClick={StartInstallShopify} className="bg-[#33b8b8] p-1 text-white font-light rounded-lg w-[30%] text-center my-3 lg:p-2 lg:text-xl active:scale-[0.90] ease-in-out duration-100">Install</button>
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <div className="flex flex-col justify-center items-center">
                                            <p className="text-xl text-[#33b8b8] lg:text-lg lg:w-full w-[80%] my-2">
                                                Verify your email {'🙃'}
                                            </p>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <div onClick={() => toggleSections('magento')} className={`flex flex-row w-80 my-3 p-1 md:p-2 border-2 border-[#33b8b8] rounded-lg lg:w-2/4 bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]">
                                <i className="fa-brands fa-magento mr-2 text-xl"></i>
                                Magento
                            </span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${active_section === 'magento'? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 my-4 justify-center items-center ${active_section === 'magento'? 'static h-full translate-x-0 z-0 duration-300' : 'absolute translate-x-[200px] -z-20'}`}>
                        <div className={`text-center text-lg ${active_section === 'magento'? 'static translate-x-0 w-full flex flex-col justify-around items-center z-0 duration-300 lg:w-1/2' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                            <p className="text-sm lg:text-md w-full my-2">1.Go to your Magento admin page, then Content {'>'} Design {'>'} Configuration. Find the store view you want to configure and click Edit in the Action column</p>
                            <p className="text-sm lg:text-md w-full my-2">2.Expand the HTML Head section, paste the widget code into the Scripts and Style Sheets field, and then press the “Save configuration” button</p>
                            <div className={`w-full md:w-96 h-[40%] p-3 lg:p-2 bg-white border-[1px] rounded-lg shadow-md ${ui_state.error_mode? 'border-red-500 shadow-red-500' : 'border-[#33b8b8] shadow-[#33b8b8]'}`}>
                                <div className="relative h-full p-2 bg-[#cfcdcc] rounded-lg">
                                    <div onClick={CopyScriptTag} className={`${user.emailVerified? '' : 'hidden'} absolute md:w-[11%] md:top-[75%] md:left-[-8%] lg:w-[11%] lg:top-[75%] lg:left-[-8%] w-[10.5%] top-[55%] left-2 p-1 text-center text-lg ${ui_state.error_mode? 'bg-red-500' : 'bg-[#cfcdcc]'} border-2 ${ui_state.added_to_clipboard? 'border-green-500' : 'border-white'} active:scale-[0.90] rounded-full cursor-pointer lg:shadow-md lg:shadow-[#33b8b8]`}>
                                        <i className={`${ui_state.added_to_clipboard? 'fa-solid fa-check text-green-500' : 'fa-regular fa-copy text-white'} ${ui_state.error_mode? 'fa-sharp fa-solid fa-xmark' : 'fa-regular fa-copy'}`}></i>
                                    </div>
                                    <p className="w-full p-1 flex flex-row justify-start break-all text-sm lg:text-md">{ui_state.script_tag}</p>
                                </div>
                            </div>
                            <p className="text-sm lg:text-md w-full my-2 lg:my-3">3.Go to System {'>'} Cache management, select ALL checkboxes, and press the Refresh/Submit button</p>
                            <p className="text-sm lg:text-md w-full my-2 lg:my-3">4.Once you save the settings, the chat widget will appear on your website</p>
                        </div>
                    </div>
                    <div onClick={() => toggleSections('prestashop')} className={`flex flex-row w-80 my-3 p-1 md:p-2 border-2 border-[#33b8b8] rounded-lg lg:w-2/4 bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]">
                                <i className="fa-sharp fa-solid fa-p mr-2 text-xl"></i>
                                Presta shop
                            </span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${active_section === 'prestashop'? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 my-4 justify-center items-center ${active_section === 'prestashop'? 'static h-full translate-x-0 z-0 duration-300' : 'absolute translate-x-[200px] -z-20'}`}>
                        <div className={`text-center text-lg ${active_section === 'prestashop'? 'static translate-x-0 w-full flex flex-col justify-around items-center z-0 duration-300 lg:w-1/2' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                            <p className="text-sm lg:text-md w-full my-2 lg:my-3">1.In your PrestaShop panel, select “Add new module“</p>
                            <p className="text-sm lg:text-md w-full my-2 lg:my-3">2.Download the HTMLbox module and add it to your shop by selecting “Choose file”. Then, click “Upload this module”</p>
                            <p className="text-sm lg:text-md w-full my-2 lg:my-3">3.Go to Modules {'>'} Modules, find HTMLbox module, and click Install</p>
                            <p className="text-sm lg:text-md w-full my-2 lg:my-3">4.After installation of the module, go to “Configure”</p>
                            <p className="text-sm lg:text-md w-full my-2 lg:my-3">5.Select “footer” as placement of the code and paste the Tidio code</p>
                            <div className={`w-full md:w-96 h-[40%] p-3 lg:p-2 bg-white border-[1px] rounded-lg shadow-md ${ui_state.error_mode? 'border-red-500 shadow-red-500' : 'border-[#33b8b8] shadow-[#33b8b8]'}`}>
                                <div className="relative h-full p-2 bg-[#cfcdcc] rounded-lg">
                                    <div onClick={CopyScriptTag} className={`${user.emailVerified? '' : 'hidden'} absolute md:w-[11%] md:top-[75%] md:left-[-8%] lg:w-[11%] lg:top-[75%] lg:left-[-8%] w-[10.5%] top-[55%] left-2 p-1 text-center text-lg ${ui_state.error_mode? 'bg-red-500' : 'bg-[#cfcdcc]'} border-2 ${ui_state.added_to_clipboard? 'border-green-500' : 'border-white'} active:scale-[0.90] rounded-full cursor-pointer lg:shadow-md lg:shadow-[#33b8b8]`}>
                                        <i className={`${ui_state.added_to_clipboard? 'fa-solid fa-check text-green-500' : 'fa-regular fa-copy text-white'} ${ui_state.error_mode? 'fa-sharp fa-solid fa-xmark' : 'fa-regular fa-copy'}`}></i>
                                    </div>
                                    <p className="w-full p-1 flex flex-row justify-start break-all text-sm lg:text-md">{ui_state.script_tag}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default InstallationSection;