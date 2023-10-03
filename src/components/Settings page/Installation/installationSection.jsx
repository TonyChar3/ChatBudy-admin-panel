import { motion } from 'framer-motion';
import { UserAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { useNavigate } from 'react-router-dom';
import { sanitizeInputValue } from '../../../context/utils/security';
import axios from 'axios';

const InstallationSection = () => {

    const { user, setModalOpen, setModalMsg, setModalMode, widget_connected } = UserAuth();

    const [scriptTag, setScriptTag] = useState('');
    const [added_to_clipboard, setCopy] = useState(false);
    const [error, setError] = useState(false);
    const [js_section, setJSsection] = useState(false);
    const [shopify_section, setShopifySection] = useState(false);
    const [shopify_input_val, setShopifyInputVal] = useState('');
    const [magento_section, setMagentoSection] = useState(false);
    const [prestashop_section, setPrestaShopSection] = useState(false);

    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    const isMobileView = windowWidth <= 768;

    const handleCopyScriptTag = async() => {
        try {
            await navigator.clipboard.writeText(scriptTag);
            setCopy(true)
            setModalMode(false)
            setModalOpen(true);
            setModalMsg('Added to clipboard...')
            setError(false);
        } catch(err) {
            console.log(err);
            // set error mode
            setError(true);
            setModalMode(true);
            setModalOpen(true);
            setModalMsg('ERROR: try again...');
        }
    };

    const StartInstallShopify = async() => {
        // check if the input value is set
        if(shopify_input_val === ''){
            setModalMode(true);
            setModalOpen(true);
            setModalMsg('Enter your store domain.');
        }
        // sanitize the input value
        const sanitize_value = sanitizeInputValue(shopify_input_val);
        if(sanitize_value){
            try{
                const response = await axios.post('https://e2fb-2607-fa49-d344-6500-e43e-3782-f955-4192.ngrok-free.app/shopify/auth', {
                    shop_name: sanitize_value
                },{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(response.data.domain_error){
                    // set error mode to true
                    setError(true);
                    // open the error modal
                    setModalOpen(true);
                    setModalMode(true);
                    setModalMsg('Invalid domain name. Please follow "DomainName.myshopify.com" format');
                    return;
                }
                setError(false);
                setModalMode(false);
                setModalOpen(true);
                setModalMsg('Redirecting...');
                window.open(response.data, '_blank');
            } catch(err){
                console.log(err)
            }
        }
    };

    const OpenJsSection = () => {
        setJSsection(js_section => !js_section);
        setShopifySection(false);
        setShopifyInputVal('');
        setMagentoSection(false);
        setPrestaShopSection(false);
    };

    const OpenShopifySection = () => {
        setShopifySection(shopify_section => !shopify_section);
        setJSsection(false);
        shopify_section? '' : setShopifyInputVal('');
        setMagentoSection(false);
        setPrestaShopSection(false);
    };

    const OpenMagentoSection = () => {
        setMagentoSection(magento_section => !magento_section);
        setJSsection(false);
        setShopifySection(false);
        setShopifyInputVal('');
        setPrestaShopSection(false);
    };

    const OpenPrestaShopSection = () => {
        setPrestaShopSection(prestashop_section => !prestashop_section);
        setMagentoSection(false);
        setJSsection(false);
        setShopifySection(false);
        setShopifyInputVal('');
    };

    useEffect(() => {
        const fetch = async() => {
            try{
                const response = await axios.get('http://localhost:8080/code/link',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.accessToken
                    }
                });

                if(response){
                    setScriptTag(response.data.link)
                } 
            } catch(err){
                console.log(err);
                // set error mode
                setError(true);
                setModalMode(true);
                setModalOpen(true);
                setModalMsg('ERROR (500): please refresh the page or contact support');
                
            }
        }
        if(user.accessToken){
            fetch();
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
                    <div onClick={OpenJsSection} className={`flex flex-row w-80 my-3 p-1 border-2 border-[#33b8b8] rounded-lg lg:w-2/4 bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]"><i className="fa-brands fa-square-js mr-2 text-xl"></i>JavaScript</span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${js_section? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 my-2 justify-center items-center ${js_section? 'static h-full translate-x-0 z-0 duration-300' : 'absolute translate-x-[200px] -z-20'}`}>
                        <div className={`text-center text-lg ${js_section? 'static translate-x-0 w-full flex flex-col justify-around items-center z-0 duration-100 lg:w-1/2' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                            <div className={`w-full h-[40%] p-3 lg:p-2 bg-white border-[1px] rounded-lg shadow-md ${error? 'border-red-500 shadow-red-500' : 'border-[#33b8b8] shadow-[#33b8b8]'}`}>
                                <div className="h-full p-2 bg-[#cfcdcc] rounded-lg">
                                    <div onClick={handleCopyScriptTag} className={`absolute lg:w-[12%] lg:top-[29%] lg:left-[-8%] w-[10%] top-[20%] left-4 p-1 text-center text-lg ${error? 'bg-red-500' : 'bg-[#cfcdcc]'} border-2 ${added_to_clipboard? 'border-green-500' : 'border-white'} active:scale-[0.90] rounded-full cursor-pointer lg:shadow-md lg:shadow-[#33b8b8]`}>
                                        <i className={`${added_to_clipboard? 'fa-solid fa-check text-green-500' : 'fa-regular fa-copy text-white'} ${error? 'fa-sharp fa-solid fa-xmark' : 'fa-regular fa-copy'}`}></i>
                                    </div>
                                    <p className="w-full p-1 flex flex-row justify-start break-all text-sm lg:text-md">{scriptTag}</p>
                                </div>
                            </div>
                            <div className="w-full lg:w-full lg:text-center lg:m-4 p-2 m-3">
                                <i className="fa-regular fa-lightbulb-on text-2xl lg:text-2xl lg:text-[#33b8b8] text-white"></i>
                                <p className="mt-1 text-lg">copy the piece of text and paste it just before the <span className="text-[#33b8b8]">{'</body>'}</span> tag and you're all set</p>
                            </div>
                        </div>
                    </div>
                    <div onClick={OpenShopifySection} className={`flex flex-row w-80 my-3 p-1 border-2 border-[#33b8b8] rounded-lg lg:w-2/4 bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]"><i className="fa-brands fa-shopify mr-2 text-xl"></i>Shopify</span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${shopify_section? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 justify-center items-center ${shopify_section? 'static h-[80%] translate-x-0 z-0 duration-300' : 'absolute translate-x-[200px] -z-20'}`}>
                        <div className={`text-center text-lg ${shopify_section? 'static translate-x-0 w-full flex flex-col justify-around items-center z-0 duration-300 lg:w-1/2' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-sm lg:text-lg lg:w-full w-[80%] my-2">
                                    Enter your <span className="text-[#33b8b8] underline">shopifyDomain.myshopify.com</span> to embed
                                    ChatBüdy in your store
                                </p>
                                <div className="bg-white p-1 rounded-lg lg:shadow-md lg:shadow-[#33b8b8]">
                                    <input onChange={(e) => setShopifyInputVal(e.target.value)} type="text" placeholder=".myshopify.com" value={shopify_input_val} className={`p-3 rounded-lg border-[1px] lg:text-sm outline-none ${error? 'border-red-500' : 'border-[#e0e0de]'}`}/>
                                </div>
                                <button onClick={StartInstallShopify} className="bg-[#33b8b8] p-1 text-white font-light rounded-lg w-[30%] text-center my-3 lg:p-2 lg:text-xl active:scale-[0.90] ease-in-out duration-100">Install</button>
                            </div>
                        </div>
                    </div>
                    <div onClick={OpenMagentoSection} className={`flex flex-row w-80 my-3 p-1 border-2 border-[#33b8b8] rounded-lg lg:w-2/4 bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]"><i className="fa-brands fa-magento mr-2 text-xl"></i>Magento</span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${magento_section? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 my-4 justify-center items-center ${magento_section? 'static h-full translate-x-0 z-0 duration-300' : 'absolute translate-x-[200px] -z-20'}`}>
                        <div className={`text-center text-lg ${magento_section? 'static translate-x-0 w-full flex flex-col justify-around items-center z-0 duration-300 lg:w-1/2' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                            <p className="text-sm lg:text-md w-full my-2">1.Go to your Magento admin page, then Content {'>'} Design {'>'} Configuration. Find the store view you want to configure and click Edit in the Action column</p>
                            <p className="text-sm lg:text-md w-full my-2">2.Expand the HTML Head section, paste the widget code into the Scripts and Style Sheets field, and then press the “Save configuration” button</p>
                            <div className={`w-full h-[40%] p-3 lg:p-2 bg-white border-[1px] rounded-lg shadow-md ${error? 'border-red-500 shadow-red-500' : 'border-[#33b8b8] shadow-[#33b8b8]'}`}>
                                <div className="relative h-full p-2 bg-[#cfcdcc] rounded-lg">
                                    <div onClick={handleCopyScriptTag} className={`absolute lg:w-[12%] lg:top-[75%] lg:left-[-8%] w-[10.5%] top-[55%] left-2 p-1 text-center text-lg ${error? 'bg-red-500' : 'bg-[#cfcdcc]'} border-2 ${added_to_clipboard? 'border-green-500' : 'border-white'} active:scale-[0.90] rounded-full cursor-pointer lg:shadow-md lg:shadow-[#33b8b8]`}>
                                        <i className={`${added_to_clipboard? 'fa-solid fa-check text-green-500' : 'fa-regular fa-copy text-white'} ${error? 'fa-sharp fa-solid fa-xmark' : 'fa-regular fa-copy'}`}></i>
                                    </div>
                                    <p className="w-full p-1 flex flex-row justify-start break-all text-sm lg:text-md">{scriptTag}</p>
                                </div>
                            </div>
                            <p className="text-sm lg:text-md w-full my-2 lg:my-3">3.Go to System {'>'} Cache management, select ALL checkboxes, and press the Refresh/Submit button</p>
                            <p className="text-sm lg:text-md w-full my-2 lg:my-3">4.Once you save the settings, the chat widget will appear on your website</p>
                        </div>
                    </div>
                    <div onClick={OpenPrestaShopSection} className={`flex flex-row w-80 my-3 p-1 border-2 border-[#33b8b8] rounded-lg lg:w-2/4 bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]"><i className="fa-sharp fa-solid fa-p mr-2 text-xl"></i>Presta shop</span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${prestashop_section? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 my-4 justify-center items-center ${prestashop_section? 'static h-full translate-x-0 z-0 duration-300' : 'absolute translate-x-[200px] -z-20'}`}>
                        <div className={`text-center text-lg ${prestashop_section? 'static translate-x-0 w-full flex flex-col justify-around items-center z-0 duration-300 lg:w-1/2' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                            <p className="text-sm lg:text-md w-full my-2 lg:my-3">1.In your PrestaShop panel, select “Add new module“</p>
                            <p className="text-sm lg:text-md w-full my-2 lg:my-3">2.Download the HTMLbox module and add it to your shop by selecting “Choose file”. Then, click “Upload this module”</p>
                            <p className="text-sm lg:text-md w-full my-2 lg:my-3">3.Go to Modules {'>'} Modules, find HTMLbox module, and click Install</p>
                            <p className="text-sm lg:text-md w-full my-2 lg:my-3">4.After installation of the module, go to “Configure”</p>
                            <p className="text-sm lg:text-md w-full my-2 lg:my-3">5.Select “footer” as placement of the code and paste the Tidio code</p>
                            <div className={`w-full h-[40%] p-3 lg:p-2 bg-white border-[1px] rounded-lg shadow-md ${error? 'border-red-500 shadow-red-500' : 'border-[#33b8b8] shadow-[#33b8b8]'}`}>
                                <div className="relative h-full p-2 bg-[#cfcdcc] rounded-lg">
                                    <div onClick={handleCopyScriptTag} className={`absolute lg:w-[12%] lg:top-[75%] lg:left-[-8%] w-[10.5%] top-[55%] left-2 p-1 text-center text-lg ${error? 'bg-red-500' : 'bg-[#cfcdcc]'} border-2 ${added_to_clipboard? 'border-green-500' : 'border-white'} active:scale-[0.90] rounded-full cursor-pointer lg:shadow-md lg:shadow-[#33b8b8]`}>
                                        <i className={`${added_to_clipboard? 'fa-solid fa-check text-green-500' : 'fa-regular fa-copy text-white'} ${error? 'fa-sharp fa-solid fa-xmark' : 'fa-regular fa-copy'}`}></i>
                                    </div>
                                    <p className="w-full p-1 flex flex-row justify-start break-all text-sm lg:text-md">{scriptTag}</p>
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