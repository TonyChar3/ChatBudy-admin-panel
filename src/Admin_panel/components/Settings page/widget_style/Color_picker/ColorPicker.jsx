import { colorList } from "../../../../../context/utils/widgetStylingFunctions";
import { UserAuth } from "../../../../../context/AuthContext";

const ColorPickerComponent = ({ 
    active_section, 
    hex_input_ref, 
    R_ref, 
    G_ref, 
    B_ref, 
    UIstate, 
    ui_state_obj, 
    mock_widget_obj, 
    NewColor, 
    NewCustomColor, 
    InputChange,
    ResetRGBInput }) => {

    const { setModalOpen } = UserAuth();

    return (
        <>
            <span className={`text-center text-lg ${active_section === 'widget_bg_color'? 'static translate-x-0 w-full flex flex-col justify-center items-center lg:w-1/2 duration-300' : 'relative translate-x-[500px] w-0 -z-20'}`}>
                <div className={`mb-2 ${active_section === 'widget_bg_color'? 'static translate-x-0 w-full grid grid-cols-6 gap-4 z-0 duration-300' : 'relative -translate-x-[200px] w-0 -z-20'}`}>
                    {
                        colorList.map((color, i) => (
                            <div 
                            key={i} 
                            onClick={() => {
                                NewColor('main_color','widget_bg_color',color);
                                UIstate(prevValue => ({
                                    ...prevValue,
                                    input_error: false,
                                    set_custom_color_div: false
                                }));
                                setModalOpen(false);
                                // reset the inputs Hex & R G B
                                hex_input_ref.current.value = '';
                                ResetRGBInput;
                            }} 
                            style={{ backgroundColor: color }} 
                            className={`h-9 w-9 mx-auto rounded-lg active:scale-[0.90] ease duration-300 cursor-pointer ${mock_widget_obj.widget_bg_color === color? 'shadow-lg shadow-[#33b8b8] scale-[1.1]' : 'shadow-md shadow-black'}`}
                            ></div>
                        ))
                    }
                </div>
                <div className="w-80 p-1 my-2 flex flex-col justify-start items-center">
                    <input 
                        type="text" 
                        ref={hex_input_ref}
                        onChange={(e) => {
                        InputChange('hex_input', e.target.value)
                        UIstate(prevValue => ({
                            ...prevValue,
                            set_custom_color_div: true
                        }));
                        }} 
                        placeholder={mock_widget_obj.widget_bg_color} 
                        className={`p-1 border-2 rounded-lg outline-none shadow-md ${ui_state_obj.input_error? 'border-red-500 shadow-red-500' : 'border-[#c9c8c5] shadow-black'}`}
                    />
                    <div className="my-2 p-2 flex flex-row justify-around items-center">
                        <div className="w-full flex flex-col justify-center items-center">
                            <input 
                            type="number" 
                            ref={R_ref} 
                            onChange={(e) => {
                                InputChange('custom_R',e.target.value)
                                UIstate(prevValue => ({
                                    ...prevValue,
                                    set_custom_color_div: true
                                }));
                            }} 
                            max="255" 
                            placeholder={mock_widget_obj.R} 
                            className={`w-1/2 lg:w-4/6 p-1 border-2 rounded-lg outline-none shadow-md ${ui_state_obj.input_error? 'border-red-500 shadow-red-500' : 'border-[#c9c8c5] shadow-black'}`}
                            />
                            <h3>R</h3>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center"> 
                            <input 
                            type="number" 
                            ref={G_ref} 
                            onChange={(e) => {
                                InputChange('custom_G',e.target.value)
                                UIstate(prevValue => ({
                                    ...prevValue,
                                    set_custom_color_div: true
                                }));
                            }}
                            max="255" 
                            placeholder={mock_widget_obj.G} 
                            className={`w-1/2 lg:w-4/6 p-1 border-2 rounded-lg outline-none shadow-md ${ui_state_obj.input_error? 'border-red-500 shadow-red-500' : 'border-[#c9c8c5] shadow-black'}`}
                            />
                            <h3>G</h3>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center">
                            <input 
                            type="number" 
                            ref={B_ref} 
                            onChange={(e) => {
                                InputChange('custom_B',e.target.value)
                                UIstate(prevValue => ({
                                    ...prevValue,
                                    set_custom_color_div: true
                                }));
                            }} 
                            max="255" 
                            placeholder={mock_widget_obj.B} 
                            className={`w-1/2 lg:w-4/6 p-1 border-2 rounded-lg outline-none shadow-md ${ui_state_obj.input_error? 'border-red-500 shadow-red-500' : 'border-[#c9c8c5] shadow-black'}`}
                            />
                            <h3>B</h3>
                        </div>
                    </div>
                    <div className={`w-full flex flex-row justify-center items-center ${ ui_state_obj.set_custom_color_div ? '' : 'hidden'}`}>
                        <div style={{ background: mock_widget_obj.custom_color || '#e4e7ed' }} className={`h-9 w-9 mr-4 rounded-lg active:scale-[0.90] ease duration-300 cursor-pointer ${mock_widget_obj.custom_color.length > 0? 'shadow-lg shadow-[#33b8b8] scale-[1.1]' : 'shadow-md shadow-black'}`}></div>
                        <button onClick={() => NewCustomColor()} className="bg-[#33b8b8] p-1 text-white font-light rounded-lg w-[25%] my-3 text-center lg:p-2 lg:text-lg active:scale-[0.90] ease-in-out duration-100">Set</button>
                    </div>
                </div>
            </span>
        </>
    )
}

export default ColorPickerComponent;