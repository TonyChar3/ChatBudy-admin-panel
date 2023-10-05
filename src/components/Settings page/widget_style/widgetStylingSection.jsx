import { motion } from 'framer-motion';
import MockWidgetModel from '../../../context/mockWidget/mockWidgetModel';
import { useState, useEffect, useRef } from 'react';
import { UserAuth } from '../../../context/AuthContext';
import { sanitizeInputValue } from '../../../context/utils/security';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { useNavigate } from 'react-router-dom';

const CustomizationSection = () => {

    const { 
        customization_object, 
        add_customization_obj, 
        setAddedCustomizationObj, 
        setModalOpen, 
        setModalMode, 
        setModalMsg, 
        saveWidgetCustomization 
    } = UserAuth();

    const R_ref = useRef();
    const G_ref = useRef();
    const B_ref = useRef();
    const Hex_input_ref = useRef();

    const [arrowPosition, setArrowPosition] = useState(false);
    const [arrowShape, setArrowShape] = useState(false);
    const [arrowBgColor, setArrowBgColor] = useState(false);
    const [open_customization, setOpenCustoms] = useState(false);
    const [position, setPosition] = useState('');
    const [shape, setShape] = useState('');
    const [mock_model_title, setMockTitle] = useState('');
    const [mock_model_Greeting, setMockGreeting] = useState('');
    const [mock_model_Font_color, setMockFontColor] = useState('');
    const [main_color, setColor] = useState('');
    const [hex_input, setHexInput] = useState('');
    const [input_error, setErrorInput] = useState(false);
    const [R, setR] = useState('');
    const [G, setG] = useState('');
    const [B, setB] = useState('');
    const [custom_R, setCustomR] = useState('');
    const [custom_G, setCustomG] = useState('');
    const [custom_B, setCustomB] = useState('');
    const [custom_color, setCustomColor] = useState('');
    const [set_custom_color_div, setShowDiv] = useState(false);

    const navigate = useNavigate();
    const windowWidth = useWindowWidth();
    const isMobileView = windowWidth <= 768;

    const hex_regex = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

    const colorList = [
        '#fafafa',
        '#dcdcde',
        '#f25b50',
        '#f28150',
        '#f29450',
        '#f2b150',
        '#edf250',
        '#cff250',
        '#a4f250',
        '#81f250',
        '#50f26b',
        '#50f2a7',
        '#50f2da',
        '#50d4f2',
        '#0c64f2',
        '#7050f2',
        '#a950f2',
        '#c450f2',
        '#f250f2',
        '#f2509c',
        '#d6d4d5',
        '#919091',
        '#4a4849',
        '#1c1b1c'
    ]

    const ResetRgbInput = () => {
        R_ref.current.value = '';
        G_ref.current.value = '';
        B_ref.current.value = '';
    }

    const HexToRgb = (hex_code) => {
        // remove the hash #
        let hex = hex_code.replace(/^#/, '');
        // if the code is 3 caracter long
        if(hex.length === 3){
            // replicate each to get to six digits
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        // Parse r, g, b values
        const bigInt = parseInt(hex, 16);
        const r_val = (bigInt >> 16) & 255;
        const g_val = (bigInt >> 8) & 255;
        const b_val = bigInt & 255;
        // set the R G B
        setR(r_val);
        setG(g_val);
        setB(b_val);
    }

    const RgbToHex = (r, g, b) => {
        // Clamp and round each component and then convert it to a hexadecimal string
        const red = Math.round(Math.min(255, Math.max(0, r))).toString(16).padStart(2, '0');
        const green = Math.round(Math.min(255, Math.max(0, g))).toString(16).padStart(2, '0');
        const blue = Math.round(Math.min(255, Math.max(0, b))).toString(16).padStart(2, '0');
        // return the hex code
        return `#${red}${green}${blue}`
    }

    const handleOpenCustomizations = () => {
        setOpenCustoms(open_customization => !open_customization);
        setArrowPosition(false);
        setArrowBgColor(false);
        setArrowShape(false);
    }

    const handleShapeSection = () => {
        setArrowShape(arrowShape => !arrowShape);
        setArrowPosition(false);
        setArrowBgColor(false);
    }

    const handlePositionSection = () => {
        setArrowPosition(arrowPosition => !arrowPosition);
        setArrowBgColor(false);
        setArrowShape(false);
    }

    const handleColorSection = () => {
        setArrowBgColor(arrowBgColor => !arrowBgColor);
        setArrowPosition(false);
        setArrowShape(false);
    }

    const handleSetPosition = (new_position) => {
        // set the useState
        setPosition(new_position)
        // add it to the object
        customization_object.position.toString() === new_position.toString()?
        setAddedCustomizationObj(prevObj => {
            const { position, ...rest } = prevObj;
            return { ...rest };
        })
        :// or
        setAddedCustomizationObj(prevObj => ({
            ...prevObj,
            position: new_position
        }))
    }

    const handleSetShape = (new_shape) => {
        // set the useState
        setShape(new_shape);
        // add it to the object
        customization_object.shape.toString() === new_shape.toString()?
        setAddedCustomizationObj(prevObj => {
            const { shape, ...rest } = prevObj;
            return { ...rest };
        })
        ://or
        setAddedCustomizationObj(prevObj => ({
            ...prevObj,
            shape: new_shape
        }))
    }

    const handleSetColor = (new_color) => {
        // set the new color
        setColor(new_color);
        // set the RGB
        HexToRgb(new_color);
        // add it to the object or not
        customization_object.main_color.toString() === new_color.toString()?
        setAddedCustomizationObj(prevObj => {
            const { main_color, ...rest } = prevObj;
            return { ...rest };
        })
        ://or
        setAddedCustomizationObj(prevObj => ({
            ...prevObj,
            main_color: new_color
        }))
    }

    const handleSetCustomColor = () => {
        // remove the set error mode
        setModalOpen(false);
        setErrorInput(false);
        setCustomColor('');
        ResetRgbInput();
        //check if it is the rgb
        if(custom_R.length > 0 || custom_G.length > 0 || custom_B.length > 0 || hex_input.length > 0){
            if(hex_input.length > 0){
                // check if it is a hex code
                if(!hex_regex.test(hex_input)){
                    setCustomColor('');
                    setHexInput('');
                    setErrorInput(true);
                    setModalOpen(true);
                    setModalMode(true);
                    setModalMsg('Please enter a Hex code. Ex: #0efg6');
                    Hex_input_ref.current.value = '';
                    return
                }
                // sanitize 
                const sanitized_hex = sanitizeInputValue(hex_input);
                // set it as the main_color
                setCustomColor(sanitized_hex)
                // set back to '' the hex_input
                Hex_input_ref.current.value = '';
                // set it as the main_color
                handleSetColor(sanitized_hex)
            } else {
                // convert it into hex #
                const hex_code = RgbToHex(custom_R || R, custom_G || G, custom_B || B)
                setCustomColor(hex_code);
                // set back to '' the custom RGB
                ResetRgbInput()
                // set it as the main_color
                handleSetColor(hex_code);
            }
        }
    }

    useEffect(() => {
        if(Object.keys(customization_object).length > 0){
            // set the current version
            setPosition(customization_object.position);
            setShape(customization_object.shape);
            setColor(customization_object.main_color);
            HexToRgb(customization_object.main_color);
            setMockFontColor(customization_object.font_color);
            setMockTitle(customization_object.admin_name)
            setMockGreeting(customization_object.greeting_message)
            // make sure the add_customization object is empty
            if(Object.keys(add_customization_obj).length > 0){
                setAddedCustomizationObj({});
            }
        }
    },[customization_object])

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
                <div onClick={saveWidgetCustomization} className={`absolute w-[14%] top-[3%] right-4 flex flex-row justify-center items-center rounded-full p-2 border-2 ${Object.keys(add_customization_obj).length > 0? 'border-[#33b8b8] active:scale-[0.90] ease transition-all duration-300 bg-white cursor-pointer' : 'border-gray-300'}`}>
                    <span className={`text-md ${Object.keys(add_customization_obj).length > 0? 'text-[#33b8b8]' : 'text-gray-300'}`}>Save</span>
                </div>
                <div onClick={handleOpenCustomizations} className={`${open_customization? 'border-red-500 z-[80]' : 'border-[#33b8b8] z-0'} absolute w-[14%] lg:w-[9%] h-[8%] top-[2%] left-4 flex flex-row justify-center items-center rounded-full p-2 border-2 active:scale-[0.90] ease-in-out transition-all duration-100 bg-white cursor-pointer`}>
                    <i className={`${open_customization? 'fa-solid fa-xmark text-red-500' : 'fa-regular fa-paintbrush-fine text-[#33b8b8]'} text-2xl lg:text-3xl transition-all ease`}></i>
                </div>
                <div className={`absolute w-full h-full justify-center items-center ${open_customization? 'translate-y-0 z-[70] flex bg-white bg-opacity-50 duration-300' : 'translate-x-full opacity-0 duration-100 z-0'} transition-all ease-in-out`}>
                </div>
                <div className={`relative bottom-[50%] top-[10%] mx-auto w-full mt-5 flex-col justify-center items-center ${open_customization? 'translate-y-0 z-[80] flex duration-300' : 'translate-x-full opacity-0 duration-700 z-0'} transition-all ease-in-out`}>
                    <div onClick={handlePositionSection} className={`flex flex-row w-80 my-3 p-1 border-2 border-[#33b8b8] rounded-lg lg:w-2/4 ${arrowPosition? 'z-20' : 'z-0'} bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]">Position</span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${arrowPosition? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 my-2 justify-center items-center ${arrowPosition? 'static translate-x-0 z-0 duration-300' : 'absolute translate-x-[200px] -z-20 h-0'}`}>
                        <div className={`text-center text-lg ${arrowPosition? 'static translate-x-0 w-full flex flex-row justify-around items-center z-0 duration-300 lg:w-1/2' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                            <span onClick={() => handleSetPosition('left')} className={`text-lg text-[#33b8b8] cursor-pointer ${position === 'left'? 'border-b-2 border-[#33b8b8]' : ''}`}>Left</span>
                            <span onClick={() => handleSetPosition('right')} className={`text-lg text-[#33b8b8] cursor-pointer ${position === 'right'? 'border-b-2 border-[#33b8b8]' : ''}`}>Right</span>
                        </div>
                    </div>
                    <div onClick={handleShapeSection} className={`flex flex-row w-80 my-3 p-1 border-2 border-[#33b8b8] rounded-lg lg:w-2/4 ${arrowPosition? 'z-20' : 'z-0'} bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]">Shape</span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${arrowShape? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 my-2 justify-center items-center ${arrowShape? 'static translate-x-0 z-0 duration-300' : 'absolute translate-x-[200px] -z-20 h-0'}`}>
                        <div className={`text-center text-lg ${arrowShape? 'static translate-x-0 w-full flex flex-row justify-around items-center z-0 duration-300 lg:w-1/2' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                            <div onClick={() => handleSetShape('square')} className={`relative bg-[#0c64f2] w-[50px] h-[50px] flex flex-row justify-center items-center rounded-lg shadow-md shadow-black active:scale-[0.90] cursor-pointer ${shape === 'square'? 'border-b-2 border-[#33b8b8]' : ''}`}>
                                <i className="fa-regular fa-messages-question text-white text-2xl"></i>
                                <div className={`absolute w-4 h-4 bottom-10 left-10 rounded-full bg-[#33b8b8] ${shape === 'square'? '' : 'hidden'}`}></div>
                            </div>
                            <div onClick={() => handleSetShape('circle')} className={`relative bg-[#0c64f2] w-[50px] h-[50px] flex flex-row justify-center items-center rounded-full shadow-md shadow-black active:scale-[0.90] cursor-pointer ${shape === 'circle'? 'border-b-2 border-[#33b8b8]' : ''}`}>
                                <i className="fa-regular fa-messages-question text-white text-2xl"></i>
                                <div className={`absolute w-4 h-4 bottom-10 left-10 rounded-full bg-[#33b8b8] ${shape === 'circle'? '' : 'hidden'}`}></div>
                            </div>
                        </div>
                    </div>
                    <div onClick={handleColorSection} className={`flex flex-row w-80 my-3 p-1 border-2 border-[#33b8b8] rounded-lg w-80 lg:w-2/4 ${arrowPosition? 'z-20' : 'z-0'} bg-white active:scale-[0.90] transition-all ease-in-out duration-[0.3] cursor-pointer`}>
                        <div className="w-60 text-center flex flex-row justify-center items-center lg:w-5/6">
                            <span className="text-lg lg:text-xl text-[#33b8b8]">Color</span>
                        </div>   
                        <div className="flex flex-row justify-center items-center w-20 lg:w-40">
                            <i className={`fa-sharp fa-solid fa-chevron-up text-xl text-[#33b8b8] ${arrowBgColor? 'rotate-180' : ''} duration-300 lg:text-2xl cursor-pointer`}></i>
                        </div>
                    </div>
                    <div className={`flex flex-row w-full p-2 my-2 justify-center items-center ${arrowBgColor? 'static translate-x-0 z-[100] duration-300' : 'absolute translate-x-[200px] -z-20 h-0'}`}>
                        <span className={`text-center text-lg ${arrowBgColor? 'static translate-x-0 w-full flex flex-col justify-center items-center lg:w-1/2 duration-300' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                            <div className={`mb-2 ${arrowBgColor? 'static translate-x-0 w-full grid grid-cols-6 gap-4 z-0 duration-300' : 'relative -translate-x-[200px] w-0 -z-20'}`}>
                                {
                                    colorList.map((color, i) => (
                                        <div 
                                        key={i} 
                                        onClick={() => {
                                            handleSetColor(color);
                                            setErrorInput(false);
                                            setCustomColor('');
                                            setShowDiv(false);
                                            setModalOpen(false);
                                            // reset the inputs Hex & R G B
                                            Hex_input_ref.current.value = '';
                                            ResetRgbInput();
                                        }} 
                                        style={{ backgroundColor: color }} 
                                        className={`h-9 w-9 mx-auto rounded-lg active:scale-[0.90] ease duration-300 cursor-pointer ${main_color === color? 'shadow-lg shadow-[#33b8b8] scale-[1.1]' : 'shadow-md shadow-black'}`}
                                        ></div>
                                    ))
                                }
                            </div>
                            <div className="w-80 p-1 my-2 flex flex-col justify-start items-center">
                                <input 
                                    type="text" 
                                    ref={Hex_input_ref}
                                    onChange={(e) => {
                                        setHexInput(e.target.value)
                                        setShowDiv(true)
                                    }} 
                                    placeholder={main_color} 
                                    className={`p-1 border-2 rounded-lg outline-none shadow-md ${input_error? 'border-red-500 shadow-red-500' : 'border-[#c9c8c5] shadow-black'}`}
                                />
                                <div className="my-2 p-2 flex flex-row justify-around items-center">
                                    <div className="w-full flex flex-col justify-center items-center">
                                        <input 
                                            type="number" 
                                            ref={R_ref} 
                                            onChange={(e) => {
                                                setCustomR(e.target.value)
                                                setShowDiv(true)
                                            }} 
                                            max="255" 
                                            placeholder={R} 
                                            className={`w-1/2 lg:w-4/6 p-1 border-2 rounded-lg outline-none shadow-md ${input_error? 'border-red-500 shadow-red-500' : 'border-[#c9c8c5] shadow-black'}`}
                                        />
                                        <h3>R</h3>
                                    </div>
                                    <div className="w-full flex flex-col justify-center items-center"> 
                                        <input 
                                            type="number" 
                                            ref={G_ref} 
                                            onChange={(e) => {
                                                setCustomG(e.target.value)
                                                setShowDiv(true)
                                            }}
                                            max="255" 
                                            placeholder={G} 
                                            className={`w-1/2 lg:w-4/6 p-1 border-2 rounded-lg outline-none shadow-md ${input_error? 'border-red-500 shadow-red-500' : 'border-[#c9c8c5] shadow-black'}`}
                                        />
                                        <h3>G</h3>
                                    </div>
                                    <div className="w-full flex flex-col justify-center items-center">
                                        <input 
                                            type="number" 
                                            ref={B_ref} 
                                            onChange={(e) => {
                                                setCustomB(e.target.value)
                                                setShowDiv(true)
                                            }} 
                                            max="255" 
                                            placeholder={B} 
                                            className={`w-1/2 lg:w-4/6 p-1 border-2 rounded-lg outline-none shadow-md ${input_error? 'border-red-500 shadow-red-500' : 'border-[#c9c8c5] shadow-black'}`}
                                        />
                                        <h3>B</h3>
                                    </div>
                                </div>
                                <div className={`w-full flex flex-row justify-center items-center ${ set_custom_color_div ? '' : 'hidden'}`}>
                                    <div style={{ background: custom_color || '#e4e7ed' }} className={`h-9 w-9 mr-4 rounded-lg active:scale-[0.90] ease duration-300 cursor-pointer ${custom_color.length > 0? 'shadow-lg shadow-[#33b8b8] scale-[1.1]' : 'shadow-md shadow-black'}`}></div>
                                    <button onClick={handleSetCustomColor} className="bg-[#33b8b8] p-1 text-white font-light rounded-lg w-[25%] my-3 text-center lg:p-2 lg:text-lg active:scale-[0.90] ease-in-out duration-100">Set</button>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
                <div className="relative w-full flex flex-row justify-center items-center">
                    <MockWidgetModel main_color={main_color} position={position} shape={shape} header_title={mock_model_title}  greeting_message={mock_model_Greeting} font_color={mock_model_Font_color} open_mock={false}/>
                </div>
            </motion.div>
        </>
    )
}

export default CustomizationSection;