import { motion } from 'framer-motion';
import MockWidgetModel from '../../../../context/mockWidget/mockWidgetModel';
import { useState, useEffect, useRef } from 'react';
import { UserAuth } from '../../../../context/AuthContext';
import { sanitizeInputValue } from '../../../../context/utils/security';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { useNavigate } from 'react-router-dom';
import { RgbToHex, HexToRgb } from '../../../../context/utils/widgetStylingFunctions';
import ColorPickerComponent from './Color_picker/ColorPicker';

const CustomizationSection = () => {

    const { 
        widget_customizations, 
        added_customization_object, 
        setAddedCustomizationObj, 
        setModalOpen, 
        setModalErrorMode, 
        setModalMsg, 
        saveWidgetCustomization 
    } = UserAuth();

    const R_ref = useRef();
    const G_ref = useRef();
    const B_ref = useRef();
    const Hex_input_ref = useRef();

    const [active_section, setActiveSection] = useState(null);// open or close section
    const [mock_widget_state, setMockState] = useState({
        widget_position: '',
        widget_shape: '',
        mock_title: '',
        mock_greeting: '',
        mock_font_color: '',
        widget_bg_color: '',
        hex_input: '',
        R: '',
        G: '',
        B: '',
        custom_R: '',
        custom_G: '',
        custom_B: '',
        custom_color: ''
    });// mock widget style state
    const [ui_state, setUIstate] = useState({
        position_section: false,
        shape_section: false,
        bg_color_section: false,
        open_customization: false,
        input_error: false,
        set_custom_color_div: false,
        show_mock: false,
    });// Customization section UI state

    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    const isMobileView = windowWidth <= 768;

    const hex_regex = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

    const ResetRgbInput = () => {
        R_ref.current.value = '';
        G_ref.current.value = '';
        B_ref.current.value = '';
    }

    const ConvertHexToRgb = (hex_code) => {
        // convert
        const rgb_object = HexToRgb(hex_code);
        // set the R G B
        setMockState(prevValues => ({
            ...prevValues,
            R: rgb_object.r_value,
            G: rgb_object.g_value,
            B: rgb_object.b_value
        }));
    }

    const InputChange = (name, value) => {
        setMockState(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    const OpenCustomizations = () => {
        ui_state.open_customization?
        setUIstate(prevValue => ({
            ...prevValue,
            open_customization: false
        }))
        :
        setUIstate(prevValue => ({
            ...prevValue,
            open_customization: true
        }))
        setActiveSection(null);
    }

    const toggleCustomizationSections = (section) => {
        if(active_section === section){
            setActiveSection(null);
        } else {
            setActiveSection(section);
        }
    }

    const addNewCustomization = (name, use_state_name, new_value) => {
        // set the new value for the mock
        setMockState(prevValues => ({
            ...prevValues,
            [use_state_name]: new_value
        }));
        // if it is the bg color
        if(name.toString() === 'main_color'){
            // set the RGB
            ConvertHexToRgb(new_value);
        }
        // add it to the new customization object
        widget_customizations[name].toString() === new_value.toString()?
        setAddedCustomizationObj(prevObj => {
            const updatedObj = { ...prevObj }; // clone the object
            delete updatedObj[name]; // delete the key from the cloned object
            return updatedObj;
        })
        ://or
        setAddedCustomizationObj(prevObj => ({
            ...prevObj,
            [name]: new_value
        }))
    }

    const setNewCustomColor = () => {
        // remove the set error mode
        setModalOpen(false);
        setMockState(prevValue => ({
            ...prevValue,
            custom_color: ''
        }));
        setUIstate(prevValue => ({
            ...prevValue,
            input_error: false
        }));
        ResetRgbInput()
        //check if it is the rgb
        if(mock_widget_state.custom_R.length > 0 || mock_widget_state.custom_G.length > 0 || mock_widget_state.custom_B.length > 0 || mock_widget_state.hex_input.length > 0){
            if(mock_widget_state.hex_input.length > 0){
                // check if it is a hex code
                if(!hex_regex.test(mock_widget_state.hex_input)){
                    setMockState(prevValue => ({
                        ...prevValue,
                        custom_color: '',
                        hex_input: ''
                    }));
                    setUIstate(prevValue => ({
                        ...prevValue,
                        input_error: false
                    }));
                    setModalOpen(true);
                    setModalErrorMode(true);
                    setModalMsg('Please enter a Hex code. Ex: #0efg6');
                    Hex_input_ref.current.value = '';
                    return
                }
                // sanitize 
                const sanitized_hex = sanitizeInputValue(mock_widget_state.hex_input);
                // set it as the main_color
                setMockState(prevValues => ({
                    ...prevValues,
                    custom_color: sanitized_hex
                }));
                // set it as the main_color
                addNewCustomization('main_color', 'widget_bg_color', sanitized_hex)
                // set back to '' the hex_input
                Hex_input_ref.current.value = '';
                ResetRgbInput();
            } else {
                // convert it into hex #
                const hex_code = RgbToHex(mock_widget_state.custom_R || mock_widget_state.R, mock_widget_state.custom_G || mock_widget_state.G, mock_widget_state.custom_B || mock_widget_state.B)
                setMockState(prevValues => ({
                    ...prevValues,
                    custom_color: hex_code
                }));
                // set it as the main_color
                addNewCustomization('main_color', 'widget_bg_color', hex_code)
                // set back to '' the custom RGB
                ResetRgbInput()
            }
        }
        console.log(mock_widget_state)
    }

    useEffect(() => {
        if(Object.keys(widget_customizations).length > 0){
            setMockState(prevValues => ({
                ...prevValues,
                widget_position: widget_customizations.position,
                widget_shape: widget_customizations.shape,
                widget_bg_color: widget_customizations.main_color,
                mock_font_color: widget_customizations.font_color,
                mock_title: widget_customizations.admin_name,
                mock_greeting: widget_customizations.greeting_message
            }));
            // set the R G B values
            ConvertHexToRgb(widget_customizations.main_color);
            // make sure the add_customization object is empty
            if(Object.keys(added_customization_object).length > 0){
                setAddedCustomizationObj({});
            }
            setUIstate(prevValues => ({
                ...prevValues,
                show_mock: true
            }));
        } else {
            // dont show the widget mock
            setUIstate(prevValues => ({
                ...prevValues,
                show_mock: false
            }));
        }
    },[widget_customizations])

    useEffect(() => {
        if(!isMobileView){
            navigate('/navbar/setting')
        }
    },[isMobileView])

    return(
        <>
            <motion.div 
                className="lg:relative w-full h-full flex flex-col justify-between items-center bg-white"

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
                <div onClick={saveWidgetCustomization} className={`absolute w-[14%] top-[3%] right-4 flex flex-row justify-center items-center rounded-full p-2 border-2 ${Object.keys(added_customization_object).length > 0? 'border-[#33b8b8] active:scale-[0.90] ease transition-all duration-300 bg-white cursor-pointer' : 'border-gray-300'}`}>
                    <span className={`text-md ${Object.keys(added_customization_object).length > 0? 'text-[#33b8b8]' : 'text-gray-300'}`}>Save</span>
                </div>
                <div onClick={OpenCustomizations} className={`${ui_state.open_customization? 'border-red-500 z-[80]' : 'border-[#33b8b8] z-0'} absolute w-[14%] md:w-[11%] lg:w-[9%] h-[8%] top-[2%] left-4 flex flex-row justify-center items-center rounded-full p-2 border-2 active:scale-[0.90] ease-in-out transition-all duration-100 bg-white cursor-pointer`}>
                    <i className={`${ui_state.open_customization? 'fa-solid fa-xmark text-red-500' : 'fa-regular fa-paintbrush-fine text-[#33b8b8]'} text-2xl md:text-3xl lg:text-3xl transition-all ease`}></i>
                </div>
                <div className={`absolute w-full h-full justify-center items-center ${ui_state.open_customization? 'translate-y-0 z-[70] flex bg-white bg-opacity-50 duration-300' : 'translate-x-full opacity-0 duration-100 z-0'} transition-all ease-in-out`}>
                </div>
                <div className={`relative bottom-[50%] top-[10%] mx-auto w-full mt-5 flex-col justify-center items-center ${ui_state.open_customization? 'translate-y-0 z-[80] flex duration-300' : 'translate-x-full opacity-0 duration-700 z-0'} transition-all ease-in-out`}>
                    <div onClick={() => toggleCustomizationSections('widget_position')} className={`flex flex-row w-80 my-3 p-1 border-2 border-[#33b8b8] rounded-lg lg:w-2/4 ${active_section === 'widget_position'? 'z-20' : 'z-0'} bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]">Position</span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${active_section === 'widget_position'? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 my-2 justify-center items-center ${active_section === 'widget_position'? 'static translate-x-0 z-0 duration-300' : 'absolute translate-x-[200px] -z-20 h-0'}`}>
                        <div className={`text-center text-lg ${active_section === 'widget_position'? 'static translate-x-0 w-full flex flex-row justify-around items-center z-0 duration-300 lg:w-1/2' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                            <span onClick={() => addNewCustomization('position','widget_position','left')} className={`text-lg text-[#33b8b8] cursor-pointer ${mock_widget_state.widget_position === 'left'? 'border-b-2 border-[#33b8b8]' : ''}`}>Left</span>
                            <span onClick={() => addNewCustomization('position','widget_position','right')} className={`text-lg text-[#33b8b8] cursor-pointer ${mock_widget_state.widget_position === 'right'? 'border-b-2 border-[#33b8b8]' : ''}`}>Right</span>
                        </div>
                    </div>
                    <div onClick={() => toggleCustomizationSections('widget_shape')} className={`flex flex-row w-80 my-3 p-1 border-2 border-[#33b8b8] rounded-lg lg:w-2/4 ${active_section === 'widget_shape'? 'z-20' : 'z-0'} bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]">Shape</span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${active_section === 'widget_shape'? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 my-2 justify-center items-center ${active_section === 'widget_shape'? 'static translate-x-0 z-0 duration-300' : 'absolute translate-x-[200px] -z-20 h-0'}`}>
                        <div className={`text-center text-lg ${active_section === 'widget_shape'? 'static translate-x-0 w-full flex flex-row justify-around items-center z-0 duration-300 lg:w-1/2' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                            <div onClick={() => addNewCustomization('shape','widget_shape','square')} className={`relative bg-[#0c64f2] w-[50px] h-[50px] flex flex-row justify-center items-center rounded-lg shadow-md shadow-black active:scale-[0.90] cursor-pointer ${mock_widget_state.widget_shape === 'square'? 'border-b-2 border-[#33b8b8]' : ''}`}>
                                <i className="fa-regular fa-messages-question text-white text-2xl"></i>
                                <div className={`absolute w-4 h-4 bottom-10 left-10 rounded-full bg-[#33b8b8] ${mock_widget_state.widget_shape === 'square'? '' : 'hidden'}`}></div>
                            </div>
                            <div onClick={() => addNewCustomization('shape','widget_shape','circle')} className={`relative bg-[#0c64f2] w-[50px] h-[50px] flex flex-row justify-center items-center rounded-full shadow-md shadow-black active:scale-[0.90] cursor-pointer ${mock_widget_state.widget_shape === 'circle'? 'border-b-2 border-[#33b8b8]' : ''}`}>
                                <i className="fa-regular fa-messages-question text-white text-2xl"></i>
                                <div className={`absolute w-4 h-4 bottom-10 left-10 rounded-full bg-[#33b8b8] ${mock_widget_state.widget_shape === 'circle'? '' : 'hidden'}`}></div>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => toggleCustomizationSections('widget_bg_color')} className={`flex flex-row w-80 my-3 p-1 border-2 border-[#33b8b8] rounded-lg w-80 lg:w-2/4 ${active_section === 'widget_bg_color'? 'z-20' : 'z-0'} bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]">Color</span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${active_section === 'widget_bg_color'? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 my-2 justify-center items-center ${active_section === 'widget_bg_color'? 'static translate-x-0 z-[100] duration-300' : 'absolute translate-x-[200px] -z-20 h-0'}`}>
                        <ColorPickerComponent 
                            active_section={active_section} 
                            hex_input_ref={Hex_input_ref} 
                            R_ref={R_ref} 
                            G_ref={G_ref} 
                            B_ref={B_ref} 
                            UIstate={setUIstate} 
                            ui_state_obj={ui_state} 
                            mock_widget_obj={mock_widget_state} 
                            NewColor={addNewCustomization} 
                            NewCustomColor={setNewCustomColor} 
                            InputChange={InputChange}
                            ResetRGBInput={ResetRgbInput}
                        />
                    </div>
                </div>
                <div className="relative w-full flex flex-row justify-center items-center">
                    <MockWidgetModel 
                    show_mock={ui_state.show_mock} 
                    main_color={mock_widget_state.widget_bg_color} 
                    position={mock_widget_state.widget_position} 
                    shape={mock_widget_state.widget_shape} 
                    header_title={mock_widget_state.mock_title}  
                    greeting_message={mock_widget_state.mock_greeting} 
                    font_color={mock_widget_state.mock_font_color} 
                    open_mock={false}/>
                </div>
            </motion.div>
        </>
    )
}

export default CustomizationSection;